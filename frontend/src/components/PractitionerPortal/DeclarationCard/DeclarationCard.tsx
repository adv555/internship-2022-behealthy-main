import {
  IDeclaration,
  IDeclarationSelect,
} from 'common/types/app/Declaration.type';
import { RootState } from 'common/types/app/root-state.type';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChatActionCreator } from 'store/chat/chat.reducer';
import { DeclarationActionCreator } from 'store/declaration/declaration.reducer';
import { PatientActionCreators } from 'store/patient/creatPatient.reducer';
import { PersonCard } from './PersonCard';

interface DeclarationCardProps {
  avatar: string;
  name: string;
  phone: string;
  adress: string;
  declaration: IDeclarationSelect;
  patientId: number;
}

export const DeclarationCard = ({
  avatar,
  name,
  phone,
  adress,
  declaration,
  patientId,
}: DeclarationCardProps) => {
  const dispatch = useDispatch();
  const [successUpdate, setSuccessUpdate] = useState<boolean>(false);
  const practitioner = useSelector(
    (state: RootState) => state.practitioner.data,
  );
  useEffect(() => {
    if (successUpdate && practitioner) {
      dispatch(
        DeclarationActionCreator.getDeclarationListByStatus(
          practitioner.id,
          'REQUESTED',
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

  const acceptDeclaration = (patientId: number, practitionerId: number) => {
    updateDeclaration('ACTIVE');
    dispatch(
      ChatActionCreator.addChat({
        patient_id: patientId,
        family_practitioner_id: practitionerId,
        is_active: true,
      }),
    );
  };

  if (practitioner == null) return <div></div>;

  return (
    <PersonCard
      name={name}
      avatar={avatar}
      phone={phone}
      adress={adress}
      buttonConfig={{
        leftButton: {
          label: 'Decline',
          onClick: () => updateDeclaration('REJECTED'),
        },
        rightButtion: {
          label: 'Accept',
          onClick: () => acceptDeclaration(patientId, practitioner.id),
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
