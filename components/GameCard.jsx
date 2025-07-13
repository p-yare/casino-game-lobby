import React from 'react';
import styles from '../styles/GameCard.module.scss';
import { useGameStore } from '../store/useGameStore';

export default function GameCard({ game }) {
  const isFavorite = useGameStore(state => state.isFavorite(game.slug));
  const toggleFavorite = useGameStore(state => state.toggleFavorite);

  return (
    <div className={styles.card} style={{ borderColor: game.borderColor }}>
      <button
        className={styles.favoriteBtn}
        onClick={e => { e.stopPropagation(); toggleFavorite(game.slug); }}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavorite ? (
          <span className={styles.heart}>&#10084;&#65039;</span> // filled heart
        ) : (
          <span className={styles.heartOutline}>&#9825;</span> // outline heart
        )}
      </button>
      <img className={styles.thumbnail} src={game.thumbnail} alt={game.name} />
    </div>
  );
} 