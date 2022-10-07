import ReactTooltip from 'react-tooltip';
import styles from '../styles';

const healthPoints = 25;

const healthLevel = (points) => (points >= 12 ? 'bg-green-500' : points >= 6 ? 'bg-orange-500' : 'bg-red-500');
const marginIndexing = (index) => (index !== healthPoints - 1 ? 'mr-1' : 'mr-0');

const PlayerInfo = ({ player, playerIcon, mt }) => (
  <div className={`${styles.flexCenter} ${mt ? 'mt-4' : 'mb-4'}`}>
    <img data-for="Player" data-tip src={playerIcon} alt="player02" className="w-14 h-14 object-contain rounded-full" />

    {/* <div className={`${styles.healthBar} ${player.health > 0 ? 'bg-opacity-10 backdrop-filter backdrop-blur-lg' : 'bg-opacity-0'} mx-3`}> */}
    <div
      data-for="Health"
      data-tip={`Health: ${player.health || 25}`}
      className={`${styles.healthBar} ${25 > 0 ? 'bg-opacity-10 backdrop-filter backdrop-blur-lg' : 'bg-opacity-0'} mx-3`}
    >
      {/* <div className="flex flex-col"> */}
      {/* {player.playerName && <p className="text-green-500 text-xl mb-5">{player.playerName} {player.playerAddress.slice(0, 10)}</p>} */}
      {/* <div className="flex" > */}
      {/* <p className="text-xl mr-2 text-white">M: {player.mana}</p> */}
      {/* <p className="text-xl mr-2 text-white">H: {player.health}</p> */}
      {[...Array(player.health || 25).keys()].map((item, index) => (
        <div key={`player-item-${item}`} className={`${styles.healthBarPoint} ${healthLevel(player.health)} ${marginIndexing(index)}`} />
      ))}
      {/* </div> */}
      {/* </div> */}
    </div>

    <div
      data-for="Mana"
      data-tip="Mana"
      className={`${styles.flexCenter} w-14 h-14 rounded-full bg-opacity-10 backdrop-filter backdrop-blur-lg text-white font-rajdhani font-extrabold text-2xl cursor-pointer`}
    >03
    </div>

    <ReactTooltip id="Player" effect="solid" backgroundColor="#7f46f0">
      <p className="font-rajdhani font-medium"><span className="font-extrabold text-white">Name:</span> Test</p>
      <p className="font-rajdhani font-medium"><span className="font-extrabold text-white">Address:</span> 0xwdh25qsa724359476n</p>
    </ReactTooltip>
    <ReactTooltip id="Health" effect="solid" backgroundColor="#7f46f0" />
    <ReactTooltip id="Mana" effect="solid" backgroundColor="#7f46f0" />
  </div>
);

export default PlayerInfo;
