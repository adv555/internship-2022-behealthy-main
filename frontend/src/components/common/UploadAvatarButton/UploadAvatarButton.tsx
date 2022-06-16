import { ChangeEvent, MutableRefObject, useRef, useState } from 'react';
import { useFormikContext } from 'formik';
import { Typography } from '../Typography';
import './upload-avatar-button.css';

type UploadAvatarButtonProps = {
  fieldName: string;
  imgUrl?: string;
  setFieldValue: (name: string, value: any) => void;
};

export const UploadAvatarButton = ({
  fieldName,
  imgUrl,
  setFieldValue,
}: UploadAvatarButtonProps) => {
  const { submitForm } = useFormikContext();

  const inputFile: MutableRefObject<null> = useRef(null);

  const [img, setImg] = useState(imgUrl || '');

  const onImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event && event.currentTarget && event.currentTarget.files) {
      const file = event.currentTarget.files[0];
      setFieldValue(fieldName, file);
      setImg(URL.createObjectURL(file));

      submitForm();
    }
  };

  return (
    <>
      <label ref={inputFile} className="upload-avatar-button">
        {!img ? (
          <Typography type="Ag-13-medium">Upload avatar</Typography>
        ) : (
          <img src={img} alt="Your photo" />
        )}
        <input
          className=" hidden"
          id={fieldName}
          name={fieldName}
          type="file"
          accept="image/png, image/jpeg"
          onChange={onImageUpload}
          ref={inputFile}
        />
      </label>
    </>
  );
};
