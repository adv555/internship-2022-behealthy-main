import { all, fork } from 'redux-saga/effects';
import { submitBmiInfoDataWatcher } from 'store/bmi_info/createBmiInfo.saga';
import { submitContactDataWatcher } from 'store/contact/createPatentContact.saga';
import { submitDocumentInfoDataWatcher } from 'store/document_upload/createDocument.saga';
import { EducationWatcher } from 'store/education/education.saga';
import { ExperienceWatcher } from 'store/experience/experience.saga';
import { LoginWatcher } from 'store/login/login.saga';
import { SignUpWatcher } from 'store/sign_up/SignUp.saga';
import { loadDocumentsWatcher } from 'store/document_upload/loadDocuments.saga';
import { submitMedicalInfoDataWatcher } from 'store/medical_info/createMedicalInfo.saga';
import { LoadSettingsWatcher } from 'store/notifications/notifications.saga';
import { submitPatientDataWatcher } from 'store/patient/createPatent.saga';
import { getUserWatcher } from 'store/user/getUser.saga';
import { counterWatcher } from '../counter/counterSaga';
import { PatientInfoWatcher } from 'store/patient/info/PatientInfo.saga';
import { PatientBmiWatcher } from 'store/patient/bmi/PatientBmi.saga';
import { PatientMedInfoWatcher } from 'store/patient/med_info/PatientMedInfo.saga';
import { PatientContactPeopleWatcher } from 'store/patient/contact_people/PatientContactPeople.saga';
import { PatientNotificationsWatcher } from 'store/patient/notifications/PatientNotifications.saga';
import { declarationWatcher } from 'store/declaration/declaration.saga';
import { practitionerWatcher } from 'store/practitioner/practitioner.saga';
import { practitionerRegistrationWatcher } from 'store/practitioner/practitionerRegistration.saga';
import { chatWatcher } from 'store/chat/chat.saga';
import { submitPractitionersDataWatcher } from 'store/patient/myPractitioner.saga';
import { appointmentsDataWatcher } from 'store/appointments/appointments.saga';

export function* rootWatcher() {
  yield all([
    fork(counterWatcher),
    fork(submitPatientDataWatcher),
    fork(submitContactDataWatcher),
    fork(submitMedicalInfoDataWatcher),
    fork(submitBmiInfoDataWatcher),
    fork(submitDocumentInfoDataWatcher),
    fork(LoginWatcher),
    fork(SignUpWatcher),
    fork(getUserWatcher),
    fork(practitionerWatcher),
    fork(EducationWatcher),
    fork(ExperienceWatcher),
    fork(LoadSettingsWatcher),

    fork(PatientInfoWatcher),
    fork(PatientBmiWatcher),
    fork(PatientMedInfoWatcher),
    fork(PatientContactPeopleWatcher),
    fork(PatientNotificationsWatcher),

    fork(declarationWatcher),
    fork(practitionerRegistrationWatcher),
    fork(chatWatcher),
    fork(submitPractitionersDataWatcher),
    fork(loadDocumentsWatcher),
    fork(appointmentsDataWatcher),
  ]);
}
