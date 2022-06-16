import { AppRoute } from 'common/enums/app/app-route.enum';
import {
  IDeclaration,
  IDeclarationSelect,
} from 'common/types/app/Declaration.type';
import { Button } from 'components/common/Button/Button';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { ChatActionCreator } from 'store/chat/chat.reducer';
import { DeclarationActionCreator } from 'store/declaration/declaration.reducer';

interface CardButtonProps {
  declaration: IDeclarationSelect;
}

export const CardButtons = ({ declaration }: CardButtonProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateDeclaration = (status: string) => {
    let newDeclaration: IDeclaration = { ...declaration };
    newDeclaration.status = status;
    dispatch(DeclarationActionCreator.updateDeclaration(newDeclaration));
  };
  const reqestConfig = {
    leftButton: {
      label: 'Decline',
      onClick: () => {
        updateDeclaration('REJECTED');
        navigate(-1);
      },
    },
    rightButtion: {
      label: 'Accept',
      onClick: () => {
        updateDeclaration('ACTIVE');
        dispatch(
          ChatActionCreator.addChat({
            patient_id: declaration.patient.id,
            family_practitioner_id: declaration.family_practitioner_id,
            is_active: true,
          }),
        );
        navigate(-1);
      },
    },
  };
  const activeConfig = {
    leftButton: {
      label: declaration.status === 'ACTIVE' ? 'Terminate' : 'Not active',
      onClick:
        declaration.status === 'ACTIVE'
          ? () => {
              updateDeclaration('INACTIVE');
              dispatch(
                ChatActionCreator.terminateChat(
                  declaration.patient.id,
                  declaration.family_practitioner_id,
                ),
              );
              navigate(-1);
            }
          : () => {},
    },
    rightButtion: {
      label: 'Open chat',
      onClick: () => {
        dispatch(
          ChatActionCreator.openChat(
            declaration.patient.id,
            declaration.family_practitioner_id,
          ),
        );
        navigate(AppRoute.PRACTITIONER_PORTAL_CHAT, {
          replace: true,
        });
      },
    },
  };

  const buttonConfig =
    declaration.status === 'REQUESTED' ? reqestConfig : activeConfig;
  return (
    <div className="flex flex-col sm:flex-row justify-between mt-5">
      <Button
        nameBtn="decline"
        label={buttonConfig.leftButton.label}
        className="w-[100%] mb-4 desktop:w-full sm:mr-2"
        onClick={buttonConfig.leftButton.onClick}
      />
      <Button
        nameBtn="accept"
        label={buttonConfig.rightButtion.label}
        className="w-[100%] desktop:w-full sm:ml-2"
        onClick={buttonConfig.rightButtion.onClick}
      />
    </div>
  );
};
