import React, { FC } from 'react';
import { SliderSignBoard } from './SliderSignBoard';
import {
  styleConstSliderView,
  CirleConstSliderImg,
} from 'common/const/sliderSign.const';

type TLiteralSlider = 'empty' | 'slider' | 'personal' | 'mobile';
type TLiterSize = 'default' | 'medium' | 'big' | 'full';
type TLiterCircleSize = 'half' | 'fullMedium' | 'full';

export interface ISliderPage {
  status?: TLiteralSlider;
  sizePage?: TLiterSize;
  circleSize?: TLiterCircleSize;
  children?: React.ReactNode;
}

export const SliderPage: FC<ISliderPage> = ({
  status,
  sizePage,
  circleSize,
}) => {
  return (
    <div className={`${styleConstSliderView[sizePage!]}`}>
      <div className="relative w-full">
        <span
          className="bg-[url('assets/img/signIn/elipseTop.png')] bg-no-repeat z-10 bg-contain ml-7 absolute top:1px
        lg:w-40 lg:h-36 
        md:w-28 md:h-28 
        sm:w-24 sm:h-16 
        w-20 h-12 top-0.5"
        ></span>
        <span
          className="bg-[url('assets/img/signIn/elipseRight.png')] bg-no-repeat bg-cover flex justify-center items-center absolute z-10
           lg:left-[calc(100%-124px)] lg:w-circleSignR lg:h-48 
           md:w-24 md:h-36 md:left-[calc(100%-96px)] 
           sm:h-32 sm:w-20 sm:left-[calc(100%-80px)] 
           h-24 w-16 left-[calc(100%-65px)] top-9"
        >
          <div className="relative block">
            <span
              className="bg-[url('assets/img/signIn/elipseRSmall.png')] bg-no-repeat bg-contain  absolute inline-block 
            lg:h-4 lg:w-4 lg:right-24 lg:top-3
            md:h-3 md:w-3 md:right-20 md:top-2
            sm:h-2 sm:w-2 sm:right-16 sm:top-2
            h-4 w-4 z-10 right-16 top-3"
            ></span>
            <span
              className="bg-[url('assets/img/signIn/elipseRSmall1.png')] bg-no-repeat absolute inline-block 
            lg:h-5 lg:w-4 lg:right-16 lg:top-14
            md:h-4 md:w-3 md:right-12 sm:top-12
            h-3 w-2 z-10 right-10 top-12"
            ></span>
          </div>
        </span>
        <span className={`${CirleConstSliderImg[circleSize!]} `}>
          <span
            className="bg-[url('assets/img/signIn/elipseBSmall.png')] bg-no-repeat  
          lg:h-6 lg:w-4 lg:right-40
          md:h-5 md:w-3 md:right-36 
          sm:h-3 sm:w-2 sm:right-28 
          h-2 w-2 absolute z-10 right-24"
          ></span>
          <span
            className="bg-[url('assets/img/signIn/elipseBSmall1.png')] bg-no-repeat absolute z-10
          lg:h-7 lg:w-7 lg:right-40 lg:top-10  
          md:h-6 md:w-6 md:right-36 md:top-8
          sm:h-3 sm:w-3 sm:right-28 sm:top-6
          h-3 w-3 right-28 top-4"
          ></span>
        </span>
      </div>
      <SliderSignBoard status={status!} />
    </div>
  );
};
