export {
  reducer as counterReducer,
  CounterActionCreator,
} from '../counter/counterReducer';

export { reducer as patientReducer } from '../patient/creatPatient.reducer';
export { reducer as contactReducer } from '../contact/creatPatientContact.reducer';
export { reducer as medicalInfoReducer } from '../medical_info/createMedicalInfo.reducer';
export { reducer as bmiInfoReducer } from '../bmi_info/createBmiInfo.reducer';
export { reducer as documentReducer } from '../document_upload/createDocument.reducer';
export { reducer as userReducer } from '../user/getUser.reducer';
export { reducer as practitionerReducer } from '../practitioner/practitioner.reducer';
export { reducer as loginReducer } from '../login/login.reducer';
export { reducer as signUpReducer } from '../sign_up/SignUp.reducer';
export { reducer as educationReducer } from '../education/education.reducer';
export { reducer as experienceReducer } from '../experience/experience.reducer';
export { reducer as notificationSettingsReducer } from '../notifications/notifications.reducer';

// PatientPortal
export { reducer as patientInfoReducer } from '../patient/info/PatientInfo.reducer';
export { reducer as patientBmiReducer } from '../patient/bmi/PatientBmi.reducer';
export { reducer as patientMedInfoReducer } from '../patient/med_info/PatientMedInfo.reducer';
export { reducer as patientContactPeopleReducer } from '../patient/contact_people/PatientContactPeople.reducer';
export { reducer as patientNotificationsReducer } from '../patient/notifications/PatientNotifications.reducer';

export { reducer as declarationReducer } from '../declaration/declaration.reducer';
export { reducer as practitionerRegistrationReducer } from '../practitioner/practitionerRegistration.reducer';
export { reducer as myPractitionerReducer } from '../patient/myPractitioner.reducer';
export { reducer as declarationFilterReducer } from '../declaration/declarationFilters.reducer';
export { reducer as loadDocumentsReducer } from '../document_upload/loadDocuments.reducer';

export { reducer as appointmentsReducer } from '../appointments/appointments.reducer';

export { reducer as chatReducer } from '../chat/chat.reducer';
