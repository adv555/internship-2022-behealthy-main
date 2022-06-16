import { Story } from '@storybook/react';
import { Formik, FormikProps, Form, Field } from 'formik';
import { BirthDateField } from './BirthDateField';
import * as yup from 'yup';

interface IProps {
  fullDate?: string;
  className?: string;
}

const BirthDateFormik: React.FC<IProps> = ({ fullDate, className }) => {
  const validationSchema = yup.object().shape({
    date: yup
      .string()
      .typeError('Invalid date')
      .required('Required field')
      .test('test-date', 'Invalid Date', function (value: any) {
        const reDate = value.toString().split('-');
        const date = new Date(value);
        const days = date.getDate();
        const months = date.getMonth() + 1;
        const years = date.getFullYear();

        if (
          !(
            reDate[0] === years.toString() &&
            reDate[1] === months.toString() &&
            reDate[2] === days.toString()
          )
        )
          return false;
        if (new Date().getFullYear() - years > 123) return false;

        return true;
      }),
  });

  return (
    <>
      <Formik
        initialValues={{
          date: fullDate,
        }}
        validateOnBlur={false}
        onSubmit={(values) => alert(values.date)}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          setFieldValue,
        }: FormikProps<any>) => (
          <Form>
            <Field
              fullDate={values.date}
              error={touched.date && errors.date}
              className={className}
              returnDate={(date: string) => {
                setFieldValue('date', date);
              }}
              onBlur={handleBlur}
              component={BirthDateField}
            />
            <button type="submit" />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default {
  component: BirthDateFormik,
  title: 'Forms/Birtdate',
};

const Template: Story<IProps> = (args) => <BirthDateFormik {...args} />;

export const Default = Template.bind({});

export const FullDate = Template.bind({});
FullDate.args = {
  fullDate: '11-11-2011',
};

export const ClassName = Template.bind({});
ClassName.args = {
  fullDate: '11-11-1980',
  className: 'w-343',
};
