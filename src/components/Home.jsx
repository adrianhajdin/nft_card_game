import React from 'react';

import Card from './Card';
import styles from '../styles';
import { scarletViper, chakriAvatar } from '../assets';

const chooseBattleLocation = ['bg-astral', 'bg-eoaalien', 'bg-panight', 'bg-saiman'];

const home = () => (
  <div className={`${styles.homeContainer}`}>
    <div className={`${chooseBattleLocation[3]} ${styles.homeBattleBg}`} />

    <div className={styles.homeCardsContainer}>
      <Card cardImg={scarletViper} title="Opponent" />
      <Card cardImg={chakriAvatar} title="You" restStyles="mt-3" />
    </div>
  </div>
);

export default home;
