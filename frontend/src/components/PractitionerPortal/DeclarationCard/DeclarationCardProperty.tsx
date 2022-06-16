import { Typography } from 'components/common/Typography';

interface DeclarationCardPropertyProps {
  property: string;
  value: string;
  rootClassName?: string;
}

export const DeclarationCardProperty = ({
  property,
  value,
  rootClassName,
}: DeclarationCardPropertyProps) => {
  return (
    <div className={rootClassName}>
      <Typography type="Ag-13-medium" className="text-gray">
        {property}
      </Typography>
      <Typography type="Ag-15-medium">{value}</Typography>
    </div>
  );
};
