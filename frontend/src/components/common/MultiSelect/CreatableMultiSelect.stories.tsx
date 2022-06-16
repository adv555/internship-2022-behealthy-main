import { Story } from '@storybook/react';
import { stateOptions, StateOption } from './data';
import { Formik, Field, Form, FormikProps } from 'formik';
import {
  CreatableMultiSelect,
  CreatableMultiSelectProps,
} from './CreatableMultiSelect';
import './MultiSelect.css';

export default {
  component: CreatableMultiSelect,
  title: 'Forms/MultiSelect',
};

const StatesMultiSelect = (props: CreatableMultiSelectProps<StateOption>) =>
  CreatableMultiSelect({
    ...props,
    name: 'states',
    label: 'States',
    options: stateOptions,
  });

type FormWithMultiSelectProps = {};

const FormWithMultiSelect = ({}: FormWithMultiSelectProps) => {
  const initValues = {
    states: [
      {
        value: 'AL',
        label: 'Alabama',
      },
      {
        value: 'AZ',
        label: 'Arizona',
      },
    ],
  };

  const saveNewOption = (option: StateOption): Promise<StateOption> => {
    console.log('sanding data to server...');

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (option.value === 'err') {
          reject("State with name 'err' cannot be created!");
        } else {
          console.log('Saved!');
          resolve(option);
        }
      }, 1000);
    });
  };

  return (
    <Formik initialValues={initValues} onSubmit={() => {}}>
      {({ values, setFieldValue }: FormikProps<any>) => (
        <Form>
          <Field
            id="states"
            name="states"
            component={StatesMultiSelect}
            options={stateOptions}
            value={values.states}
            setFieldValue={setFieldValue}
            saveNewOption={saveNewOption}
          />
        </Form>
      )}
    </Formik>
  );
};

const StatesTemplate: Story<FormWithMultiSelectProps> = (
  args: FormWithMultiSelectProps,
) => <FormWithMultiSelect {...args} />;

export const Creatable = StatesTemplate.bind({});
