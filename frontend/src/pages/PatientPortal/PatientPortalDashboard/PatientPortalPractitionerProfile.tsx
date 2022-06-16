import React from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from 'components/PatientPortal/Layout/Layout';
import { Typography } from 'components/common/Typography';
import { PractitionerProfile } from 'components/PatientPortal/MyFamilyPractitioners/PractitionerProfile';
import { ReactComponent as PhoneIcon } from 'assets/icons/telephone.svg';
import { ReactComponent as AddressIcon } from 'assets/icons/address.svg';
import { Button } from 'components/common/Button/Button';
import { Avatar } from '../../../components/PatientPortal/MyFamilyPractitioners/Avatar/Avatar';
import GoBackButton from 'components/common/GoBackButton/GoBackButton';
import {
  getAvatar,
  getClinicContacts,
  getPractitionerFullYearExperience,
  getPractitionerId,
  getPractitionerProfile,
} from 'store/patient/selectors';
import { data } from 'components/PatientPortal/MyFamilyPractitioners/mock-data/profile-data';
import { IDeclaration } from 'common/types/app/Declaration.type';
import { DeclarationActionCreator } from 'store/declaration/declaration.reducer';
import { AppRoute } from 'common/enums/app/app-route.enum';
import { RootState } from 'common/types/app/root-state.type';

export const PatientPortalPractitionerProfile: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { first_name, last_name, gender, education, experience } = useSelector(
    getPractitionerProfile,
  );
  const avatar = useSelector(getAvatar);
  const fullYearsExperience = useSelector(getPractitionerFullYearExperience);
  const clinicContacts = useSelector(getClinicContacts);

  const patient_id = useSelector((state: RootState) => state.patient.data?.id);
  const family_practitioner_id = useSelector(getPractitionerId);

  const postRequestForDeclaration = (family_practitioner_id: number) => {
    const declarationData: IDeclaration = {
      family_practitioner_id,
      patient_id,
      status: 'REQUESTED',
    };

    dispatch(DeclarationActionCreator.postDeclaration(declarationData));
    navigate(AppRoute.PATIENT_PORTAL_MY_PRACTITIONER, { replace: true });
  };

  return (
    <Layout>
      <div className="flex align-middle pb-4">
        <GoBackButton
          onClick={() =>
            navigate(AppRoute.PATIENT_PORTAL_PRACTITIONERS, {
              replace: true,
            })
          }
        >
          <Typography type={'h4'} children={'Family practitioners'} />
        </GoBackButton>
      </div>
      <div className="flex min-w-[300px]">
        <div className="flex flex-col sm:flex-row">
          <div className="mr-4 py-3">
            <Avatar
              avatar={avatar || 'https://via.placeholder.com/150'}
              name={`Dr. ${first_name} ${last_name}`}
              className="w-[88px] h-[88px]"
            />
          </div>

          <div className="flex flex-col w-full max-w-[636px] scroll-auto mr-9">
            <PractitionerProfile
              name={`Dr. ${first_name} ${last_name}`}
              experience={`${fullYearsExperience || 'N/A'} years`}
              gender={gender}
              languages={data.languages}
              about={data.about}
              placeOfWork={experience
                .slice()
                .reverse()
                .map(({ id, clinic_name, date_from, date_to }) => (
                  <li key={id} className=" text-Ag-13 font-medium">
                    {`${clinic_name}, (${date_from.split('-')[0]} - ${
                      date_to?.split('-')[0] || new Date().getFullYear()
                    })`}
                  </li>
                ))}
              education={education.map(
                ({ id, university, speciality, date_from, date_to }) => (
                  <li key={id} className=" text-Ag-13 font-medium">
                    {`${university}, ${speciality}, (${
                      date_from.split('-')[0]
                    } - ${date_to?.split('-')[0] || new Date().getFullYear()})`}
                  </li>
                ),
              )}
              scheduleDays={data.scheduleDays}
              scheduleHours={data.scheduleHours}
              scheduleLunch={data.scheduleLunch}
            />
            <Button
              nameBtn="accept"
              label="Request a new declaration"
              className="mt-8 w-[100%] desktop:w-[300px]"
              onClick={() => postRequestForDeclaration(family_practitioner_id)}
            />
          </div>
        </div>
        <div className="hidden md:block w-1/3 min-w-[296px] py-5">
          <div className="flex flex-col gap-1 mb-[10px] w-1/2">
            <Typography
              type={'Ag-16-semibold'}
              children={'Contacts of a doctor'}
              className=" mb-[10px] whitespace-nowrap"
            />

            <Typography
              type={'Ag-13-medium'}
              className="flex flex-row opacity-75"
            >
              {
                'The contacts will be available if you have declaration with this doctor'
              }
            </Typography>
          </div>
          <div className="flex flex-col gap-1">
            <Typography
              type={'Ag-16-semibold'}
              children={'Contacts of clinic'}
              className="mb-[10px]"
            />

            <Typography
              type={'Ag-13-medium'}
              className="flex flex-row opacity-75 whitespace-nowrap "
            >
              <PhoneIcon className="mr-2" />
              {data.clinicPhone}
            </Typography>
            <Typography
              type={'Ag-13-medium'}
              className="flex flex-row items-center opacity-75 "
            >
              <AddressIcon className="mr-2  " />
              {clinicContacts?.clinicAddress || 'N/A'}
            </Typography>
          </div>
        </div>
      </div>
    </Layout>
  );
};
