import {
  Create,
  Datagrid,
  DeleteButton,
  Edit,
  EditButton,
  List,
  SimpleForm,
  TextField,
  TextInput,
  UrlField,
  useRecordContext,
} from 'react-admin';

export const DeclarationsList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="status" />
      <TextField source="patient_id" />
      <TextField source="family_practitioner_id" />
      <UrlField source="pdf" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

const DeclarationTitle = () => {
  const record = useRecordContext();
  return <span>Declaration {record ? `"${record.first_name}"` : ''}</span>;
};

export const DeclarationEdit = () => (
  <Edit title={<DeclarationTitle />}>
    <SimpleForm>
      <TextInput source="status" />
      <TextInput source="patient_id" />
      <TextInput source="family_practitioner_id" />
    </SimpleForm>
  </Edit>
);

export const DeclarationCreate = () => (
  <Create title="Create a Declaration">
    <SimpleForm>
      <TextInput source="status" />
      <TextInput source="patient_id" />
      <TextInput source="family_practitioner_id" />
    </SimpleForm>
  </Create>
);
