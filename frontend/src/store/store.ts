import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import { ReducerName } from '../common/enums/app/reducer-name.enum';
import { rootWatcher } from './saga/index';
import {
  bmiInfoReducer,
  contactReducer,
  counterReducer,
  educationReducer,
  experienceReducer,
  loginReducer,
  signUpReducer,
  medicalInfoReducer,
  patientReducer,
  documentReducer,
  practitionerReducer,
  userReducer,
  notificationSettingsReducer,
  patientInfoReducer,
  patientBmiReducer,
  patientMedInfoReducer,
  patientContactPeopleReducer,
  patientNotificationsReducer,
  declarationReducer,
  practitionerRegistrationReducer,
  declarationFilterReducer,
  myPractitionerReducer,
  loadDocumentsReducer,
  appointmentsReducer,
  chatReducer,
} from './slice/index';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  whitelist: [
    ReducerName.USER,
    ReducerName.LOGIN,
    ReducerName.MY_PRACTITIONER,
    ReducerName.EDUCATION,
    ReducerName.WORK_EXPERIENCE,
    ReducerName.APPOINTMENTS,
    ReducerName.PATIENT,
  ],
  storage,
};

const rootReducer = combineReducers({
  [ReducerName.COUNTER]: counterReducer,
  [ReducerName.PATIENT]: patientReducer,
  [ReducerName.CONTACT]: contactReducer,
  [ReducerName.MEDICAL_INFO]: medicalInfoReducer,
  [ReducerName.BMI_INFO]: bmiInfoReducer,
  [ReducerName.DOCUMENT_UPLOAD]: documentReducer,
  [ReducerName.USER]: userReducer,
  [ReducerName.PRACTITIONER]: practitionerReducer,
  [ReducerName.LOGIN]: loginReducer,
  [ReducerName.SIGN_UP]: signUpReducer,
  [ReducerName.EDUCATION]: educationReducer,
  [ReducerName.WORK_EXPERIENCE]: experienceReducer,
  [ReducerName.NOTIFICATION_SETTINGS]: notificationSettingsReducer,
  [ReducerName.PRACTITIONER_REGISTRATION]: practitionerRegistrationReducer,
  [ReducerName.MY_PRACTITIONER]: myPractitionerReducer,
  [ReducerName.PATIENT_INFO]: patientInfoReducer,
  [ReducerName.PATIENT_BMI]: patientBmiReducer,
  [ReducerName.PATIENT_MED_INFO]: patientMedInfoReducer,
  [ReducerName.PATIENT_CONTACT_PEOPLE]: patientContactPeopleReducer,
  [ReducerName.PATIENT_NOTIFICATIONS]: patientNotificationsReducer,
  [ReducerName.DECLARATION]: declarationReducer,
  [ReducerName.DECLARATION_FILTERS]: declarationFilterReducer,
  [ReducerName.LOAD_DOCUMENTS]: loadDocumentsReducer,

  [ReducerName.APPOINTMENTS]: appointmentsReducer,

  [ReducerName.CHAT]: chatReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const store = configureStore({
  reducer: persistedReducer,
  middleware: [...middleware],
});

const persistor = persistStore(store);

sagaMiddleware.run(rootWatcher);

export { store, persistor };
