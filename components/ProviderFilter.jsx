import React from 'react';
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

  const toggleVendor = (key) => {
    if (vendors.includes(key)) {
      setVendors(vendors.filter(v => v !== key));
    } else {
      setVendors([...vendors, key]);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Providers</div>
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
  );
} 