import { Menu } from 'components/common/Menu/Menu';

import { ReactComponent as PractitionerIcon } from '../assets/icons/menu/profile.svg';
import { ReactComponent as HealthHistoryIcon } from '../assets/icons/menu/patient_visits.svg';
import { ReactComponent as ProfileIcon } from '../assets/icons/menu/patient.svg';
import { ReactComponent as VaccinesIcon } from '../assets/icons/menu/vaccines.svg';
import { ReactComponent as Chats } from '../assets/icons/menu/chat.svg';

import { PortalHeader } from 'components/common/PortalHeader/PortalHeader';

import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { PatientPortalProfile } from './PractitionerPortal/PractitionerPortalProfile';
import { AppRoute } from 'common/enums/app/app-route.enum';
import {
  PatientPortalChats,
  PatientPortalHealthHistory,
  PatientPortalPractitionerProfile,
  PatientPortalMyPractitioner,
  PatientPortalPractitioners,
  PatientPortalVaccines,
  PatientPortalMyPractitionerAppointment,
} from './PatientPortal/PatientPortalDashboard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'common/types/app/root-state.type';
import { useEffect } from 'react';
import { PatientActionCreators } from 'store/patient/creatPatient.reducer';
import { UserActionCreator } from 'store/user/getUser.reducer';
import { LoginActionCreator } from 'store/login/login.reducer';
import { persistor } from 'store/store';

import { PatientInfoActionCreator } from 'store/patient/info/PatientInfo.reducer';
import { getPatientData } from 'store/patient/selectors';
import { IDeclaration } from 'common/types/app/Declaration.type';

export const PatientPortal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state: RootState) => state.user);
  const { data: user } = useSelector((state: RootState) => state.user);
  const patient = useSelector(getPatientData);

  useEffect(() => {
    user && dispatch(PatientInfoActionCreator.load(user.id));
  }, [dispatch, user]);

  const { isLoggedIn, userEmail } = useSelector(
    (state: RootState) => state.login,
  );

  const googleParams = useLocation().search;

  useEffect(() => {
    isLoggedIn &&
      data &&
      dispatch(PatientActionCreators.getPatientData(data?.id));
  }, [isLoggedIn, data, dispatch]);

  useEffect(() => {
    googleParams && dispatch(LoginActionCreator.googleLogin());
    userEmail &&
      dispatch(
        UserActionCreator.getUserData({
          email: userEmail,
        }),
      );
  }, [dispatch, googleParams, userEmail]);

  useEffect(() => {
    if ((!isLoggedIn && !googleParams) || !data?.isActivated) {
      dispatch(LoginActionCreator.logout());
      persistor.flush();
      navigate(AppRoute.SIGN_IN, { replace: true });
    }
    if (patient && patient.declarations && patient.declarations.length > 0) {
      const myPractitionerId = patient?.declarations?.find(
        (declaration: IDeclaration) => declaration.status === 'ACTIVE',
      )?.family_practitioner_id;

      myPractitionerId && navigate(AppRoute.PATIENT_PORTAL_MY_PRACTITIONER);
    }
  }, [isLoggedIn]);

  const menuStructure = [
    {
      title: 'Family practitioners',
      link: AppRoute.PATIENT_PORTAL_PRACTITIONERS,
      icon: <PractitionerIcon />,
    },
    {
      title: 'Health history',
      link: AppRoute.PATIENT_PORTAL_HEALTH_HISTORY,
      icon: <HealthHistoryIcon />,
    },
    {
      title: 'Profile',
      link: AppRoute.PATIENT_PORTAL_PROFILE,
      icon: <ProfileIcon />,
    },
    {
      title: 'Vaccines',
      link: AppRoute.PATIENT_PORTAL_VACCINES,
      icon: <VaccinesIcon />,
    },
    {
      title: 'Chats',
      link: AppRoute.PATIENT_PORTAL_CHAT,
      icon: <Chats />,
    },
  ];

  return (
    <div className="flex">
      <Menu
        logoLink={AppRoute.PATIENT_PORTAL} 
        structure={menuStructure} 
      />
      <div className="w-full">
        <PortalHeader profileLink={AppRoute.PATIENT_PORTAL_PROFILE} />
        <Routes>
          <Route path="/" element={<PatientPortalPractitioners />} />
          <Route
            path="/my-practitioners"
            element={<PatientPortalPractitioners />}
          />
          <Route
            path="/my-practitioners/profile"
            element={<PatientPortalPractitionerProfile />}
          />
          <Route
            path="/my-practitioner/make-appointment"
            element={<PatientPortalMyPractitionerAppointment />}
          />
          <Route
            path="/my-practitioner"
            element={<PatientPortalMyPractitioner />}
          />

          <Route
            path="/health-history"
            element={<PatientPortalHealthHistory />}
          />

          <Route path="/profile/*" element={<PatientPortalProfile />} />
          <Route path="/vaccines" element={<PatientPortalVaccines />} />
          <Route path="/chat" element={<PatientPortalChats />} />
        </Routes>
      </div>
    </div>
  );
};
