import {
  PatientContactPeople,
  PatientContactPerson,
} from 'common/types/PatientContactPeople';
import { AddFormButton } from 'components/common/AddFormButton/AddFormButton';
import { Button } from 'components/common/Button/Button';
import { PhoneInput } from 'components/common/Input/PhoneInput';
import { TextInput } from 'components/common/Input/TextInput';
import { RemoveFormButton } from 'components/common/RemoveFormButton/RemoveFormButton';
import { SelectField } from 'components/common/Select/SelectField';
import { Typography } from 'components/common/Typography';
import { Formik, Form, Field, FormikProps, FieldArray } from 'formik';
import { useDispatch } from 'react-redux';
import { PatientContactPeopleActionCreator } from 'store/patient/contact_people/PatientContactPeople.reducer';
import { ContactPersonSchema } from './PatientContactPeopleSchema';
import { selectOptionRelationType } from './select-options';

export type PatientContactPeopleFormFields = Omit<
  PatientContactPeople,
  'patient_id'
>;

export type PatientContactPeopleFormProps = {
  initialValues: PatientContactPeopleFormFields;
  onSubmit: (data: PatientContactPeopleFormFields) => void;
  isSaved: boolean;
  error: string | null;
};

export const PatientContactPeopleForm = ({
  initialValues,
  onSubmit,
  isSaved = false,
  error = null,
}: PatientContactPeopleFormProps) => {
  const pushDataTemplate = {
    first_name: '',
    last_name: '',
    phone: '',
    relation_type: '',
  };

  const dispatch = useDispatch();

  const removeContact = (id: number) => {
    id && dispatch(PatientContactPeopleActionCreator.delete(id));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ContactPersonSchema}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      {(props: FormikProps<PatientContactPeopleFormFields>) => {
        const {
          values,
          errors,
          isValid,
          dirty,
          handleChange,
          handleBlur,
          setFieldValue,
        } = props;

        return (
          <Form className="flex flex-col gap-6">
            <FieldArray
              name="contacts"
              render={({ push, remove }) => (
                <>
                  {values.contacts.map(
                    (contactPerson: PatientContactPerson, index: number) => {
                      return (
                        <ContactPerson
                          key={index}
                          index={index}
                          values={contactPerson}
                          errors={
                            errors?.contacts ? errors?.contacts[index] : {}
                          }
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          setFieldValue={setFieldValue}
                          removeForm={() => {
                            remove(index);
                            removeContact(contactPerson.id);
                          }}
                        />
                      );
                    },
                  )}
                  <AddFormButton
                    onClick={() => push(pushDataTemplate)}
                    label="Add contact"
                    className="mb-10"
                  />
                </>
              )}
            />

            <Button
              className="min-w-full"
              type="submit"
              label="Save"
              disabled={!(isValid && dirty)}
            />

            {error && (
              <Typography type="Ag-13-medium" className="text-error mt-2">
                Server error: {error}
              </Typography>
            )}
            {isSaved && (
              <Typography type="Ag-13-medium" className="text-green mt-2">
                Information successfuly updated
              </Typography>
            )}
          </Form>
        );
      }}
    </Formik>
  );
};

type ContactPersonProps = {
  index: number;
  values: PatientContactPerson;
  errors: any;
  handleChange: any;
  setFieldValue: any;
  handleBlur: any;
  removeForm: any;
};

const ContactPerson = (props: ContactPersonProps) => {
  const {
    index,
    values,
    errors,
    handleChange,
    setFieldValue,
    handleBlur,
    removeForm,
  } = props;

  return (
    <>
      {index > 0 ? <hr className="mt-3" /> : ''}

      <RemoveFormButton
        onClick={removeForm}
        label="Remove contact"
        className="ml-auto mb-2"
      />

      <Field
        id={`contacts.${index}.first_name`}
        name={`contacts.${index}.first_name`}
        key={`contacts.${index}.first_name`}
        label={'First name'}
        placeholder="Anna"
        value={values.first_name}
        error={errors?.first_name}
        onChange={handleChange}
        onBlur={handleBlur}
        component={TextInput}
      />

      <Field
        id={`contacts.${index}.last_name`}
        name={`contacts.${index}.last_name`}
        key={`contacts.${index}.last_name`}
        label={'Last name'}
        placeholder="Johnson"
        value={values.last_name}
        error={errors?.last_name}
        onChange={handleChange}
        onBlur={handleBlur}
        component={TextInput}
      />

      <Field
        id={`contacts.${index}.phone`}
        name={`contacts.${index}.phone`}
        key={`contacts.${index}.phone`}
        label={'Phone number'}
        placeholder="+380 12 345 67 89"
        value={values.phone}
        error={errors?.phone}
        setFieldValue={setFieldValue}
        onBlur={handleBlur}
        component={PhoneInput}
      />

      <SelectField
        name={`contacts.${index}.relation_type`}
        options={selectOptionRelationType}
        label={'Relation type'}
        placeholder={'Choose relation type'}
      />
    </>
  );
};
