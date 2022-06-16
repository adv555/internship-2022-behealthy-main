import { Admin, Resource } from 'react-admin';
import restProvider from 'ra-data-simple-rest';
import { UserCreate, UserEdit, UsersList } from './AdminUsers';
import authProvider from './authProvider';
import { AdminLoginPage } from './AdminLoginPage';
import { PatientCreate, PatientEdit, PatientsList } from './AdminPatient';
import {
  PractitionerCreate,
  PractitionerEdit,
  PractitionersList,
} from './AdminPractitioner';
import {
  DeclarationCreate,
  DeclarationEdit,
  DeclarationsList,
} from './AdminDeclarations';

export const AdminDashboard = () => {
  return (
    <Admin
      basename="/admin"
      loginPage={AdminLoginPage}
      authProvider={authProvider}
      dataProvider={restProvider('http://localhost:3002/api/v1')}
    >
      <Resource
        name="users"
        list={UsersList}
        edit={UserEdit}
        create={UserCreate}
      />
      <Resource
        name="patient"
        list={PatientsList}
        edit={PatientEdit}
        create={PatientCreate}
      />
      <Resource
        name="family_practitioner"
        list={PractitionersList}
        edit={PractitionerEdit}
        create={PractitionerCreate}
      />
      <Resource
        name="declarations"
        list={DeclarationsList}
        edit={DeclarationEdit}
        create={DeclarationCreate}
      />
    </Admin>
  );
};
