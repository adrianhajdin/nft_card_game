import React from 'react';

import styles from '../styles';

const Card = ({ card, title, restStyles, onAttack }) => (
  <div
    className={`${styles.cardContainer} ${restStyles} hover:scale-[1.05] transition-all`}
    onClick={() => onAttack(7)}
  >
    <img src={card.img} alt="ace_card" className={styles.cardImg} />

    <div className={`${styles.cardPointContainer} left-[29.2%] ${styles.flexCenter}`}>
      <p className={`${styles.cardPoint} text-yellow-400`}>{card.attack}</p>
    </div>
    <div className={`${styles.cardPointContainer} right-[24.2%] ${styles.flexCenter}`}>
      <p className={`${styles.cardPoint} text-red-700`}>{card.defense}</p>
    </div>

    <div className={`${styles.cardTextContainer} ${styles.flexCenter}`}>
      <p className={styles.cardText}>{title}</p>
    </div>
  </div>
);

export default Card;
