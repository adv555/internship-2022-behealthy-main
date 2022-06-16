import {
  Create,
  Datagrid,
  DateField,
  DateInput,
  DeleteButton,
  Edit,
  EditButton,
  ImageField,
  List,
  NumberField,
  NumberInput,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput,
  useRecordContext,
} from 'react-admin';

const genders = [
  { id: 'Male', name: 'Male' },
  { id: 'Female', name: 'Female' },
  { id: 'Other', name: 'Other' },
];

export const PatientsList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="first_name" />
      <TextField source="last_name" />
      <TextField source="gender" />
      <TextField source="address" />
      <TextField source="phone" />
      <DateField source="birthdate" locales="uk-UK" />
      <NumberField source="user_id" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

const PatientTitle = () => {
  const record = useRecordContext();
  return <span>Patient {record ? `"${record.first_name}"` : ''}</span>;
};

export const PatientEdit = () => (
  <Edit title={<PatientTitle />}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="first_name" />
      <TextInput source="last_name" />
      <SelectInput source="gender" choices={genders} />
      <TextInput source="address" />
      <TextInput source="phone" />
      <DateInput source="birthdate" />
      <NumberInput source="user_id" />
    </SimpleForm>
  </Edit>
);

export const PatientCreate = () => (
  <Create title="Create a Patient">
    <SimpleForm>
      <TextInput source="first_name" />
      <TextInput source="last_name" />
      <SelectInput source="gender" choices={genders} />
      <TextInput source="address" />
      <TextInput source="phone" />
      <DateInput source="birthdate" />
      <NumberInput source="user_id" />
    </SimpleForm>
  </Create>
);
