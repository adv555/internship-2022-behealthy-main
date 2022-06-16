import React, { useState } from 'react';
import { sliderSignInfoConst } from 'common/const/sliderSign.const';
import { SliderImage } from 'components/common/SignIn/SliderImage';
import { SliderBoard } from 'components/common/SignIn/SliderBoard';
import { styleConstSliderImage } from 'common/const/sliderSign.const';

export const SliderSignBoard = ({ status }: { status: string }) => {
  const [sliderNumber, setSliderNumber] = useState<number>(0);
  const sliderTextInfo = sliderSignInfoConst[sliderNumber];
  const getLen = sliderSignInfoConst.length - 1;

  if (status === 'empty') {
    return (
      <div className="flex justify-center flex-col items-center pt-56 pb-56 h-full" />
    );
  }

  return (
    <>
      <div className="flex justify-center flex-col items-center pt-56 pb-56 h-full">
        {status === 'slider' ? (
          <>
            <div className="flex justify-center align-center relative">
              {sliderSignInfoConst.map((itemImg, index) => (
                <SliderImage
                  key={index}
                  sliderImg={itemImg.img}
                  slideIndex={index}
                  sliderNumber={sliderNumber}
                />
              ))}
            </div>
            <SliderBoard
              {...{ sliderNumber, setSliderNumber, sliderTextInfo, getLen }}
            />
          </>
        ) : (
          <SliderImage
            sliderImg={styleConstSliderImage[status!]}
            slideIndex={sliderNumber}
            sliderNumber={sliderNumber}
          />
        )}
      </div>
    </>
  );
};
