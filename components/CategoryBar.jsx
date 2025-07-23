import React from 'react';
import styles from '../styles/CategoryBar.module.scss';

const BUTTONS = [
  'Jackpot Originals',
  'New Games',
  'Slots',
  'Featured Games',
  'Live Dealer',
  'Game Shows',
  'Table Games',
];

export default function CategoryBar() {
  return (
    <div className={styles.categoryBox}>
      <div className={styles.buttonRow}>
        {BUTTONS.map((label) => (
          <button key={label} className={styles.button}>{label}</button>
        ))}
      </div>
    </div>
  );
} 