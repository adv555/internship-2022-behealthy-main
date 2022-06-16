import { AppRoute } from 'common/enums/app/app-route.enum';
import {
  IDeclaration,
  IDeclarationSelect,
} from 'common/types/app/Declaration.type';
import { RootState } from 'common/types/app/root-state.type';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { ChatActionCreator } from 'store/chat/chat.reducer';
import { DeclarationActionCreator } from 'store/declaration/declaration.reducer';
import { PatientActionCreators } from 'store/patient/creatPatient.reducer';
import { PersonCard } from './PersonCard';

interface DeclarationCardProps {
  avatar: string;
  name: string;
  phone: string;
  adress: string;
  status: string;
  declaration: IDeclarationSelect;
}

export const PatientCard = ({
  avatar,
  name,
  phone,
  adress,
  declaration,
  status,
}: DeclarationCardProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [successUpdate, setSuccessUpdate] = useState<boolean>(false);
  const practitioner = useSelector(
    (state: RootState) => state.practitioner.data,
  );
  useEffect(() => {
    if (successUpdate && practitioner) {
      dispatch(
        DeclarationActionCreator.getDeclarationListByStatus(
          practitioner.id,
          status,
        ),
      );
      setSuccessUpdate(false);
    }
  }, [successUpdate]);

  const updateDeclaration = (status: string) => {
    let newDeclaration: IDeclaration = { ...declaration };
    newDeclaration.status = status;
    dispatch(DeclarationActionCreator.updateDeclaration(newDeclaration));
    setSuccessUpdate(true);
  };

  const openChat = () => {
    dispatch(
      ChatActionCreator.openChat(
        declaration.patient.id,
        declaration.family_practitioner_id,
      ),
    );
    navigate(AppRoute.PRACTITIONER_PORTAL_CHAT, {
      replace: true,
    });
  };

  return (
    <PersonCard
      name={name}
      avatar={avatar}
      phone={phone}
      adress={adress}
      buttonConfig={{
        leftButton: {
          label: status === 'ACTIVE' ? 'Terminate' : 'Not active',
          onClick:
            status === 'ACTIVE'
              ? () => {
                  updateDeclaration('INACTIVE');
                  dispatch(
                    ChatActionCreator.terminateChat(
                      declaration.patient.id,
                      declaration.family_practitioner_id,
                    ),
                  );
                }
              : () => {},
        },
        rightButtion: {
          label: 'Open chat',
          onClick: () => openChat(),
        },
        linkButton: {
          onClick: () => {
            dispatch(
              PatientActionCreators.getPatientByPatientId(
                declaration.patient.id,
              ),
            );
            dispatch(DeclarationActionCreator.setCurrent(declaration));
          },
        },
      }}
    />
  );
};
