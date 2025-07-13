import React from 'react';
import { useGameStore } from '../store/useGameStore';
import styles from '../styles/ShowFavoritesToggle.module.scss';

export default function ShowFavoritesToggle() {
  const showFavoritesOnly = useGameStore(state => state.showFavoritesOnly);
  const setShowFavoritesOnly = useGameStore(state => state.setShowFavoritesOnly);

  return (
    <button
      className={styles.toggle}
      onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
    >
      {showFavoritesOnly ? 'Show All Games' : 'Show Favorites Only'}
    </button>
  );
} 