import React from 'react';
import { randomCardGenerator } from '../data/cards';

import styles from '../styles';

const img1 = randomCardGenerator().img;
const img2 = randomCardGenerator().img;

const Card = ({ card, title, restStyles, playerTwo }) => (
  <div className={`${styles.cardContainer} ${restStyles} transition-all`}>
    <img src={playerTwo ? img2 : img1} alt="ace_card" className={styles.cardImg} />

    <div className={`${styles.cardPointContainer} sm:left-[21.2%] left-[22%] ${styles.flexCenter}`}>
      <p className={`${styles.cardPoint} text-yellow-400`}>{card.att}</p>
    </div>
    <div className={`${styles.cardPointContainer} sm:right-[14.2%] right-[15%] ${styles.flexCenter}`}>
      <p className={`${styles.cardPoint} text-red-700`}>{card.def}</p>
    </div>

    <div className={`${styles.cardTextContainer} ${styles.flexCenter}`}>
      <p className={styles.cardText}>{title}</p>
    </div>
  </div>
);

export default Card;
