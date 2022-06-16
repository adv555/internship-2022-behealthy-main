import React from 'react';
import { ISliderSignIngInfoConst } from 'common/const/sliderSign.const';
import chevronImg from 'assets/img/signIn/chevron.svg';

export interface ISliderInfo {
  sliderNumber: number;
  setSliderNumber: React.Dispatch<React.SetStateAction<number>>;
  sliderTextInfo: Pick<ISliderSignIngInfoConst, 'tittle' | 'description'>;
  getLen: number;
}

export const SliderBoard = (props: ISliderInfo) => {
  const { sliderNumber, setSliderNumber, sliderTextInfo, getLen } = props;
  const createArrayOfLen = Array.from(Array(getLen + 1).keys());

  const prevSlider = () => {
    return sliderNumber === 0
      ? setSliderNumber(getLen)
      : setSliderNumber((prev) => prev - 1);
  };

  const nextSlider = () => {
    return sliderNumber === getLen
      ? setSliderNumber(0)
      : setSliderNumber((prev) => prev + 1);
  };

  return (
    <div className="max-w-md max-h-44 mt-7">
      <h2 className="text-h2 leading-h2 text-greyScaleWhite text-center font-barlow font-bold">
        {sliderTextInfo.tittle}
      </h2>
      <div className="text-greyScaleWhite h-20 text-center opacity-80 font-barlow font-medium">
        {sliderTextInfo.description}
      </div>
      <div className="flex max-w-full mt-6  justify-between">
        <img
          src={chevronImg}
          alt="arrow left img"
          className="active:drop-shadow-2xl hover:scale-110 cursor-pointer"
          onClick={prevSlider}
        ></img>
        <div className="w-sm h-10 flex justify-around items-center">
          {createArrayOfLen.map((_, index) => (
            <span
              key={index}
              className={
                index === sliderNumber
                  ? 'w-sliderBtn h-1  rounded bg-greyScaleWhite font-barlow'
                  : 'w-sliderBtn h-1  rounded bg-backgroundColour opacity-50 font-barlow'
              }
            ></span>
          ))}
        </div>
        <img
          src={chevronImg}
          alt="arrow right img"
          className="rotate-180 active:drop-shadow-2xl hover:scale-110 cursor-pointer"
          onClick={nextSlider}
        ></img>
      </div>
    </div>
  );
};
