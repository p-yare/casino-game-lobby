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
    <div className={styles.grid}>
      {validGames.map(game => <GameCard key={game.slug} game={game} />)}
      {hasNextPage && (
        <div ref={loaderRef}>
          {isFetchingNextPage ? <Loader /> : null}
        </div>
      )}
    </div>
  );
} 