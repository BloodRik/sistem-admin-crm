import React from 'react';
import styles from './StarExplosion.module.css';

const StarExplosion: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.explosion}>
        <h1 className={styles.text}>Тебе сюда</h1>
      </div>
    </div>
  );
};

export default StarExplosion;