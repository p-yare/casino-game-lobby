import React from 'react';
import styles from '../styles/FixedHeader.module.scss';

export default function FixedHeader() {
  return (
    <div className={styles.fixedHeader}>
      <img src="/bag.png" alt="Logo" className={styles.headerLogoMobile} />
      <img src="/jackpot-logo-web.png" alt="Jackpot Logo" className={styles.headerLogoWeb} />
      <div className={styles.headerActions}>
        <button className={styles.loginBtn}>Login</button>
        <button className={styles.registerBtn}>Register</button>
      </div>
    </div>
  );
} 