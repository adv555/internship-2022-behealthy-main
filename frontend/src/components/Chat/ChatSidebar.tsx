import { Typography } from 'components/common/Typography';
import { ReactComponent as CloseProfile } from '../../assets/icons/Close.svg';
import { ReactComponent as Profile } from '../../assets/icons/Profile.svg';
import { ReactComponent as Telephone } from '../../assets/icons/telephone.svg';
import { ReactComponent as Address } from '../../assets/icons/address.svg';
import { useSelector } from 'react-redux';
import { RootState } from 'common/types/app/root-state.type';
import { getChatAvatarByRole } from './hepers/getChatAvatarByRole';

interface ChatSidebarProps {
  role: 'practitioner' | 'patient';
  onClick: React.MouseEventHandler;
}

export const ChatSidebar = ({ role, onClick }: ChatSidebarProps) => {
  const currentChat = useSelector(
    (state: RootState) => state.chat.currentItem.item,
  );
  if (currentChat == null) return <div></div>;
  return (
    <div>
      <div className="h-76px border-b flex items-center px-5">
        <button onClick={onClick}>
          <CloseProfile />
        </button>
        <Typography
          type="Ag-16-semibold"
          tagName="p"
          children="Profile"
          className="mx-auto "
        />
      </div>
      <div className="flex justify-center mt-3">
        <img
          className="w-32 h-32 rounded-full"
          src={getChatAvatarByRole(role, currentChat)}
        />
      </div>
      <div className="border-b">
        <div className="flex m-4 items-center">
          <Profile />
          <Typography
            type="Ag-13-medium"
            tagName="p"
            className="px-2"
            children={
              role === 'patient'
                ? currentChat.familyPractitioner.first_name +
                  ' ' +
                  currentChat.familyPractitioner.last_name
                : currentChat.patient.first_name +
                  ' ' +
                  currentChat.patient.last_name
            }
          />
        </div>

        <div className="flex m-4 items-center">
          <Telephone />
          <Typography
            type="Ag-13-medium"
            tagName="p"
            className="px-2"
            children={
              role === 'patient'
                ? currentChat.familyPractitioner.phone
                : currentChat.patient.phone
            }
          />
        </div>

        <div className="flex m-4 items-center">
          {role === 'practitioner' && <Address />}
          {role === 'practitioner' && (
            <Typography
              type="Ag-13-medium"
              tagName="p"
              className="px-2"
              children={currentChat?.patient.address}
            />
          )}
        </div>
      </div>
      <div className="border-b">
        <Typography
          type="Ag-15-medium"
          tagName="p"
          className="m-3.5 "
          children="Shared Photos"
        />
        <div>
          <Typography
            type="Ag-13-medium"
            tagName="p"
            className="m-4"
            children="No photos yet..."
          />
        </div>
      </div>
      <div className="">
        <Typography
          type="Ag-15-medium"
          tagName="p"
          className="m-3.5 "
          children="Shared Files"
        />
        <div>
          <Typography
            type="Ag-13-medium"
            tagName="p"
            className="m-4 "
            children="No files yet"
          />
        </div>
      </div>
    </div>
  );
};
