import React, { useState } from 'react';

import Card from './Card';
import styles from '../styles';
import { scarletViper, chakriAvatar } from '../assets';

const chooseBattleLocation = ['bg-astral', 'bg-eoaalien', 'bg-panight', 'bg-saiman'];

const healthPoints = 25;

const home = () => {
  const [playerHealth, setPlayerHealth] = useState(healthPoints);
  const [opponentHealth, setOpponentHealth] = useState(healthPoints);

  const healthLevel = (points) => (points >= 12 ? 'bg-green-500' : points >= 6 ? 'bg-orange-500' : 'bg-red-500');

  const attackOpponent = (points) => {
    if (opponentHealth <= 0) return;

    if (opponentHealth > points) setOpponentHealth(opponentHealth - points);
    else setOpponentHealth(0);
  };

  const defensePlayer = (points) => {
    if (playerHealth <= 0) return;

    if (playerHealth > points) setPlayerHealth(playerHealth - points);
    else setPlayerHealth(0);
  };

  const marginIndexing = (index) => (index !== healthPoints - 1 ? 'mr-1' : 'mr-0');

  return (
    <div className={`${styles.homeContainer}`}>
      <div className={`${chooseBattleLocation[2]} ${styles.homeBattleBg}`} />

      {opponentHealth > 0 && (
        <div className={`${styles.healthContainer} top-0 ${styles.flexCenter}`}>
          <div className={`${styles.healthBar} mt-4`}>
            {[...Array(opponentHealth).keys()].map((item, index) => (
              <div key={`player-item-${item}`} className={`${styles.healthBarPoint} ${healthLevel(opponentHealth)} ${marginIndexing(index)}`} />
            ))}
          </div>
        </div>
      )}

      <div className={`${styles.homeCardsContainer} ${styles.flexCenter}`}>
        <Card cardImg={scarletViper} title="Opponent" onAttack={defensePlayer} />
        <Card cardImg={chakriAvatar} title="You" restStyles="mt-3" onAttack={attackOpponent} />
      </div>

      {playerHealth > 0 && (
        <div className={`${styles.healthContainer} bottom-0 ${styles.flexCenter}`}>
          <div className={`${styles.healthBar} mb-4`}>
            {[...Array(playerHealth).keys()].map((item, index) => (
              <div key={`opponent-item-${item}`} className={`${styles.healthBarPoint} ${healthLevel(playerHealth)} ${marginIndexing(index)}`} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default home;
