import React, { useState } from 'react';

import Card from './Card';
import styles from '../styles';
import { randomCardGenerator } from '../data/cards';

const chooseBattleLocation = ['bg-astral', 'bg-eoaalien', 'bg-panight', 'bg-saiman'];

const healthPoints = 25;

const home = () => {
  const [player, setPlayer] = useState({
    health: healthPoints,
    card: randomCardGenerator(),
  });

  const [opponent, setOpponent] = useState({
    health: healthPoints,
    card: randomCardGenerator(),
  });

  const healthLevel = (points) => (points >= 12 ? 'bg-green-500' : points >= 6 ? 'bg-orange-500' : 'bg-red-500');

  const attackOpponent = (points) => {
    if (opponent.health <= 0) return;

    if (opponent.health > points) setOpponent({ ...opponent, health: opponent.health - points });
    else setOpponent({ ...opponent, health: 0 });
  };

  const defensePlayer = (points) => {
    if (player.health <= 0) return;

    if (player.health > points) setPlayer({ ...player, health: player.health - points });
    else setPlayer({ ...player, health: 0 });
  };

  const marginIndexing = (index) => (index !== healthPoints - 1 ? 'mr-1' : 'mr-0');

  return (
    <div className={`${styles.homeContainer}`}>
      <div className={`${chooseBattleLocation[0]} ${styles.homeBattleBg}`} />

      {opponent.health > 0 && (
        <div className={`${styles.healthContainer} top-0 ${styles.flexCenter}`}>
          <div className={`${styles.healthBar} mt-4`}>
            {[...Array(opponent.health).keys()].map((item, index) => (
              <div key={`player-item-${item}`} className={`${styles.healthBarPoint} ${healthLevel(opponent.health)} ${marginIndexing(index)}`} />
            ))}
          </div>
        </div>
      )}

      <div className={`${styles.homeCardsContainer} ${styles.flexCenter}`}>
        <Card card={opponent.card} title="Opponent" onAttack={defensePlayer} />
        <Card card={player.card} title="You" restStyles="mt-3" onAttack={attackOpponent} />
      </div>

      {player.health > 0 && (
        <div className={`${styles.healthContainer} bottom-0 ${styles.flexCenter}`}>
          <div className={`${styles.healthBar} mb-4`}>
            {[...Array(player.health).keys()].map((item, index) => (
              <div key={`opponent-item-${item}`} className={`${styles.healthBarPoint} ${healthLevel(player.health)} ${marginIndexing(index)}`} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default home;
