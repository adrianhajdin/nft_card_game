const styles = {
  // glassmorphism
  glassEffect: 'bg-white backdrop-filter backdrop-blur-lg bg-opacity-10',

  // Game page
  gameContainer: 'relative w-screen h-screen',
  gameBattleBg: 'bg-cover bg-no-repeat bg-center w-full h-full',
  gameCardsContainer: 'absolute inset-0 flex-col',
  healthContainer: 'absolute right-0 left-0 flex-col',
  healthBar: 'flex flex-row bg-white rounded-md backdrop-filter backdrop-blur-lg bg-opacity-10 p-2 min-w-[612px]',
  healthBarPoint: 'w-5 h-10 rounded-sm',

  // card styles
  cardContainer: 'relative w-[360px] h-[335px] z-0',
  cardImg: 'w-full h-full object-contain',
  cardPointContainer: 'absolute w-[40px] h-[40px] rounded-[25px] bottom-[31.2%]',
  cardPoint: 'font-rajdhani text-[20px] font-bold',
  cardTextContainer: 'absolute w-full bottom-[13.5%] left-3',
  cardText: 'font-rajdhani text-[26px] font-bold text-white',

  // mana meter
  manaMeterContainer: 'absolute lg:right-[16%] right-[5%] top-[30%] flex-col',
  manaMeter: 'w-10 h-[400px] rounded-sm overflow-hidden flex-col',
  manaMeterBlock: 'w-full bg-slate-300',
  manaValueText: 'font-rajdhani text-violet-900 font-bold',
  manaTitle: 'font-rajdhani text-white font-bold mt-2 text-sm',

  // common
  flexCenter: 'flex items-center justify-center',
  flexEnd: 'flex justify-end items-end',
};

export default styles;
