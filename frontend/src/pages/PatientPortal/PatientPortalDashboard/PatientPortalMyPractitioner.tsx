import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from 'components/PatientPortal/Layout/Layout';
import { Typography } from 'components/common/Typography';
import { PractitionerProfile } from 'components/PatientPortal/MyFamilyPractitioners/PractitionerProfile';
import { Contacts } from 'components/PatientPortal/MyFamilyPractitioners/Contacts/Contacts';
import { Button } from 'components/common/Button/Button';
import { Avatar } from 'components/PatientPortal/MyFamilyPractitioners/Avatar';
import {
  getAvatar,
  getClinicContacts,
  getPatientData,
  getPatientDeclarations,
  getPractitionerFullYearExperience,
  getPractitionerProfile,
} from 'store/patient/selectors';
import { data } from 'components/PatientPortal/MyFamilyPractitioners/mock-data/profile-data';
import { AppRoute } from 'common/enums/app/app-route.enum';
import { DeclarationActionCreator } from 'store/declaration/declaration.reducer';
import { IDeclaration } from 'common/types/app/Declaration.type';
import { PractitionersButton } from 'components/common/PractitionersButton';
import { ScheduleButton } from 'components/common/ScheduleButton';
import { IconButton } from 'components/common/IconButton';
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';
import { ReactComponent as PaperClipIcon } from 'assets/icons/paperclip.svg';
import { ChatMessagesList } from 'components/Chat/ChatMessagesList';
import { ChatActionCreator } from 'store/chat/chat.reducer';
import { AppointmentsActionCreator } from 'store/appointments/appointments.reducer';

export const PatientPortalMyPractitioner: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const patient = useSelector(getPatientData);
  const declarations = useSelector(getPatientDeclarations);
  // console.log(patient, declarations);

  const { first_name, last_name, gender, education, experience, phone, id } =
    useSelector(getPractitionerProfile);

  const avatar = useSelector(getAvatar);
  const fullYearsExperience = useSelector(getPractitionerFullYearExperience);
  const clinicContacts = useSelector(getClinicContacts);
  const activeDeclaration = declarations?.find(
    (declaration) => declaration.status === 'REQUESTED',
  );

  const updateDeclaration = (status: string) => {
    const newDeclaration: IDeclaration = {
      id: activeDeclaration?.id,
      patient_id: patient?.id,
      family_practitioner_id: id,
      status,
    };
    dispatch(DeclarationActionCreator.updateDeclaration(newDeclaration));
    navigate(AppRoute.PATIENT_PORTAL_PRACTITIONERS_PROFILE, { replace: true });
  };
  useEffect(() => {
    if (!patient) {
      return;
    }

    if (patient.id !== null) {
      dispatch(ChatActionCreator.openChat(patient.id as number, id));
    }
    if (id !== null) {
      dispatch(AppointmentsActionCreator.getPractitionerAppointmentsList(id));
    }
  }, [dispatch, id, patient.id]);
  return (
    <div>
      <div className="flex align-middle justify-between items-center py-4 pl-9 pr-10 border-b-[1px] shadow-dashboard">
        <Typography type={'h4'} children={'Family practitioner'} />
        <div className="flex flex-row">
          <PractitionersButton
            onClick={() =>
              navigate(AppRoute.PATIENT_PORTAL_PRACTITIONERS, { replace: true })
            }
          />
          <ScheduleButton
            onClick={() =>
              navigate(AppRoute.PATIENT_PORTAL_SCHEDULE_APPOINTMENT, {
                replace: true,
              })
            }
          />
          <Button
            nameBtn="accept"
            label="Schedule an Appointment"
            className="w-[100%] desktop:w-[300px]"
            onClick={() =>
              navigate(AppRoute.PATIENT_PORTAL_SCHEDULE_APPOINTMENT, {
                replace: true,
              })
            }
          />
        </div>
      </div>
      <div className="flex flex-row">
        <Layout>
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
                        } - ${
                          date_to?.split('-')[0] || new Date().getFullYear()
                        })`}
                      </li>
                    ),
                  )}
                  scheduleDays={data.scheduleDays}
                  scheduleHours={data.scheduleHours}
                  scheduleLunch={data.scheduleLunch}
                />
                <div className=" flex flex-row mt-4">
                  <Contacts
                    clinicPhone={data.clinicPhone}
                    clinicAddress={clinicContacts?.clinicAddress || 'N/A'}
                  />
                </div>
                <Button
                  nameBtn="decline"
                  label="Cancel the declaration request"
                  className="mt-8 w-[100%] desktop:w-[300px] mb-14"
                  onClick={() => updateDeclaration('REJECTED')}
                />
              </div>
            </div>
          </div>
        </Layout>
        <div className="hidden md:block w-1/3 min-w-[296px] py-5 border-l shadow-dashboard">
          <div className=" pl-5 mb-4">
            <Typography
              type={'h4'}
              children={'Messages'}
              className="mb-[10px]"
            />
          </div>
          <div className="flex flex-row flex-nowrap justify-between py-[7px] pr-9 pl-10 mt-4 border-b shadow-dashboard">
            <div className="flex flex-row">
              <Avatar
                avatar={avatar || 'https://via.placeholder.com/150'}
                name={`Dr. ${first_name} ${last_name}`}
                className=" w-10 h-10 "
              />
              <div className="flex flex-col pl-2">
                <Typography
                  type={'Ag-13-medium'}
                  children={`Dr. ${first_name} ${last_name}`}
                  className=" whitespace-nowrap"
                />
                <Typography
                  type={'Ag-13-responsive'}
                  children={phone}
                  className=" whitespace-nowrap"
                />
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <IconButton icon={<PaperClipIcon />} />
              <IconButton icon={<SearchIcon />} />
            </div>
          </div>
          <div className="w-full h-full">
            <ChatMessagesList role={'patient'} context="detailsPage" />
          </div>
        </div>
      </div>
    </div>
  );
};
