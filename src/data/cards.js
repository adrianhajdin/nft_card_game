import { allCards } from '../assets';

const maxPoint = 10;
const minPoint = 1;

export const randomCardGenerator = () => {
  const newCard = allCards[Math.floor(Math.random() * ((allCards.length - 1) - 0) + 0)];

  const attackPoint = Math.floor(Math.random() * (maxPoint - minPoint) + minPoint);
  const defensePoint = maxPoint - attackPoint;

  return {
    id: Date.now(),
    img: newCard,
    attack: attackPoint,
    defense: defensePoint,
  };
};

