import SignInImgMedical from '../../assets/img/signIn/Medical1.png';
import SignInImgMedical2 from '../../assets/img/signIn/Medical2.png';
import SignInImgMedical3 from '../../assets/img/signIn/Medical3.png';
import SignInImgMedical4 from '../../assets/img/signIn/Medical4.png';
import mobileImg from 'assets/img/signIn/mobile.png';
import professionalImg from 'assets/img/signIn/Medical5.png';

interface IIndexSignature {
  [key: string]: string;
}

export interface ISliderSignIngInfoConst {
  img: string;
  tittle: string;
  description: string;
}

export const sliderSignInfoConst: Array<ISliderSignIngInfoConst> = [
  {
    img: `${SignInImgMedical}`,
    tittle: 'Take care of your health',
    description: `The app that covers multiple features — personal information, applying to consultation, chat with doctors etc.`,
  },
  {
    img: `${SignInImgMedical2}`,
    tittle: `Don’t forget checkups`,
    description: `We are notifying our users about checkups and upcoming visits. In our busy world, it’s a common thing to forget about them, so we are here for you.`,
  },
  {
    img: `${SignInImgMedical3}`,
    tittle: `Convinient health history`,
    description: `You don’t need to carry the papers of your health history — everything will saved be in this app for your convinience. Isn’t it a mirracle?`,
  },
  {
    img: `${SignInImgMedical4}`,
    tittle: `Children information`,
    description: `We undestand how it is important to take care of your children, so you will have your child’s information as well. Simply fill in information about them.`,
  },
];

interface TStyles extends IIndexSignature {
  default: string;
  medium: string;
  big: string;
}

interface IStyleCircle extends IIndexSignature {
  half: string;
  full: string;
  fullMedium: string;
}

export const styleConstSliderView: TStyles = {
  default: `bg-primary-blue sm:w-1/2 h-screen w-full `,
  medium: `bg-primary-blue sm:w-1/2 sm:h-[88vh] h-[88vh]  w-full`,
  big: `bg-primary-blue  sm:w-1/2 h-screen w-full `,
  full: `bg-primary-blue h-screen w-full `,
};

export const CirleConstSliderImg: IStyleCircle = {
  half: `bg-[url('assets/img/signIn/elipseBottom.png')] bg-no-repeat bg-cover absolute z-10
  lg:w-40 lg:h-circleSignB lg:left-[calc(100%-328px)] lg:top-[calc(100vh-80px)]
  md:w-36 md:h-20 md:left-[calc(100%-228px)] md:top-[calc(100vh-80px)]
  w-28 h-16 left-[calc(100%-200px)] top-[calc(100vh-64px)]
  `,

  full: `bg-[url('assets/img/signIn/elipseFull.png')] bg-no-repeat bg-contain absolute z-10
  lg:w-40 lg:h-40 lg:left-[calc(100%-328px)] lg:top-[calc(100vh-19vh)]
  md:w-32 md:h-32 md:left-[calc(100%-150px)] md:top-[calc(100vh-19vh)]
  w-24 h-24 left-[calc(100%-190px)] top-[calc(100vh-300px)]`,

  fullMedium: `bg-[url('assets/img/signIn/elipseFull.png')] bg-no-repeat bg-contain absolute z-10 
  lg:w-40 lg:h-40 lg:left-[calc(100%-328px)] lg:top-[calc(100vh-19vh)] 
  md:w-32 md:h-32 md:top-[calc(100vh-18vh)] md:left-[calc(100%-150px)]
  h-24 w-24 left-[calc(100%-190px)] top-[calc(100vh-17vh)] `,
};

interface IStyleimg extends IIndexSignature {
  personal: string;
  mobile: string;
}

export const styleConstSliderImage: IStyleimg = {
  personal: professionalImg,
  mobile: mobileImg,
};
