const styles = {
  // general
  headText: 'font-rajdhani font-bold text-white sm:text-6xl text-4xl',
  normalText: 'font-rajdhani font-normal text-[24px] text-siteWhite',
  footerText: 'font-rajdhani font-medium text-base text-white',
  infoText: 'font-rajdhani font-medium text-lg text-siteViolet cursor-pointer',

  // glassmorphism
  glassEffect: 'bg-white backdrop-filter backdrop-blur-lg bg-opacity-10',

  // hoc page
  hocContainer: 'min-h-screen flex xl:flex-row flex-col relative',
  hocContentBox: 'flex flex-1 justify-between bg-siteblack py-8 sm:px-12 px-8 flex-col',
  hocLogo: 'w-[160px] h-[52px] object-contain',
  hocBodyWrapper: 'flex-1 flex justify-center flex-col xl:mt-0 my-16',

  // join battle page
  joinHeadText: 'font-rajdhani font-semibold text-2xl text-white mb-3',
  joinContainer: 'flex flex-col gap-3 mt-3 mb-5',
  joinBattleTitle: 'font-rajdhani font-normal text-xl text-white',
  joinLoading: 'font-rajdhani font-normal text-xl text-white',

  // battleground page
  battlegroundContainer: 'min-h-screen bg-landing flex-col py-12 px-4',
  battleGroundsWrapper: 'flex-wrap mt-10 max-w-[1200px]',
  battleGroundCard: 'sm:w-[420px] w-full h-[260px] p-2 glass-morphism m-4 rounded-lg cursor-pointer battle-card',
  battleGroundCardImg: 'w-full h-full object-cover rounded-md',
  battleGroundCardText: 'font-rajdhani font-semibold text-2xl text-white',

  // Game page
  gameContainer: 'w-screen min-h-screen bg-cover bg-no-repeat bg-center flex-col',
  gameMoveBox: 'sm:w-20 w-14 sm:h-20 h-14 rounded-full cursor-pointer border-[2px]',
  gameMoveIcon: 'w-1/2 h-1/w-1/2 object-contain',
  healthBar: 'flex flex-row bg-white rounded-md p-2 sm:min-w-[512px] min-w-[312px] sm:min-h-[48px] min-h-[40px]',
  healthBarPoint: 'sm:w-4 w-2 sm:h-8 h-6 rounded-sm',

  // card styles
  cardContainer: 'relative sm:w-[260px] w-[220px] sm:h-[335px] h-[280px] z-0',
  cardImg: 'w-full h-full object-contain',
  cardPointContainer: 'absolute sm:w-[40px] w-[32px] sm:h-[40px] h-[32px] rounded-[25px] bottom-[31.4%]',
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
  flexBetween: 'flex justify-between items-center',

  // alert
  info: 'text-blue-700 bg-blue-100 dark:bg-blue-200 dark:text-blue-800',
  success: 'text-green-700 bg-green-100 dark:bg-green-200 dark:text-green-800',
  failure: 'text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800',

};

export default styles;
