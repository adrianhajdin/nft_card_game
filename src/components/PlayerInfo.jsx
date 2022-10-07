import ReactTooltip from 'react-tooltip';
import styles from '../styles';

const healthPoints = 25;

const healthLevel = (points) => (points >= 12 ? 'bg-green-500' : points >= 6 ? 'bg-orange-500' : 'bg-red-500');
const marginIndexing = (index) => (index !== healthPoints - 1 ? 'mr-1' : 'mr-0');

const PlayerInfo = ({ player, playerIcon, mt }) => (
  <div className={`${styles.flexCenter} ${mt ? 'mt-4' : 'mb-4'}`}>
    <img data-for="Player" data-tip src={playerIcon} alt="player02" className="w-14 h-14 object-contain rounded-full" />

    <div
      data-for="Health"
      data-tip={`Health: ${player.health}`}
      className={`${styles.healthBar} bg-opacity-10 backdrop-filter backdrop-blur-lg mx-3`}
    >
      {[...Array(player.health).keys()].map((item, index) => (
        <div key={`player-item-${item}`} className={`${styles.healthBarPoint} ${healthLevel(player.health)} ${marginIndexing(index)}`} />
      ))}
    </div>

    <div
      data-for="Mana"
      data-tip="Mana"
      className={`${styles.flexCenter} w-14 h-14 rounded-full bg-opacity-10 backdrop-filter backdrop-blur-lg text-white font-rajdhani font-extrabold text-2xl cursor-pointer`}
    >{player.mana || 0}
    </div>

    <ReactTooltip id="Player" effect="solid" backgroundColor="#7f46f0">
      <p className="font-rajdhani font-medium"><span className="font-extrabold text-white">Name:</span> {player?.playerName}</p>
      <p className="font-rajdhani font-medium"><span className="font-extrabold text-white">Address:</span> {player?.playerAddress?.slice(0, 10)}</p>
    </ReactTooltip>
    <ReactTooltip id="Health" effect="solid" backgroundColor="#7f46f0" />
    <ReactTooltip id="Mana" effect="solid" backgroundColor="#7f46f0" />
  </div>
);

export default PlayerInfo;
