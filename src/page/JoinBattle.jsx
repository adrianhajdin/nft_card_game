import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { PageHOC, Alert } from '../components';
import { useGlobalContext } from '../context';

const JoinBattle = () => {
  const navigate = useNavigate();
  const { contract, gameData, showAlert, setShowAlert, setBattleName } = useGlobalContext();

  useEffect(() => {
    if (gameData.playerActiveBattle) navigate(`/game/${gameData.playerActiveBattle.name}`);
  }, [gameData]);

  const handleClick = async (battleName) => {
    setBattleName(battleName);

    try {
      const joinBattleTsx = await contract.joinBattle(battleName);

      console.log({ joinBattleTsx });
    } catch (error) {
      const regex = /(?:^|\W)reason(?:$|\W).+?(?=, method)/g;

      setShowAlert({
        status: true,
        type: 'failure',
        msg: error.message.match(regex)[0].slice('reason: "execution reverted: '.length).slice(0, -1),
      });
    }
  };

  return (
    <>
      {showAlert?.status && <Alert type={showAlert.type} msg={showAlert.msg} />}

      <p className="font-rajdhani font-semibold text-2xl text-white mb-3">Available Battles:</p>

      <div className="flex flex-col gap-3">
        {gameData.pendingBattles.length ? gameData.pendingBattles.filter((battle) => battle.battleStatus !== 1).map((battle, index) => (
          <div key={battle.name + index} className="flex justify-between items-center">
            <p className="font-rajdhani font-normal text-xl text-white">{index + 1}. {battle.name}</p>
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-siteViolet w-fit text-white font-rajdhani font-bold"
              onClick={() => handleClick(battle.name)}
            >Join
            </button>
          </div>
        )) : (
          <p className="font-rajdhani font-normal text-xl text-white">Loading...</p>
        )}
      </div>

      {/* {errorMessage && <p className="text-red-500 text-xl">{errorMessage}</p>} */}

      <p className="font-rajdhani font-medium text-lg text-siteViolet cursor-pointer mt-5"
        onClick={() => navigate('/create-battle')}
      >Or create a new battle
      </p>
    </>
  );
};

export default PageHOC(
  JoinBattle,
  <>Join <br /> a Battle</>,
  <>Join already existing battles</>,
);
