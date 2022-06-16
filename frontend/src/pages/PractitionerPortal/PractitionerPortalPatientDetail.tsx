import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Layout } from 'components/PatientPortal/Layout/Layout';
import { Typography } from 'components/common/Typography';
import { ReactComponent as PhoneIcon } from 'assets/icons/telephone.svg';
import { ReactComponent as AddressIcon } from 'assets/icons/address.svg';
import { Button } from 'components/common/Button/Button';

import GoBackButton from 'components/common/GoBackButton/GoBackButton';
import { getAvatar } from 'store/patient/selectors';
import { data } from 'components/PatientPortal/MyFamilyPractitioners/mock-data/profile-data';

import { RootState } from 'common/types/app/root-state.type';
import { Avatar } from 'components/PatientPortal/MyFamilyPractitioners/Avatar/Avatar';
import { PatientProfile } from 'components/PractitionerPortal/PatientProfile';
import { CardButtons } from 'components/PractitionerPortal/DeclarationCard/CardButtons';

export const PractitionerPortalPatientDetails: React.FC = () => {
  const navigate = useNavigate();

  const avatar = useSelector(getAvatar);

  const patient = useSelector((state: RootState) => state.patient.current);
  const declaration = useSelector(
    (state: RootState) => state.declaration.current,
  );

  if (patient == null || declaration == null) return <div></div>;

  return (
    <Layout>
      <div className="flex align-middle pb-4">
        <GoBackButton onClick={() => navigate(-1)}>
          <Typography type={'h4'} children={'Go back'} />
        </GoBackButton>
      </div>
      <div className="flex min-w-[300px]">
        <div className="flex flex-col sm:flex-row">
          <div className="mr-4 py-3">
            <Avatar
              avatar={
                patient.user.avatar
                  ? patient.user.avatar
                  : 'https://via.placeholder.com/150'
              }
              name={` ${patient.first_name} ${patient.last_name}`}
              className="w-[88px] h-[88px]"
            />
          </div>

          <div className="flex flex-col w-full max-w-[636px] scroll-auto mr-9">
            <PatientProfile
              name={`${patient.first_name} ${patient.last_name}`}
              age={
                new Date().getFullYear() -
                new Date(patient.birthdate).getFullYear() +
                ' years'
              }
              gender={patient.gender}
              about={data.about}
              bloodType={
                patient.medicalInfo?.blood_type
                  ? patient.medicalInfo.blood_type
                  : ''
              }
              injuries={patient.medicalInfo ? patient.medicalInfo.injuries : ''}
              allergies={
                patient.medicalInfo ? patient.medicalInfo.allergies : ''
              }
              hepatitis={
                patient.medicalInfo?.viral_hepatitis
                  ? patient.medicalInfo.viral_hepatitis
                  : ''
              }
              hiv={patient.medicalInfo?.aids ? patient.medicalInfo.aids : ''}
              asthma={
                patient.medicalInfo?.asthma ? patient.medicalInfo.asthma : ''
              }
              cardio={
                patient.medicalInfo?.cardio ? patient.medicalInfo.cardio : ''
              }
              height={
                patient.bmiInfo ? patient.bmiInfo.height.toString() + ' sm' : ''
              }
              diabetes={
                patient.medicalInfo?.diabetes
                  ? patient.medicalInfo?.diabetes
                  : ''
              }
              weight={
                patient.bmiInfo ? patient.bmiInfo.weight.toString() + ' kg' : ''
              }
              index={
                patient.bmiInfo
                  ? Math.round(
                      patient.bmiInfo.weight /
                        Math.pow(patient.bmiInfo.height / 100, 2),
                    ).toString()
                  : ''
              }
            />
            <CardButtons declaration={declaration} />
          </div>
        </div>
        <div className="hidden md:block w-1/3 min-w-[296px] py-5">
          <div className="flex flex-col gap-1 mb-[10px]">
            <Typography
              type={'Ag-16-semibold'}
              children={'Contacts of the patient'}
              className="mb-[10px]"
            />

            <Typography
              type={'Ag-13-medium'}
              className="flex flex-row opacity-75 whitespace-nowrap "
            >
              <PhoneIcon className="mr-2" />
              {patient.phone}
            </Typography>
            <Typography
              type={'Ag-13-medium'}
              className="flex flex-row items-center opacity-75 "
            >
              <AddressIcon className="mr-2  " />
              {patient.address || 'N/A'}
            </Typography>
          </div>
        </div>
      </div>
    </Layout>
  );
};
