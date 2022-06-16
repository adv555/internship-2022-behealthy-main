import { RootState } from 'common/types/app/root-state.type';
import { Checkbox } from 'components/common/Checkbox/Checkbox';
import { ProfileSection } from 'components/common/ProfileSection/ProfileSection';
import { Typography } from 'components/common/Typography';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationSettingsActionCreator } from 'store/notifications/notifications.reducer';

export const PractitionerNotifications = () => {
  const dispatch = useDispatch();
  const { isLoaded, data } = useSelector((state: RootState) => state.user);
  const { settings } = useSelector(
    (state: RootState) => state.notification_settings,
  );

  useEffect(() => {
    isLoaded &&
      dispatch(NotificationSettingsActionCreator.loadSettings(data?.id));
  }, [isLoaded]);

  const updateUpcomingVisits = () => {
    dispatch(
      NotificationSettingsActionCreator.updateSettings({
        id: settings?.id,
        userId: data?.id,
        updatedSettings: {
          upcoming_visits: !settings?.upcoming_visits,
        },
      }),
    );
  };

  const updateCancelDeclaration = () => {
    dispatch(
      NotificationSettingsActionCreator.updateSettings({
        id: settings?.id,
        updatedSettings: {
          cancel_declaration: !settings?.cancel_declaration,
        },
      }),
    );
  };

  return (
    <ProfileSection title="Notifications">
      <Typography type="Ag-15-medium" className="mb-8">
        Choose notifications you want to see.
      </Typography>
      <div className="flex justify-between items-center mb-8">
        <Typography type="Ag-16-medium">Upcoming visits</Typography>
        <Checkbox
          onChangeHandler={updateUpcomingVisits}
          checked={settings?.upcoming_visits}
        />
      </div>
      <div className="flex justify-between items-center">
        <Typography type="Ag-16-medium">
          Proposition to terminate declaration from the patient
        </Typography>
        <Checkbox
          onChangeHandler={updateCancelDeclaration}
          checked={settings?.cancel_declaration}
        />
      </div>
    </ProfileSection>
  );
};
