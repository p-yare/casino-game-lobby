import React from 'react';
import styles from '../styles/AirdropBanner.module.scss';

export default function AirdropBanner() {
  return (
    <div className={styles.bannerBox}>
      <img src="/airdrop-banner.png" alt="$Jackpot Airdrop Coming Soon" className={styles.bannerImg} />
    </div>
  );
} 