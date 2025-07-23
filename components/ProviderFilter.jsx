import React, { useRef } from 'react';
import { useGameStore } from '../store/useGameStore';
import styles from '../styles/ProviderFilter.module.scss';

const PROVIDERS = [
  {
    key: 'JackpotOriginal',
    logo: '/providers/jackpotoriginals.png',
  },
  {
    key: 'PragmaticPlay',
    logo: '/providers/pragmaticplay.png',
  },
  {
    key: 'EvolutionGaming',
    logo: '/providers/evolutiongaming.png',
  },
  {
    key: "Play'nGo",
    logo: '/providers/playngo.png',
  },
  {
    key: 'RelaxGaming',
    logo: '/providers/relaxgaming.png',
  },
];

export default function ProviderFilter() {
  const vendors = useGameStore(state => state.vendors);
  const setVendors = useGameStore(state => state.setVendors);
  const scrollRef = useRef(null);

  const toggleVendor = (key) => {
    if (vendors.includes(key)) {
      setVendors(vendors.filter(v => v !== key));
    } else {
      setVendors([...vendors, key]);
    }
  };

  const scroll = (dir) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const amount = clientWidth * 0.7;
      scrollRef.current.scrollTo({
        left: dir === 'left' ? scrollLeft - amount : scrollLeft + amount,
        behavior: 'smooth',
      });
    }
  };

  const handleArrowClick = (e) => {
    e.stopPropagation();
    if (e.target.closest('svg')?.dataset?.dir === 'left') {
      scroll('left');
    } else {
      scroll('right');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <img src="/providers-icon.png" alt="Providers" className={styles.headerIcon} />
          <span className={styles.headerTitle}>Providers</span>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.arrowGroupBtn} aria-label="Scroll Left or Right" onClick={handleArrowClick}>
            <svg data-dir="left" style={{opacity: 0.5}} className={styles.arrowIcon} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15L6 9L12 3" stroke="#A59EB5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <svg data-dir="right" className={styles.arrowIcon} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 3L12 9L6 15" stroke="#A59EB5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      <div className={styles.scrollArea} ref={scrollRef}>
        <div className={styles.grid}>
          {PROVIDERS.map(provider => (
            <div
              key={provider.key}
              className={
                vendors.includes(provider.key)
                  ? `${styles.card} ${styles.selected}`
                  : styles.card
              }
              onClick={() => toggleVendor(provider.key)}
            >
              <img
                src={provider.logo}
                alt={provider.key}
                className={styles.providerImg}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 