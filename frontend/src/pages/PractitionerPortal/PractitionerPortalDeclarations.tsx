import { RootState } from 'common/types/app/root-state.type';
import { NoCards } from 'components/common/NoCards/NoCards';
import { SimpleSelect } from 'components/common/Select/Select';
import { sortStyles } from 'components/common/Select/selectSort.styles';
import { Typography } from 'components/common/Typography';
import { DeclarationCard } from 'components/PractitionerPortal/DeclarationCard/DeclarationCard';
import { prepareDeclarations } from 'components/PractitionerPortal/helpers/prepareDeclarations';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DeclarationActionCreator } from 'store/declaration/declaration.reducer';

const options = [
  { value: 'Name', label: 'By Name' },
  { value: 'Date', label: 'By Date' },
];

export const PractitionerPortalDeclarations = () => {
  const dispatch = useDispatch();
  const practitioner = useSelector(
    (state: RootState) => state.practitioner.data,
  );
  const declarations = useSelector((state: RootState) => state.declaration);
  const filterByName = useSelector(
    (state: RootState) => state.declaration_filters.filterByName,
  );
  const [sortOption, setOption] = useState('');

  useEffect(() => {
    if (practitioner !== null) {
      dispatch(
        DeclarationActionCreator.getDeclarationListByStatus(
          practitioner.id,
          'REQUESTED',
        ),
      );
    }
  }, [dispatch, practitioner]);

  let preparedDeclarations = prepareDeclarations(
    declarations.items.slice(),
    filterByName,
    sortOption,
  );

  return (
    <div className="py-4 pl-9 pr-10">
      <div className="flex justify-between">
        <Typography type="h4" tagName="h2" className="mb-4">
          Declaration requests page
        </Typography>
        <SimpleSelect
          name={`sortBy`}
          options={options}
          placeholder={'Sort by'}
          styles={sortStyles}
          onChange={(option) => {
            //@ts-ignore
            setOption(option.value as string);
          }}
        />
      </div>
      {preparedDeclarations.length == 0 && (
        <NoCards label="No declaration requests yet" />
      )}
      <div className="grid gap-x-10 gap-y-4 grid-cols-declaration-cards">
        {preparedDeclarations.map((item, index) => {
          return (
            <DeclarationCard
              key={index}
              avatar={
                item.patient.user.avatar
                  ? item.patient.user.avatar
                  : 'https://via.placeholder.com/150'
              }
              patientId={item.patient_id!}
              name={item.patient.first_name + ' ' + item.patient.last_name}
              phone={item.patient.phone}
              adress={item.patient.address}
              declaration={item}
            />
          );
        })}
      </div>
    </div>
  );
};
