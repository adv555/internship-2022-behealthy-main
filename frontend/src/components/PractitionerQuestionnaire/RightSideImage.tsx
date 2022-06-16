import React from 'react';

export const RightSideImage = ({ Img }: { Img: string }) => {
  return (
    <div className="w-453 h-338">
      <img src={Img} alt="slider img in sign in page" />
    </div>
  );
};
