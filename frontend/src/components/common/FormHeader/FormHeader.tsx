import React from 'react';
import { Typography } from '../Typography';

interface FormHeaderProps {
  title: string;
  subtitle?: string;
}

const FormHeader: React.FC<FormHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="w-343 md:w-480">
      <Typography type="h2" className=" text-greyScaleMainBlack mb-3">
        {title}
      </Typography>
      <Typography type="Ag-15-medium">
        {subtitle ||
          'Fill in the fields below. We won’t share your personal or medical information anywhere.'}
      </Typography>
    </div>
  );
};

export default FormHeader;
