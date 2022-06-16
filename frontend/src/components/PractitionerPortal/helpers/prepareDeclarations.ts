import { IDeclarationSelect } from 'common/types/app/Declaration.type';

export const prepareDeclarations = (
  declarations: IDeclarationSelect[],
  filterOption: string,
  sortOption: string,
) => {
  let result = declarations;

  if (filterOption.length > 0) {
    result = declarations.filter((item) => {
      return (
        item.patient.first_name
          .toLowerCase()
          .includes(filterOption.toLowerCase()) ||
        item.patient.last_name
          .toLowerCase()
          .includes(filterOption.toLowerCase())
      );
    });
  }
  if (sortOption.length > 0) {
    switch (sortOption) {
      case 'Name':
        result.sort(function (a, b) {
          const nameA = a.patient.last_name;
          const nameB = b.patient.last_name;
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          return 0;
        });
        break;
      case 'Date':
        result.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
        break;
    }
  }

  return result;
};
