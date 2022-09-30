import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { ethers } from 'ethers';

import styles from '../styles';
import { Card, PlayerInfo } from '../components';
import { useGlobalContext } from '../context';
import { attack, defense, player01 as player01Icon, player02 as player02Icon } from '../assets';

const parseBigNumber = (bigNumber) => ethers.utils.formatUnits(bigNumber || 1) * 1000000000000000000;

const Game = () => {
  const { contract, gameData, battleGround, metamaskAccount } = useGlobalContext();
  const [players, setPlayers] = useState({ player01: {}, player02: {} });
  const [errorMessage, setErrorMessage] = useState('');
  const { battleName } = useParams();

  useEffect(() => {
    const getBattleResults = async () => {
      try {
        await contract.awaitBattleResults(battleName);
      } catch (error) {
        const regex = /(?:^|\W)reason(?:$|\W).+?(?=, method)/g;

        setErrorMessage(error.message.match(regex)[0].slice('reason: "execution reverted: '.length).slice(0, -1));
      }
    };

    if (gameData.playerActiveBattle?.moves[0] && gameData.playerActiveBattle?.moves[1]) {
      getBattleResults();
    }

    if (gameData?.playerActiveBattle?.winner) {
      alert(gameData?.playerActiveBattle?.winner === metamaskAccount.toLowerCase() ? 'You won!' : 'You lost!');
    }
  }, [gameData?.playerActiveBattle]);

  useEffect(() => {
    const getPlayerInfo = async () => {
      const player01Address = gameData.playerActiveBattle.players[0];
      const player02Address = gameData.playerActiveBattle.players[1];

      const p1TokenData = await contract.getPlayerToken(player01Address);
      const p2TokenData = await contract.getPlayerToken(player02Address);
      const player01 = await contract.getPlayer(player01Address);
      const player02 = await contract.getPlayer(player02Address);

      const p1Att = parseBigNumber(p1TokenData.attackStrength);
      const p1Def = parseBigNumber(p1TokenData.defenseStrength);
      const p2Att = parseBigNumber(p2TokenData.attackStrength);
      const p2Def = parseBigNumber(p2TokenData.defenseStrength);
      const p1H = parseBigNumber(players.player01.playerHealth);
      const p1M = parseBigNumber(players.player01.playerMana);
      const p2H = parseBigNumber(players.player02.playerHealth);
      const p2M = parseBigNumber(players.player02.playerMana);

      if (player01.playerAddress.toLowerCase() === metamaskAccount) {
        setPlayers({
          ...players,
          player01: { ...player01, att: p1Att, def: p1Def, health: p1H, mana: p1M },
          player02: { ...player02, att: p2Att, def: p2Def, health: p2H, mana: p2M },
        });
      } else {
        setPlayers({
          ...players,
          player01: { ...player02, att: p1Att, def: p1Def, health: p1H, mana: p1M },
          player02: { ...player01, att: p2Att, def: p2Def, health: p2H, mana: p2M },
        });
      }
    };

    if (contract && gameData.playerActiveBattle) getPlayerInfo();
  }, [contract, gameData]);

  const makeAMove = async (choice) => {
    try {
      await contract.attackOrDefendChoice(choice, battleName);
    } catch (error) {
      const regex = /(?:^|\W)reason(?:$|\W).+?(?=, method)/g;

      setErrorMessage(error.message.match(regex)[0].slice('reason: "execution reverted: '.length).slice(0, -1));
    }
  };

  return (
    <div className={`${styles.gameContainer} ${battleGround} bg-cover bg-no-repeat bg-center flex justify-between items-center flex-col`}>
      <PlayerInfo player={players?.player02} playerIcon={player02Icon} mt />

      <div className={`${styles.flexCenter} flex-col my-10`}>
        <div className="flex flex-row items-center">
          <Card card={players?.player02} title={players?.player02?.playerName} playerTwo />
        </div>

        <div className="flex flex-row items-center">
          <div className={`sm:w-20 w-14 sm:h-20 h-14 rounded-full mr-2 cursor-pointer ${styles.flexCenter} ${styles.glassEffect} border-[2px] hover:border-yellow-400`} onClick={() => makeAMove(1)}>
            <img src={attack} alt="attack" className="w-1/2 h-1/w-1/2 object-contain" />
          </div>
          <Card card={players?.player01} title={players?.player01?.playerName} restStyles="mt-3" />
          <div className={`sm:w-20 w-14 sm:h-20 h-14 rounded-full ml-6 cursor-pointer ${styles.flexCenter} ${styles.glassEffect} border-[2px] hover:border-red-600`} onClick={() => makeAMove(2)}>
            <img src={defense} alt="defense" className="w-1/2 h-1/w-1/2 object-contain" />
          </div>
        </div>
      </div>

      <PlayerInfo player={players?.player01} playerIcon={player01Icon} errorMessage={errorMessage} />
    </div>
  );
};

export default Game;
