import { Route, Routes } from 'react-router-dom';

import { AppRoute } from '../src/common/enums/app/app-route.enum';

import ActivationLinkSentPage from './pages/ActivationLinkSentPage';
import SignUpAsPage from './pages/SignUpAsPage';
import SignInPage from './pages/SignInPage';
import PatientQuestionaryPage from './pages/PatientQuestionary.page';
import PatientQuestionaryVerificationPage from './pages/PatentQuestionaryVerification.page';
import PatientQuestionaryBmiPage from './pages/PatientQuestionaryBmi.page';
import PatientQuestionaryMedicalInfoPage from './pages/PatientQuestionaryMedicalInfo.page';
import PatientQuestionaryRelatedPersonInfoPage from './pages/PatientQuestionaryRelatedPersons.page';
import ForgotPasswordPage from 'pages/ForgotPasswordPage';
import CheckEmailPage from 'pages/CheckEmailPage';
import { CreateNewPasswordPage } from 'pages/CreateNewPasswordPage';
import { PractitionerPortal } from 'pages/PractitionerPortal';
import { PatientPortal } from 'pages/PatientPortal';
import { PatientsSignUpPage, PractitionersSignUpPage } from 'pages/SignUpPage';
import { PractitionerInfoPage } from 'pages/PractitionerInfoPage';
import { PractitionerVerificationPage } from 'pages/PractitionerVerificationPage';
import { PractitionerEducationPage } from 'pages/PractitionerEducationPage';
import { PractitionerWorkExperience } from 'pages/PractitionerWorkExperiencePage';
import { AdminDashboard } from 'pages/Admin/AdminDashboard';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={AppRoute.SIGN_UP_AS} element={<SignUpAsPage />} />
        <Route
          path={AppRoute.SIGN_UP_PATIENT}
          element={<PatientsSignUpPage />}
        />
        <Route
          path={AppRoute.SIGN_UP_PRACTITIONER}
          element={<PractitionersSignUpPage />}
        />
        <Route path={AppRoute.SIGN_IN} element={<SignInPage />} />
        <Route
          path={AppRoute.ACTIVATION_LINK_SENT}
          element={<ActivationLinkSentPage />}
        />
        <Route
          path={AppRoute.PATIENT_QUESTIONARY_INFO}
          element={<PatientQuestionaryPage />}
        />
        <Route
          path={AppRoute.PATIENT_QUESTIONARY_VERIFICATION}
          element={<PatientQuestionaryVerificationPage />}
        />
        <Route
          path={AppRoute.PATIENT_QUESTIONARY_BMI}
          element={<PatientQuestionaryBmiPage />}
        />
        <Route
          path={AppRoute.PATIENT_QUESTIONARY_MEDICAL_INFO}
          element={<PatientQuestionaryMedicalInfoPage />}
        />
        <Route
          path={AppRoute.PATIENT_QUESTIONARY_CONTACT_PERSON_INFO}
          element={<PatientQuestionaryRelatedPersonInfoPage />}
        />
        <Route
          path={AppRoute.PRACTITIONER_QUESTIONNAIRE_INFO}
          element={<PractitionerInfoPage />}
        />
        <Route
          path={AppRoute.PRACTITIONER_QUESTIONNAIRE_VERIFICATION}
          element={<PractitionerVerificationPage />}
        />
        <Route
          path={AppRoute.PRACTITIONER_QUESTIONNAIRE_EDUCATION}
          element={<PractitionerEducationPage />}
        />
        <Route
          path={AppRoute.PRACTITIONER_QUESTIONNAIRE_WORK_EXPERIENCE}
          element={<PractitionerWorkExperience />}
        />
        <Route
          path={AppRoute.CREATE_NEW_PASSWORD}
          element={<CreateNewPasswordPage />}
        />
        <Route
          path={AppRoute.FORGOT_PASSWORD}
          element={<ForgotPasswordPage />}
        />
        <Route
          path={`${AppRoute.PRACTITIONER_PORTAL}/*`}
          element={<PractitionerPortal />}
        />
        <Route
          path={`${AppRoute.PATIENT_PORTAL}/*`}
          element={<PatientPortal />}
        />
        <Route path={AppRoute.CHECK_EMAIL} element={<CheckEmailPage />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
