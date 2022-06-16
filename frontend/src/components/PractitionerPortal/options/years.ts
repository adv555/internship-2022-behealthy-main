import { PractitionerConst } from 'common/const/practitioner.const';

export const yearsList = () => {
  const currentYear = new Date().getFullYear();
  const targetYear = currentYear - PractitionerConst.EDUCATION_YEARS_PERIOD;
  const years = [];

  for (let year = currentYear; year >= targetYear; year--) {
    years.push({
      value: year.toString(),
      label: year.toString(),
    });
  }

  return years;
};
