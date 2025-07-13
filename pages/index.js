import React from 'react';
import GameLobby from '../components/GameLobby';
import SearchBar from '../components/SearchBar';
import ProviderFilter from '../components/ProviderFilter';
import ShowFavoritesToggle from '../components/ShowFavoritesToggle';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import styles from '../styles/Home.module.scss';

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.container}>
        <div className={styles.content}>
          <SearchBar />
          <ProviderFilter />
          <ShowFavoritesToggle />
          <GameLobby />
        </div>
      </div>
    </QueryClientProvider>
  );
} 