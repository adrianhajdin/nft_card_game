import React, { useState } from 'react';

import styles from '../styles';
import { Card } from '../components';
import { useGlobalContext } from '../context';
import { randomCardGenerator } from '../data/cards';

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
    <div className={`${styles.gameContainer} ${battleGround} bg-cover bg-no-repeat bg-center flex justify-between items-center flex-col`}>

      {opponent.health > 0 && (
        <div className={`${styles.flexCenter}`}>
          <div className={`${styles.healthBar} mt-4`}>
            {[...Array(opponent.health).keys()].map((item, index) => (
              <div key={`player-item-${item}`} className={`${styles.healthBarPoint} ${healthLevel(opponent.health)} ${marginIndexing(index)}`} />
            ))}
          </div>
        </div>
      )}

      <div className={`${styles.flexCenter} flex-col my-10`}>
        <Card card={opponent.card} title="Opponent" onAttack={defensePlayer} />
        <Card card={player.card} title="You" restStyles="mt-3" onAttack={attackOpponent} />
      </div>

      {player.health > 0 && (
        <div className={`${styles.flexCenter}`}>
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
