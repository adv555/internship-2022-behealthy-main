import clsx from 'clsx';
import { ReactComponent as NotificationItem } from '../../../../assets/icons/header/ring.svg';
import './portal-header-notifications.css';

interface PortalHeaderNotificationsProps {
  isUnreadNotifications?: boolean;
}

export const PortalHeaderNotifications = ({
  isUnreadNotifications = false,
}: PortalHeaderNotificationsProps) => {
  const unreadNotifications = isUnreadNotifications
    ? 'unread-notifications'
    : null;

  return (
    <button className={clsx('notifications-button', unreadNotifications)}>
      <NotificationItem />
    </button>
  );
};
