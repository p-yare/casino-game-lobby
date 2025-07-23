import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useGameStore } from '../store/useGameStore';
import { fetchGames } from '../utils/api';
import GameCard from './GameCard';
import Loader from './Loader';
import EmptyState from './EmptyState';
import ErrorState from './ErrorState';
import styles from '../styles/GameLobby.module.scss';
import { useEffect, useRef } from 'react';

export default function GameLobby() {
  const search = useGameStore(state => state.search);
  const vendors = useGameStore(state => state.vendors);
  const showFavoritesOnly = useGameStore(state => state.showFavoritesOnly);
  const favorites = useGameStore(state => state.favorites);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery(
    ['games', search, vendors],
    ({ pageParam = 0 }) => fetchGames({ pageParam, query: search, vendors }),
    {
      getNextPageParam: (lastPage) => lastPage.nextOffset,
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      refetchOnWindowFocus: false,
    }
  );

  // Infinite scroll
  const loaderRef = useRef();
  useEffect(() => {
    if (!hasNextPage || isLoading) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNextPage();
      },
      { threshold: 1 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => loaderRef.current && observer.unobserve(loaderRef.current);
  }, [hasNextPage, isLoading, fetchNextPage]);

  if (isLoading) return <Loader />;
  if (isError) return <ErrorState />;
  const games = data?.pages.flatMap(page => page.items ?? []) || [];
  if (!games.length) return <EmptyState message={search ? `No games found for "${search}".` : undefined} />;

  // Filter out null or invalid games
  let validGames = games.filter(game => game && game.slug);
  if (showFavoritesOnly) {
    validGames = validGames.filter(game => favorites.includes(game.slug));
  }

  if (!validGames.length) {
    if (showFavoritesOnly) {
      return <EmptyState message="No favorite games found." />;
    }
    return <EmptyState message={search ? `No games found for "${search}".` : undefined} />;
  }

  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <img src="/flame.png" alt="Flame" className={styles.flameIcon} />
          <span className={styles.headerTitle}>Featured Games</span>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.viewAllBtn}>View All</button>
          <button className={styles.arrowGroupBtn} aria-label="Scroll Left or Right">
            <svg style={{opacity: 0.5}} className={styles.arrowIcon} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15L6 9L12 3" stroke="#A59EB5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <svg className={styles.arrowIcon} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 3L12 9L6 15" stroke="#A59EB5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      <div className={styles.grid}>
        {validGames.map(game => <GameCard key={game.slug} game={game} />)}
        {hasNextPage && (
          <div ref={loaderRef} className={styles.loaderEnd}>
            {isFetchingNextPage ? <Loader /> : null}
          </div>
        )}
      </div>
    </>
  );
} 