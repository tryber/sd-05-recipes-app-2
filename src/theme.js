import lightCenterBg from './images/background/bg-light-center.png';
import darkCenterBg from './images/background/bg-dark-center.jpg';
import lightCenterDesk from './images/background/bg-light-center-horiz.png';
import darkCenterDesk from './images/background/bg-dark-center-horiz.jpg';

export const lightTheme = {
  body: 'var(--bege)',  
  toggleBorder: "#fff",
  text: 'var(--off-black)',
  backgroundImage: lightCenterBg,
  bgImgDesktop: lightCenterDesk,
  bgColorHeadFoot: 'var(--laranja)',
  bgCard: '#fff',
  bgTextImg: 'none',
  iconBg: 'var(--bege)',
};

export const darkTheme = {
  body: 'var(--off-black)',  
  toggleBorder: "#6B8096",
  text: 'var(--amarelo)',
  backgroundImage: darkCenterBg,
  bgImgDesktop: darkCenterDesk,
  bgColorHeadFoot: 'var(--off-gray)',
  bgCard: 'var(--off-gray)',
  bgTextImg: 'var(--off-gray)',
  iconBg: 'var(--off-gray)',
};
