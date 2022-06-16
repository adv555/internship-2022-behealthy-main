import { RootState } from 'common/types/app/root-state.type';
import { NoCards } from 'components/common/NoCards/NoCards';
import { SimpleSelect } from 'components/common/Select/Select';
import { sortStyles } from 'components/common/Select/selectSort.styles';
import { Typography } from 'components/common/Typography';
import { PatientCard } from 'components/PractitionerPortal/DeclarationCard/PatientCard';
import { prepareDeclarations } from 'components/PractitionerPortal/helpers/prepareDeclarations';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeclarationActionCreator } from 'store/declaration/declaration.reducer';

const options = [
  { value: 'Name', label: 'By Name' },
  { value: 'Date', label: 'By Date' },
];

export const PractitionerPortalPatients = () => {
  const dispatch = useDispatch();
  const practitioner = useSelector(
    (state: RootState) => state.practitioner.data,
  );
  const declarations = useSelector((state: RootState) => state.declaration);
  const filterByName = useSelector(
    (state: RootState) => state.declaration_filters.filterByName,
  );
  const [sortOption, setOption] = useState('');
  const [declarationStatus, setStatus] = useState('ACTIVE');

  useEffect(() => {
    if (practitioner !== null) {
      dispatch(
        DeclarationActionCreator.getDeclarationListByStatus(
          practitioner.id,
          declarationStatus,
        ),
      );
    }
  }, [practitioner, declarationStatus]);

  let preparedDeclarations = prepareDeclarations(
    declarations.items.slice(),
    filterByName,
    sortOption,
  );

  return (
    <div className="py-4 pl-9 pr-10">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <Typography type="h4" tagName="h2" className="mb-4">
            My patients
          </Typography>
          <div className="flex flex-row gap-4 mt-0.5 mb-4 text-Ag-12">
            <button
              className={
                declarationStatus === 'ACTIVE'
                  ? 'underline text-primaryBlue font-semibold'
                  : 'font-semibold'
              }
              onClick={() => setStatus('ACTIVE')}
            >
              Active
            </button>
            <button
              className={
                declarationStatus === 'INACTIVE'
                  ? 'underline text-primaryBlue font-semibold'
                  : 'font-semibold'
              }
              onClick={() => setStatus('INACTIVE')}
            >
              Terminated
            </button>
          </div>
        </div>
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
      {preparedDeclarations.length == 0 && <NoCards label="No patients yet" />}
      <div className="grid gap-x-10 gap-y-4 grid-cols-declaration-cards">
        {preparedDeclarations.map((item, index) => {
          return (
            <PatientCard
              key={index}
              avatar={
                item.patient.user.avatar
                  ? item.patient.user.avatar
                  : 'https://via.placeholder.com/150'
              }
              name={item.patient.first_name + ' ' + item.patient.last_name}
              phone={item.patient.phone}
              adress={item.patient.address}
              declaration={item}
              status={declarationStatus}
            />
          );
        })}
      </div>
    </div>
  );
};
