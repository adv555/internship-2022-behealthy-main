import { PatientNotifications } from 'common/types/PatientNotifications';
import { Button } from 'components/common/Button/Button';
import { Checkbox } from 'components/common/Checkbox/Checkbox';
import { Typography } from 'components/common/Typography';
import { Formik, Form, Field, FormikProps } from 'formik';

export type PatientNotificationsFormFields = Omit<
  PatientNotifications,
  'id' | 'patient_id'
>;

export type PatientNotificationsFormProps = {
  initialValues: PatientNotificationsFormFields;
  onSubmit: (data: PatientNotificationsFormFields) => void;
  isSaved: boolean;
  error: string | null;
};

export const PatientNotificationsForm = ({
  initialValues,
  onSubmit,
  isSaved = false,
  error = null,
}: PatientNotificationsFormProps) => (
  <Formik initialValues={initialValues} onSubmit={onSubmit}>
    {(props: FormikProps<PatientNotificationsFormFields>) => {
      const { values, dirty, handleChange } = props;

      return (
        <Form className="flex flex-col gap-6">
          <div className="flex justify-between items-center mb-8">
            <Typography type="Ag-16-medium">Upcoming visits</Typography>
            <Field
              id="visits"
              name="visits"
              key="visits"
              checked={values.visits}
              onChangeHandler={handleChange}
              component={Checkbox}
            />
          </div>
          <div className="flex justify-between items-center mb-8">
            <Typography type="Ag-16-medium">Recommendations</Typography>
            <Field
              id="recommendations"
              name="recommendations"
              key="recommendations"
              checked={values.recommendations}
              onChangeHandler={handleChange}
              component={Checkbox}
            />
          </div>
          <div className="flex justify-between items-center mb-8">
            <Typography type="Ag-16-medium">
              Reminders to fill in data
            </Typography>
            <Field
              id="reminders"
              name="reminders"
              key="reminders"
              checked={values.reminders}
              onChangeHandler={handleChange}
              component={Checkbox}
            />
          </div>
          <div className="flex justify-between items-center">
            <Typography type="Ag-16-medium">
              Proposition to terminate declaration from the family practitioner
            </Typography>
            <Field
              id="propositions"
              name="propositions"
              key="propositions"
              checked={values.propositions}
              onChangeHandler={handleChange}
              component={Checkbox}
            />
          </div>

          <Button
            className="min-w-full"
            type="submit"
            label="Save"
            disabled={!dirty}
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
