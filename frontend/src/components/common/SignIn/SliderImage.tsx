import React from 'react';

export const SliderImage = ({
  sliderImg,
  slideIndex,
  sliderNumber,
}: {
  sliderImg: string;
  slideIndex: number;
  sliderNumber: number;
}) => {
  return (
    <div className={sliderNumber === slideIndex ? `slider-active` : 'slider'}>
      <img src={sliderImg} alt="slider img in sign in page" />
    </div>
  );
};
