import React from 'react';

import { ReactComponent as ImagesLoad } from 'assets/images/images-load.svg';
import { Typography } from 'components/common/Typography';

interface Props {
  text?: string;
  id?: string;
  name?: string;
  onImageUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputFile?: React.MutableRefObject<null>;
}

const ImageUploadInput: React.FC<Props> = ({
  text,
  id,
  name,
  onImageUpload,
  inputFile,
}) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center text-center border-2 border-dashed rounded-lg px-4 pt-11 pb-8 min-h-[188px] border-greyScaleGrey bg-backgroundColour w-343 md:w-full">
        <div className=" mb-4">
          <label htmlFor={name} ref={inputFile}>
            <ImagesLoad className=" cursor-pointer" />
          </label>
          <input
            className=" hidden"
            id={id}
            name={name}
            type="file"
            accept="image/png, image/jpeg"
            onChange={onImageUpload}
            ref={inputFile}
          />
        </div>
        <div>
          <Typography
            type={'Ag-16-semibold'}
            className={' text-greyScaleMainBlack'}
          >
            {text}
          </Typography>
        </div>
      </div>
    </>
  );
};

export default ImageUploadInput;
