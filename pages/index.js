import React from 'react';
import GameLobby from '../components/GameLobby';
import SearchBar from '../components/SearchBar';
import ProviderFilter from '../components/ProviderFilter';
import ShowFavoritesToggle from '../components/ShowFavoritesToggle';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import styles from '../styles/Home.module.scss';
import CategoryBar from '../components/CategoryBar';
import FixedHeader from '../components/FixedHeader';
import AirdropBanner from '../components/AirdropBanner';

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.container}>
        <div className={styles.content}>
          <FixedHeader />
          <AirdropBanner />
          <SearchBar />
          <CategoryBar />
          <ShowFavoritesToggle />
          <GameLobby />
          <ProviderFilter />
        </div>
      </div>
    </QueryClientProvider>
  );
} 