import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../styles';
import { useGlobalContext } from '../context';
import { CustomButton, CustomInput, GameLoad, PageHOC } from '../components';

const CreateBattle = () => {
  const { contract, gameData, battleName, setBattleName, setErrorMessage, waitBattle, setWaitBattle } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (gameData.playerActiveBattle && gameData.playerActiveBattle.battleStatus === 1) {
      navigate(`/battle/${gameData.playerActiveBattle.name}`);
    } else if (gameData.playerActiveBattle && gameData.playerActiveBattle.battleStatus !== 1) {
      setWaitBattle(true);
    }
  }, [gameData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!gameData?.playerHasMetamaskAccount) navigate('/');
    }, [2000]);

    return () => clearTimeout(timer);
  }, [gameData]);

  const handleClick = async () => {
    if (battleName === '' || battleName.trim() === '') return null;

    try {
      await contract.createBattle(battleName);

      setWaitBattle(true);
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <>
      {waitBattle && <GameLoad />}

      <div className="flex flex-col mb-5">
        <CustomInput
          label="Battle"
          placeHolder="Enter battle name"
          value={battleName}
          handleValueChange={setBattleName}
        />

        <CustomButton
          title="Create Battle"
          handleClick={handleClick}
          restStyles="mt-6"
        />
      </div>
      <p className={styles.infoText} onClick={() => navigate('/join-battle')}>
        Or join already existing battles
      </p>
    </>
  );
};

export default PageHOC(
  CreateBattle,
  <>Create <br /> a new Battle</>,
  <>Create your own battle and wait for other players to join you</>,
);
