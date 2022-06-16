import { Typography } from 'components/common/Typography';

interface PractitionerCardPropertyProps {
  property: string;
  value: string;
  rootClassName?: string;
}

export const PractitionerCardProperty = ({
  property,
  value,
  rootClassName,
}: PractitionerCardPropertyProps) => {
  return (
    <div className={rootClassName}>
      <Typography type="Ag-13-medium" className=" text-greyScaleGrey">
        {property || 'N/A'}
      </Typography>
      <Typography type="Ag-15-medium" className=" text-greyScaleMainBlack">
        {value || 'N/A'}
      </Typography>
    </div>
  );
};
