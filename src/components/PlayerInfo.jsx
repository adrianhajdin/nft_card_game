import styles from '../styles';

const healthPoints = 25;

const healthLevel = (points) => (points >= 12 ? 'bg-green-500' : points >= 6 ? 'bg-orange-500' : 'bg-red-500');
const marginIndexing = (index) => (index !== healthPoints - 1 ? 'mr-1' : 'mr-0');

const PlayerInfo = ({ player, playerIcon, mt, errorMessage }) => (
  <div className={`${styles.flexCenter} ${mt ? 'mt-4' : 'mb-4'}`}>
    <div className={`${styles.healthBar} ${player.health > 0 ? 'bg-opacity-10 backdrop-filter backdrop-blur-lg' : 'bg-opacity-0'}`}>
      <img src={playerIcon} alt="player02" className="w-14 h-14 object-contain rounded-full mr-4" />
      <div className="flex flex-col">
        {player.playerName && <p className="text-green-500 text-xl mb-5">{player.playerName} {player.playerAddress.slice(0, 10)}</p>}
        <div className="flex">
          <p className="text-xl mr-2 text-white">M: {player.mana}</p>
          <p className="text-xl mr-2 text-white">H: {player.health}</p>
          {errorMessage && <p className="text-xl mr-2 text-red">{errorMessage}</p>}
          {[...Array(player.health).keys()].map((item, index) => (
            <div key={`player-item-${item}`} className={`${styles.healthBarPoint} ${healthLevel(player.health)} ${marginIndexing(index)}`} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default PlayerInfo;
