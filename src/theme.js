import lightCenterBg from './images/background/bg-light-center.png';
import darkCenterBg from './images/background/bg-dark-center.png';
import lightCenterDesk from './images/background/bg-light-center-horiz.png';

export const lightTheme = {
  body: 'var(--bege)',  
  toggleBorder: "#fff",
  text: 'var(--off-black)',
  backgroundImage: lightCenterBg,
  bgImgDesktop: lightCenterDesk,
  bgColorHeadFoot: 'var(--laranja)',
  bgCard: '#fff',
  bgTextImg: 'none',
};

export const darkTheme = {
  body: 'var(--off-black)',  
  toggleBorder: "#6B8096",
  text: 'var(--amarelo)',
  backgroundImage: darkCenterBg,
  bgImgDesktop: 'var(--off-black)',
  bgColorHeadFoot: 'var(--off-gray)',
  bgCard: 'var(--off-gray)',
  bgTextImg: 'var(--off-gray)',
};
