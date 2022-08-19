import React, { useState } from 'react';

import Card from './Card';
import styles from '../styles';
import { scarletViper, chakriAvatar } from '../assets';

const chooseBattleLocation = ['bg-astral', 'bg-eoaalien', 'bg-panight', 'bg-saiman'];

const home = () => {
  const [playerHealth, setPlayerHealth] = useState(25);
  const [opponentHealth, setOpponentHealth] = useState(25);

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

  return (
    <div className={`${styles.homeContainer}`}>
      <div className={`${chooseBattleLocation[0]} ${styles.homeBattleBg}`} />

      {opponentHealth > 0 && (
      <div className="absolute top-0 right-0 left-0 flex justify-center items-center">

        <div className="flex flex-row bg-white rounded-md backdrop-filter backdrop-blur-lg bg-opacity-10 p-2 min-w-[612px] mt-4">
          {[...Array(opponentHealth).keys()].map((item, index) => (
            <div key={`player-item-${item}`} className={`w-5 h-10 ${opponentHealth >= 12 ? 'bg-green-500' : opponentHealth >= 6 ? 'bg-orange-500' : 'bg-red-500'} rounded-sm ${index !== 24 ? 'mr-1' : 'mr-0'}`} />
          ))}
        </div>

      </div>
      )}

      <div className={styles.homeCardsContainer}>
        <Card cardImg={scarletViper} title="Opponent" onAttack={defensePlayer} />
        <Card cardImg={chakriAvatar} title="You" restStyles="mt-3" onAttack={attackOpponent} />
      </div>

      {playerHealth > 0 && (
        <div className="absolute bottom-0 right-0 left-0 flex justify-center items-center">
          <div className="flex flex-row bg-white rounded-md backdrop-filter backdrop-blur-lg bg-opacity-10 mb-4 p-2 min-w-[612px]">
            {[...Array(playerHealth).keys()].map((item, index) => (
              <div key={`opponent-item-${item}`} className={`w-5 h-10 ${playerHealth >= 12 ? 'bg-green-500' : playerHealth >= 6 ? 'bg-orange-500' : 'bg-red-500'} rounded-sm ${index !== 24 ? 'mr-1' : 'mr-0'}`} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default home;
