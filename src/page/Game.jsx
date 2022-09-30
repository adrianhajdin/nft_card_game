import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { ethers } from 'ethers';
import styles from '../styles';
import { Card } from '../components';
import { useGlobalContext } from '../context';
import { randomCardGenerator } from '../data/cards';
import { attack, defense, player01 as player01Icon, player02 as player02Icon } from '../assets';

const healthPoints = 25;

const Game = () => {
  const { contract, gameData, battleGround, metamaskAccount } = useGlobalContext();
  const [players, setPlayers] = useState({ player01: {}, player02: {} });
  const [errorMessage, setErrorMessage] = useState('');
  const { battleName } = useParams();

  const playerOneHealth = ethers.utils.formatUnits(players.player01.playerHealth || 1) * 1000000000000000000;
  const playerTwoHealth = ethers.utils.formatUnits(players.player02.playerHealth || 1) * 1000000000000000000;
  const playerOneMana = ethers.utils.formatUnits(players.player01.playerMana || 1) * 1000000000000000000;
  const playerTwoMana = ethers.utils.formatUnits(players.player02.playerMana || 1) * 1000000000000000000;

  console.log(players, playerOneMana, playerTwoMana);
  if (gameData?.playerActiveBattle) console.log(gameData.playerActiveBattle);

  useEffect(() => {
    const getPlayerInfo = async () => {
      const player01Addr = gameData.playerActiveBattle.players[0];
      const player02Addr = gameData.playerActiveBattle.players[1];

      const player01 = await contract.getPlayer(player01Addr);
      const player02 = await contract.getPlayer(player02Addr);

      if (player01.playerAddress.toLowerCase() === metamaskAccount) {
        setPlayers({
          ...players,
          player01: { ...player01, img: randomCardGenerator() },
          player02: { ...player02, img: randomCardGenerator() },
        });
      } else {
        setPlayers({
          ...players,
          player01: { ...player02, img: randomCardGenerator() },
          player02: { ...player01, img: randomCardGenerator() },
        });
      }
    };

    if (contract && gameData) getPlayerInfo();
  }, [contract, gameData]);

  const healthLevel = (points) => (points >= 12 ? 'bg-green-500' : points >= 6 ? 'bg-orange-500' : 'bg-red-500');
  const marginIndexing = (index) => (index !== healthPoints - 1 ? 'mr-1' : 'mr-0');

  const getBattleResults = async () => {
    try {
      const battleResults = await contract.awaitBattleResults(battleName);

      console.log({ battleResults });
    } catch (error) {
      const regex = /(?:^|\W)reason(?:$|\W).+?(?=, method)/g;

      setErrorMessage(error.message.match(regex)[0].slice('reason: "execution reverted: '.length).slice(0, -1));
    }
  };

  const makeAMove = async (choice) => {
    try {
      const choiceTransaction = await contract.attackOrDefendChoice(choice, battleName);

      getBattleResults();

      console.log('Move made: ', choiceTransaction);
    } catch (error) {
      const regex = /(?:^|\W)reason(?:$|\W).+?(?=, method)/g;

      if (error.message.includes('You have already made a move')) {
        getBattleResults();
      } else {
        setErrorMessage(error.message.match(regex)[0].slice('reason: "execution reverted: '.length).slice(0, -1));
      }
    }
  };

  return (
    <div className={`${styles.gameContainer} ${battleGround} bg-cover bg-no-repeat bg-center flex justify-between items-center flex-col`}>
      <div className={`${styles.flexCenter} mt-4`}>
        <img src={player02Icon} alt="player02" className="w-14 h-14 object-contain rounded-full mr-4" />
        <div className={`${styles.healthBar} ${playerTwoHealth > 0 ? 'bg-opacity-10 backdrop-filter backdrop-blur-lg' : 'bg-opacity-0'}`}>

          <div className="flex flex-col">
            <div className="flex">
              {[...Array(playerTwoHealth).keys()].map((item, index) => (
                <div key={`player-item-${item}`} className={`${styles.healthBarPoint} ${healthLevel(playerTwoHealth)} ${marginIndexing(index)}`} />
              ))}
            </div>

            {players?.player02?.playerName && <p className="text-green-500 text-xl">{players?.player02?.playerName} {players?.player02?.playerAddress}</p>}
          </div>
        </div>
      </div>

      <div className={`${styles.flexCenter} flex-col my-10`}>
        <div className="flex flex-row items-center">
          <div className={`sm:w-20 w-14 sm:h-20 h-14 rounded-full mr-2 cursor-pointer ${styles.flexCenter} ${styles.glassEffect}`}>
            <img src={attack} alt="attack" className="w-1/2 h-1/w-1/2 object-contain" />
          </div>
          <Card card={players?.player02} title={players?.player02?.playerName} />
          <div className={`sm:w-20 w-14 sm:h-20 h-14 rounded-full ml-6 cursor-pointer ${styles.flexCenter} ${styles.glassEffect} border-[2px] border-red-600`}>
            <img src={defense} alt="defense" className="w-1/2 h-1/w-1/2 object-contain" />
          </div>
        </div>

        <div className="flex flex-row items-center">
          <div className={`sm:w-20 w-14 sm:h-20 h-14 rounded-full mr-2 cursor-pointer ${styles.flexCenter} ${styles.glassEffect} border-[2px] border-yellow-400`} onClick={() => makeAMove(1)}>
            <img src={attack} alt="attack" className="w-1/2 h-1/w-1/2 object-contain" />
          </div>
          <Card card={players?.player01} title={players?.player01?.playerName} restStyles="mt-3" />
          <div className={`sm:w-20 w-14 sm:h-20 h-14 rounded-full ml-6 cursor-pointer ${styles.flexCenter} ${styles.glassEffect}`} onClick={() => makeAMove(2)}>
            <img src={defense} alt="defense" className="w-1/2 h-1/w-1/2 object-contain" />
          </div>
        </div>
      </div>

      <div className={`${styles.flexCenter} mb-4`}>
        <img src={player01Icon} alt="player01" className="w-14 h-14 object-contain rounded-full mr-4" />
        <div className={`${styles.healthBar} ${playerOneHealth > 0 ? 'bg-opacity-10 backdrop-filter backdrop-blur-lg' : 'bg-opacity-0'}`}>
          <div className="flex flex-col">
            {errorMessage && <p className="text-red-500 text-xl">{errorMessage}</p>}
            {players?.player01?.playerAddress && <p className="text-green-500 text-xl mb-5">{players?.player01?.playerName} {players?.player01?.playerAddress}</p>}

            <div className="flex">
              {[...Array(playerOneHealth).keys()].map((item, index) => (
                <div
                  key={`opponent-item-${item}`}
                  className={`${styles.healthBarPoint} ${healthLevel(playerOneHealth)} ${marginIndexing(index)}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Game;
