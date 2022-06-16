import {
  Create,
  Datagrid,
  DateField,
  DeleteButton,
  Edit,
  EditButton,
  ImageField,
  List,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput,
  useRecordContext,
} from 'react-admin';

const roles = [
  { id: 'PRACTITIONER', name: 'PRACTITIONER' },
  { id: 'PATIENT', name: 'PATIENT' },
];

export const UsersList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <ImageField
        source="avatar"
        className="w-10 h-10 rounded-full overflow-hidden"
      />
      <TextField source="email" />
      <TextField source="role" />
      <TextField source="activationLink" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

const UserTitle = () => {
  const record = useRecordContext();
  return <span>User {record ? `"${record.email}"` : ''}</span>;
};

export const UserEdit = () => (
  <Edit title={<UserTitle />}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="email" />
      <SelectInput source="role" choices={roles} />
      <TextInput source="activationLink" />
      <TextInput source="avatar" />
    </SimpleForm>
  </Edit>
);

export const UserCreate = () => (
  <Create title="Create a User">
    <SimpleForm>
      <TextInput source="email" />
      <SelectInput source="role" choices={roles} />
      <TextInput source="password" />
    </SimpleForm>
  </Create>
);
