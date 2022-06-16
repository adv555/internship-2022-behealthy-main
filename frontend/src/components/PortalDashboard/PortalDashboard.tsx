import { AppRoute } from 'common/enums/app/app-route.enum';
import { ProfileMenu } from 'components/common/ProfileMenu/ProfileMenu';
import { PatientBMI } from 'pages/PatientPortal/PatientPortalProfile/PatientBMI';
import { PatientContactPeople } from 'pages/PatientPortal/PatientPortalProfile/PatientContactPeople';
import { PatientDelete } from 'pages/PatientPortal/PatientPortalProfile/PatientDelete';
import { PatientDocuments } from 'pages/PatientPortal/PatientPortalProfile/PatientDocuments';
import { PatientMedInfo } from 'pages/PatientPortal/PatientPortalProfile/PatientMedInfo';
import { PatientNotifications } from 'pages/PatientPortal/PatientPortalProfile/PatientNotifications';
import { PatientPassword } from 'pages/PatientPortal/PatientPortalProfile/PatientPassword';
import { PatientPersonalInfo } from 'pages/PatientPortal/PatientPortalProfile/PatientPersonalInfo';
import { PractitionerDelete } from 'pages/PractitionerPortal/PractitionerPortalProfile/PractitionerDelete';
import { PractitionerDocuments } from 'pages/PractitionerPortal/PractitionerPortalProfile/PractitionerDocuments';
import { PractitionerEducation } from 'pages/PractitionerPortal/PractitionerPortalProfile/PractitionerEducation';
import { PractitionerPassword } from 'pages/PractitionerPortal/PractitionerPortalProfile/PractitionerPassword';
import { PractitionerPersonalInfo } from 'pages/PractitionerPortal/PractitionerPortalProfile/PractitionerPersonalInfo';
import { PractitionerNotifications } from 'pages/PractitionerPortal/PractitionerPortalProfile/PractitionersNotifications';
import { PractitionerWorkExperience } from 'pages/PractitionerPortal/PractitionerPortalProfile/PractitionerWorkExperience';
import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

interface PortalDashboardProps {
  role: 'practitioner' | 'patient';
}

export const PortalDashboard: FC<PortalDashboardProps> = ({ role }) => {
  const menu = {
    patient: [
      {
        title: 'Personal information',
        link: AppRoute.PATIENT_PORTAL_PROFILE_INFO,
      },
      {
        title: 'Change password',
        link: AppRoute.PATIENT_PORTAL_PROFILE_PASSWORD,
      },
      {
        title: 'BMI parameters',
        link: AppRoute.PATIENT_PORTAL_PROFILE_BMI,
      },
      {
        title: 'Medical information',
        link: AppRoute.PATIENT_PORTAL_PROFILE_MEDICAL_INFO,
      },
      {
        title: 'Contact people information',
        link: AppRoute.PATIENT_PORTAL_PROFILE_CONTACT_PEOPLE,
      },
      {
        title: 'My documents',
        link: AppRoute.PATIENT_PORTAL_PROFILE_DOCUMENTS,
      },
      {
        title: 'Notifications',
        link: AppRoute.PATIENT_PORTAL_PROFILE_NOTIFICATIONS,
      },
      {
        title: 'Delete my profile',
        link: AppRoute.PATIENT_PORTAL_PROFILE_DELETE,
      },
    ],
    practitioner: [
      {
        title: 'Personal information',
        link: AppRoute.PRACTITIONER_PORTAL_PROFILE_INFO,
      },
      {
        title: 'Change password',
        link: AppRoute.PRACTITIONER_PORTAL_PROFILE_PASSWORD,
      },
      {
        title: 'Education',
        link: AppRoute.PRACTITIONER_PORTAL_PROFILE_EDUCATION,
      },
      {
        title: 'Work experience',
        link: AppRoute.PRACTITIONER_PORTAL_PROFILE_EXPERIENCE,
      },
      {
        title: 'My documents',
        link: AppRoute.PRACTITIONER_PORTAL_PROFILE_DOCUMENTS,
      },
      {
        title: 'Notifications',
        link: AppRoute.PRACTITIONER_PORTAL_PROFILE_NOTIFICATIONS,
      },
      {
        title: 'Delete my profile',
        link: AppRoute.PRACTITIONER_PORTAL_PROFILE_DELETE,
      },
    ],
  };

  const routes = {
    patient: [
      { path: '/', element: <PatientPersonalInfo /> },
      { path: '/personal-information', element: <PatientPersonalInfo /> },
      { path: '/change-password', element: <PatientPassword /> },
      { path: '/bmi', element: <PatientBMI /> },
      { path: '/medical-info', element: <PatientMedInfo /> },
      { path: '/contact-people', element: <PatientContactPeople /> },
      { path: '/documents', element: <PatientDocuments /> },
      { path: '/notifications', element: <PatientNotifications /> },
      { path: '/delete-profile', element: <PatientDelete /> },
    ],
    practitioner: [
      { path: '/', element: <PractitionerPersonalInfo /> },
      { path: '/personal-information', element: <PractitionerPersonalInfo /> },
      { path: '/change-password', element: <PractitionerPassword /> },
      { path: '/education', element: <PractitionerEducation /> },
      { path: '/work-experience', element: <PractitionerWorkExperience /> },
      { path: '/documents', element: <PractitionerDocuments /> },
      { path: '/notifications', element: <PractitionerNotifications /> },
      { path: '/delete-profile', element: <PractitionerDelete /> },
    ],
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <ProfileMenu menuTitle="Profile options" structure={menu[role]} />
      <Routes>
        {routes[role].map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </div>
  );
};
