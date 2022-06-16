import { StylesConfig } from 'react-select';
import { colors } from '../../../assets/colors';

export const sortStyles: StylesConfig = {
  control: (provided, state) => ({
    ...provided,

    minHeight: '48px',
    paddingLeft: '12px',
    paddingRight: '12px',

    background: colors.backgroundColour,
    borderRadius: '8px',
    boxShadow: 'none',
    border: 'none',
    stroke:
      state.isFocused || state.hasValue || state.menuIsOpen
        ? `1px solid ${colors.primaryBlue}`
        : `1px solid ${colors.greyScaleGrey}`,

    ':hover': {
      stroke: colors.primaryBlue,
    },
    ':active': {
      stroke: colors.primaryBlue,
    },
  }),
  placeholder: (provided) => ({
    ...provided,

    fontWeight: '500',
    fontSize: '15px',
    lineHeight: '22px',
    color: colors.greyScaleMainBlack,
    opacity: 0.7,
  }),

  dropdownIndicator: (provided) => ({
    ...provided,
  }),
  menu: (provided) => ({
    ...provided,
    padding: '6px 12px',
    background: colors.backgroundColour,
    borderRadius: '8px',
    boxShadow: '0px 4px 16px rgba(29, 101, 137, 0.15)',
    border: 'none',
  }),

  option: (provided) => ({
    ...provided,
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    height: '48px',
    fontWeight: '500',
    fontSize: '15px',
    lineHeight: '22px',
    background: colors.backgroundColour,
    borderRadius: '8px',
    border: 'none',
    color: colors.greyScaleMainBlack,
    opacity: 0.7,
    ':hover': {
      background: colors.fieldChosen,
      cursor: 'pointer',
    },
    ':active': {
      background: colors.fieldChosen,
    },
  }),

  singleValue: (provided) => ({
    ...provided,
    color: colors.greyScaleMainBlack,
    fontWeight: '500',
    fontSize: '15px',
    lineHeight: '22px',
  }),
};
