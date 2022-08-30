import React from 'react';

import styles from '../styles';

const Card = ({ card, title, restStyles, onAttack }) => (
  <div
    className={`${styles.cardContainer} ${restStyles} transition-all`}
    onClick={() => onAttack(7)}
  >
    <img src={card.img} alt="ace_card" className={styles.cardImg} />

    <div className={`${styles.cardPointContainer} sm:left-[21.2%] left-[22%] ${styles.flexCenter}`}>
      <p className={`${styles.cardPoint} text-yellow-400`}>{card.attack}</p>
    </div>
    <div className={`${styles.cardPointContainer} sm:right-[14.2%] right-[15%] ${styles.flexCenter}`}>
      <p className={`${styles.cardPoint} text-red-700`}>{card.defense}</p>
    </div>

    <div className={`${styles.cardTextContainer} ${styles.flexCenter}`}>
      <p className={styles.cardText}>{title}</p>
    </div>
  </div>
);

export default Card;
