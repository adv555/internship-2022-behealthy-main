import React from 'react';

interface Props {
  path?: string;
}

const ImageThumb: React.FC<Props> = ({ path }) => (
  <div className=" flex flex-col justify-center items-center text-center border-0 h-[308px] mb-8 w-343 md:w-full">
    <img src={path} alt="" className=" w-full h-full object-cover" />
  </div>
);

export default ImageThumb;
