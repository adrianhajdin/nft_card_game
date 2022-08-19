import React from 'react';

import Card from './Card';
import styles from '../styles';
import { ace, jadeMonk } from '../assets';

const chooseBattleLocation = ['bg-astral', 'bg-eoaalien', 'bg-panight', 'bg-saiman'];

const home = () => (
  <div className={`${styles.homeContainer}`}>
    <div className={`${chooseBattleLocation[0]} ${styles.homeBattleBg}`} />

    <div className={styles.homeCardsContainer}>
      <Card cardImg={ace} title="Opponent" />
      <Card cardImg={jadeMonk} title="You" restStyles="ml-10" />
    </div>
  </div>
);

export default home;
