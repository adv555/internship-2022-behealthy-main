import React, { useEffect, useState } from 'react';
import { SimpleSelect } from 'components/common/Select/Select';
import { gender } from '../mock-data/select-options';
import { SearchInput } from 'components/common/Input/SearchInput';
import { useDispatch } from 'react-redux';
import { DeclarationFilterActionCreator } from 'store/declaration/declarationFilters.reducer';

interface FiltersDashboardProps {
  genderFilter?: string;
}

export const FiltersDashboard: React.FC<FiltersDashboardProps> = ({
  genderFilter,
}) => {
  const dispatch = useDispatch();
  const [genderOption, setGenderOption] = useState('');

  useEffect(() => {
    dispatch(DeclarationFilterActionCreator.setFilterByGender(genderOption));
  }, [dispatch, genderOption]);

  useEffect(() => {
    if (!genderFilter) {
      return;
    }
    setGenderOption(genderFilter);
  }, [genderFilter]);

  return (
    <div className="grid gap-x-10 gap-y-4 grid-cols-declaration-cards ">
      <SimpleSelect
        label="Gender"
        name={'gender'}
        value={genderOption}
        options={gender}
        className={'min-w-[338px] basis-2/6'}
        onChange={(option) => {
          //@ts-ignore
          setGenderOption(option.value as string);
        }}
      />
      <SearchInput
        id={'search'}
        placeholder={'Search city...'}
        label={'City'}
        size={'min-w-[338px] basis-2/6 border-greyScaleGrey'}
        onChange={(e: { currentTarget: { value: string } }) => {
          dispatch(
            DeclarationFilterActionCreator.setFilterByCity(
              e.currentTarget.value,
            ),
          );
        }}
      />
    </div>
  );
};
