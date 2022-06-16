import { Story } from '@storybook/react';
import { Formik, Field, Form, FormikProps } from 'formik';
import { PoorMultiSelect, PoorMultiSelectProps } from './PoorMultiSelect';
import { Button } from '../Button/Button';
import './MultiSelect.css';
import './PoorMultiSelect.css';
import * as yup from 'yup';

export default {
  component: PoorMultiSelect,
  title: 'Forms/MultiSelect',
};

const OperationsMultiSelect = (props: PoorMultiSelectProps) =>
  PoorMultiSelect({
    ...props,
    name: 'operations',
    label: 'Operations',
  });

type Values = {
  operations: string[];
};

type FormWithMultiSelectProps = {};

const FormWithMultiSelect = ({}: FormWithMultiSelectProps) => {
  const onSubmit = (values: Values) => {
    console.log('values', values);
  };

  const validationSchema = yup.object().shape({
    operations: yup.array().of(yup.string().min(3).max(10)),
  });

  return (
    <Formik
      initialValues={{ operations: [] }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, setFieldValue }: FormikProps<Values>) => (
        <Form>
          <Field
            id="operations"
            name="operations"
            component={OperationsMultiSelect}
            value={values.operations}
            setFieldValue={setFieldValue}
            errors={errors.operations}
          />
          <Button className="mt-3" type="submit" label="Submit"></Button>
        </Form>
      )}
    </Formik>
  );
};

const Template: Story<FormWithMultiSelectProps> = (
  args: FormWithMultiSelectProps,
) => <FormWithMultiSelect {...args} />;

export const Poor = Template.bind({});
