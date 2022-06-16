import { Menu } from 'components/common/Menu/Menu';
import { ReactComponent as DeclarationIcon } from '../assets/icons/menu/declaration.svg';
import { ReactComponent as MyPatientsIcon } from '../assets/icons/menu/my_patients.svg';
import { ReactComponent as PatientVisitsIcon } from '../assets/icons/menu/patient_visits.svg';
import { ReactComponent as ProfileIcon } from '../assets/icons/menu/profile.svg';
import { ReactComponent as ScheduleIcon } from '../assets/icons/menu/schedule.svg';
import { ReactComponent as Chats } from '../assets/icons/menu/chat.svg';
import { PortalHeader } from 'components/common/PortalHeader/PortalHeader';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { PractitionerPortalDeclarations } from './PractitionerPortal/PractitionerPortalDeclarations';
import { PractitionerPortalPatients } from './PractitionerPortal/PractitionerPortalPatients';
import { PractitionerPortalVisits } from './PractitionerPortal/PractitionerPortalVisits';
import { PractitionerPortalSchedule } from './PractitionerPortal/PractitionerPortalSchedule';
import { PractitionerPortalProfile } from './PractitionerPortal/PractitionerPortalProfile';
import { AppRoute } from 'common/enums/app/app-route.enum';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'common/types/app/root-state.type';
import { PractitionerActionCreator } from 'store/practitioner/practitioner.reducer';
import { useEffect } from 'react';
import { UserActionCreator } from 'store/user/getUser.reducer';
import { LoginActionCreator } from 'store/login/login.reducer';
import { persistor } from 'store/store';
import { PractitionerPortalChat } from './PractitionerPortal/PractitionerPortalChat';
import { PractitionerPortalPatientDetails } from './PractitionerPortal/PractitionerPortalPatientDetail';

export const PractitionerPortal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data } = useSelector((state: RootState) => state.user);
  const { isLoggedIn, userEmail } = useSelector(
    (state: RootState) => state.login,
  );

  const googleParams = useLocation().search;

  const menuStructure = [
    {
      title: 'Declaration requests',
      link: AppRoute.PRACTITIONER_PORTAL_DECLARATIONS,
      icon: <DeclarationIcon />,
    },
    {
      title: 'My patients',
      link: AppRoute.PRACTITIONER_PORTAL_PATIENTS,
      icon: <MyPatientsIcon />,
    },
    {
      title: 'Patient visits',
      link: AppRoute.PRACTITIONER_PORTAL_VISITS,
      icon: <PatientVisitsIcon />,
    },
    {
      title: 'Schedule',
      link: AppRoute.PRACTITIONER_PORTAL_SCHEDULE,
      icon: <ScheduleIcon />,
    },
    {
      title: 'Profile',
      link: AppRoute.PRACTITIONER_PORTAL_PROFILE,
      icon: <ProfileIcon />,
    },
    {
      title: 'Chats',
      link: AppRoute.PRACTITIONER_PORTAL_CHAT,
      icon: <Chats />,
    },
  ];

  useEffect(() => {
    isLoggedIn &&
      data &&
      dispatch(PractitionerActionCreator.getPractitionerData(data?.id));
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
    if ((!isLoggedIn && !googleParams) || !data?.isActivated || !data) {
      dispatch(LoginActionCreator.logout());
      persistor.flush();
      navigate(AppRoute.SIGN_IN, { replace: true });
    }
  }, [isLoggedIn]);

  return (
    <div className="flex">
      <Menu logoLink={AppRoute.PRACTITIONER_PORTAL} structure={menuStructure} />
      <div className="w-full">
        <PortalHeader profileLink={AppRoute.PRACTITIONER_PORTAL_PROFILE} />
        <Routes>
          <Route path="/" element={<PractitionerPortalDeclarations />} />
          <Route
            path="/declaration-requests"
            element={<PractitionerPortalDeclarations />}
          />
          <Route path="/my-patients" element={<PractitionerPortalPatients />} />
          <Route
            path="/patient-visits"
            element={<PractitionerPortalVisits />}
          />
          <Route path="/schedule" element={<PractitionerPortalSchedule />} />
          <Route path="/profile/*" element={<PractitionerPortalProfile />} />
          <Route path="/chat/" element={<PractitionerPortalChat />} />
          <Route
            path="/patient/details"
            element={<PractitionerPortalPatientDetails />}
          />
        </Routes>
      </div>
    </div>
  );
};
