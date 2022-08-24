import React, { useState } from 'react';

import styles from '../styles';
import { Card } from '../components';
import { useGlobalContext } from '../context';
import { randomCardGenerator } from '../data/cards';

// const chooseBattleLocation = ['bg-astral', 'bg-eoaalien', 'bg-panight', 'bg-saiman'];

const healthPoints = 25;

const Game = () => {
  const { battleGround } = useGlobalContext();

  const [player, setPlayer] = useState({
    health: healthPoints,
    card: randomCardGenerator(),
  });

  const [opponent, setOpponent] = useState({
    health: healthPoints,
    card: randomCardGenerator(),
  });

  const [manaMeter, setManaMeter] = useState(1);

  const healthLevel = (points) => (points >= 12 ? 'bg-green-500' : points >= 6 ? 'bg-orange-500' : 'bg-red-500');

  const attackOpponent = (points) => {
    if (opponent.health <= 0) return;

    if (opponent.health > points) setOpponent({ ...opponent, health: opponent.health - points });
    else setOpponent({ ...opponent, health: 0 });

    setManaMeter(manaMeter + 1);
  };

  const defensePlayer = (points) => {
    if (player.health <= 0) return;

    if (player.health > points) setPlayer({ ...player, health: player.health - points });
    else setPlayer({ ...player, health: 0 });
  };

  const marginIndexing = (index) => (index !== healthPoints - 1 ? 'mr-1' : 'mr-0');

  return (
    <div className={`${styles.gameContainer}`}>
      <div className={`${battleGround} ${styles.gameBattleBg}`} />

      {opponent.health > 0 && (
        <div className={`${styles.healthContainer} top-0 ${styles.flexCenter}`}>
          <div className={`${styles.healthBar} mt-4`}>
            {[...Array(opponent.health).keys()].map((item, index) => (
              <div key={`player-item-${item}`} className={`${styles.healthBarPoint} ${healthLevel(opponent.health)} ${marginIndexing(index)}`} />
            ))}
          </div>
        </div>
      )}

      <div className={`${styles.gameCardsContainer} ${styles.flexCenter}`}>
        <Card card={opponent.card} title="Opponent" onAttack={defensePlayer} />
        <Card card={player.card} title="You" restStyles="mt-3" onAttack={attackOpponent} />
      </div>

      <div className={`${styles.manaMeterContainer} ${styles.flexCenter}`}>
        <div className={`${styles.flexEnd} ${styles.glassEffect} ${styles.manaMeter}`}>
          <div className={`${styles.flexCenter} ${styles.manaMeterBlock}`} style={{ height: manaMeter * 40 }}>
            <p className={styles.manaValueText}>{manaMeter}</p>
          </div>
        </div>
        <p className={styles.manaTitle}>Mana</p>
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

export default Game;
