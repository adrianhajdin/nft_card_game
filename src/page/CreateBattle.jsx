import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { CustomInput, GameLoad, PageHOC } from '../components';
import { useGlobalContext } from '../context';

const CreateBattle = () => {
  const { contract, gameData, battleName, setBattleName, setErrorMessage, waitBattle, setWaitBattle } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (gameData.playerActiveBattle) navigate(`/battle/${gameData.playerActiveBattle.name}`);
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

      <div className="flex flex-col">
        <div className="flex flex-col">
          <CustomInput
            label="Battle"
            placeHolder="Enter battle name"
            value={battleName}
            handleValueChang={setBattleName}
          />
        </div>
        <button
          type="button"
          className="mt-6 px-4 py-2 rounded-lg bg-siteViolet disabled:bg-gray-500 w-fit text-white font-rajdhani font-bold"
          onClick={handleClick}
        >
          Create Battle
        </button>
      </div>
      <p className="font-rajdhani font-medium text-lg text-siteViolet cursor-pointer mt-5" onClick={() => navigate('/join-battle')}>
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
