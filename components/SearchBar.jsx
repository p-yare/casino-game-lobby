import React from 'react';
import { useGameStore } from '../store/useGameStore';
import styles from '../styles/SearchBar.module.scss';
import { useCallback } from 'react';
import debounce from 'lodash/debounce';

export default function SearchBar() {
  const search = useGameStore(state => state.search);
  const setSearch = useGameStore(state => state.setSearch);

  // Debounced setSearch
  const debouncedSetSearch = useCallback(
    debounce((value) => {
      setSearch(value);
    }, 300),
    [setSearch]
  );

  const handleChange = (e) => {
    debouncedSetSearch(e.target.value);
  };

  return (
    <div className={styles.searchBarWrapper}>
      <span className={styles.searchIcon}>
        <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
          <circle cx="9" cy="9" r="7" stroke="#837B99" strokeWidth="3"/>
          <line x1="14.0711" y1="14.0711" x2="27" y2="27" stroke="#837B99" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      </span>
      <input
        className={styles.input}
        type="text"
        placeholder="Search a game..."
        defaultValue={search}
        onChange={handleChange}
      />
    </div>
  );
} 