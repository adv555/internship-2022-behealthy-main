import {
  Create,
  Datagrid,
  DateField,
  DateInput,
  DeleteButton,
  Edit,
  EditButton,
  List,
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

export const PractitionersList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="first_name" />
      <TextField source="last_name" />
      <TextField source="gender" />
      <TextField source="phone" />
      <DateField source="birthdate" locales="uk-UK" />
      <TextField source="user_id" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

const PractitionerTitle = () => {
  const record = useRecordContext();
  return (
    <span>
      Practitioner: {record ? `${record.first_name} ${record.last_name}` : ''}
    </span>
  );
};

export const PractitionerEdit = () => (
  <Edit title={<PractitionerTitle />}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="first_name" />
      <TextInput source="last_name" />
      <SelectInput source="gender" choices={genders} />
      <TextInput source="phone" />
      <DateInput source="birthdate" />
    </SimpleForm>
  </Edit>
);

export const PractitionerCreate = () => (
  <Create title="Create a Practitioner">
    <SimpleForm>
      <TextInput source="first_name" />
      <TextInput source="last_name" />
      <SelectInput source="gender" choices={genders} />
      <TextInput source="phone" />
      <DateInput source="birthdate" />
      <NumberInput source="user_id" />
    </SimpleForm>
  </Create>
);
