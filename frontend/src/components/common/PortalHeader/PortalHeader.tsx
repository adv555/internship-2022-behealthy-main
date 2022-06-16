import { PortalHeaderAvatar } from './PortalHeaderAvatar/PortalHeaderAvatar';
import { OptionsDropdown } from '../OptionsDropdown/OptionsDropdow';
import { PortalHeaderNotifications } from './PortalHeaderNotifications/PortalHeaderNotifications';
import { SearchInput } from '../Input/SearchInput';
import { useLocation } from 'react-router';
import { AppRoute } from 'common/enums/app/app-route.enum';
import React from 'react';
import { DeclarationFilterActionCreator } from 'store/declaration/declarationFilters.reducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'common/types/app/root-state.type';
import { ReducerName } from 'common/enums/app/reducer-name.enum';

interface PortalHeaderProps {
  profileLink: string;
}

export const PortalHeader = ({ profileLink }: PortalHeaderProps) => {
  const languages = [
    {
      id: 1,
      title: 'English',
      label: 'EN',
    },
    {
      id: 2,
      title: 'Ukrainian',
      label: 'UA',
    },
  ];
  const location = useLocation();
  const dispatch = useDispatch();
  const keyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      dispatch(
        DeclarationFilterActionCreator.setFilterByName(e.currentTarget.value),
      );
    }
  };

  const { data: user } = useSelector(
    (state: RootState) => state[ReducerName.USER],
  );

  return (
    <header className="w-full h-[90px] flex justify-between items-center py-6 px-11 pl-9 border-b border-b-neutral-200">
      {(location.pathname === AppRoute.PRACTITIONER_PORTAL_DECLARATIONS ||
        location.pathname === AppRoute.PRACTITIONER_PORTAL ||
        location.pathname === AppRoute.PRACTITIONER_PORTAL_PATIENTS) && (
        <SearchInput
          id={'search'}
          placeholder={'Search patients...'}
          onKeyDown={keyPress}
        />
      )}
      {(location.pathname === AppRoute.PATIENT_PORTAL ||
        location.pathname === AppRoute.PATIENT_PORTAL_PRACTITIONERS ||
        location.pathname === AppRoute.PATIENT_PORTAL_SCHEDULE ||
        location.pathname === AppRoute.PATIENT_PORTAL_SCHEDULE_APPOINTMENT) && (
        <SearchInput
          id={'search'}
          placeholder={'Search practitioner...'}
          onKeyDown={keyPress}
        />
      )}
      <div className="flex items-center ml-auto">
        <OptionsDropdown defaultOption="EN" options={languages} />
        <PortalHeaderNotifications />
        <PortalHeaderAvatar
          icon={user && user.avatar ? <img src={user.avatar} /> : undefined}
          profileLink={profileLink}
        />
      </div>
    </header>
  );
};
