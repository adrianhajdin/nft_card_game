import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PageHOC } from '../components';
import { useGlobalContext } from '../context';

const CreateBattle = () => {
  const { contract, gameData, metamaskAccount, setShowAlert, battleName, setBattleName, setErrorMessage } = useGlobalContext();
  const [waitBattle, setWaitBattle] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (gameData.playerActiveBattle) navigate(`/game/${gameData.playerActiveBattle.name}`);
  }, [gameData]);

  useEffect(() => {
    const func = async () => {
      const player = await contract.getPlayer(metamaskAccount);

      if (player.inBattle) navigate(`/game/${gameData?.playerActiveBattle?.name}`);
    };

    if (contract) func();
  }, [gameData, contract]);

  const handleClick = async () => {
    if (battleName === '' || battleName.trim() === '') return null;

    try {
      await contract.createBattle(battleName); // ? sometimes it takes a lot of time for this transaction to be mined?
      setShowAlert({ status: true, type: 'success', msg: 'You have successfully created a battle' });

      // todo: initiate a loader screen... after a second user joins the battle, a new battle event will be trigger, then navigate to the game page
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col">
          <label htmlFor="name" className="font-rajdhani font-semibold text-2xl text-white mb-3">Battle</label>
          <input
            type="text"
            placeholder="Enter battle name"
            disabled={waitBattle}
            value={battleName}
            onChange={(e) => setBattleName(e.target.value)}
            className="bg-siteDimBlack text-white outline-none focus:outline-siteViolet disabled:text-gray-500 p-4 rounded-md sm:max-w-[50%] max-w-full"
          />
        </div>
        <button
          type="button"
          className="mt-6 px-4 py-2 rounded-lg bg-siteViolet disabled:bg-gray-500 w-fit text-white font-rajdhani font-bold"
          disabled={waitBattle}
          onClick={handleClick}
        >
          Create Battle
        </button>
      </div>

      {waitBattle ? (
        <div className="mt-5">
          <p className="font-rajdhani font-medium text-lg text-siteViolet">Waiting for other player to join...</p>
        </div>
      ) : (
        <p className="font-rajdhani font-medium text-lg text-siteViolet cursor-pointer mt-5"
          onClick={() => navigate('/join-battle')}
        >
          Or join already existing battles
        </p>
      )}
    </>
  );
};

export default PageHOC(
  CreateBattle,
  <>Create <br /> a new Battle</>,
  <>Create your own battle and wait for other players to join you</>,
);
