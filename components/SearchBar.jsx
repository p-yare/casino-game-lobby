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
    <input
      className={styles.input}
      type="text"
      placeholder="Search products..."
      defaultValue={search}
      onChange={handleChange}
    />
  );
} 