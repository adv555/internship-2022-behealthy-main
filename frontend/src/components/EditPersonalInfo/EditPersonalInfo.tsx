import { UserRoles } from 'common/enums/app/user-roles.enum';
import { RootState } from 'common/types/app/root-state.type';
import { BirthDateField } from 'components/common/BirthDateInput/BirthDateField';
import { Button } from 'components/common/Button/Button';
import { PhoneInput } from 'components/common/Input/PhoneInput';
import TextInputField from 'components/common/Input/TextInputField';
import { Radio } from 'components/common/Radio/Radio';
import { Typography } from 'components/common/Typography';
import { UploadAvatarButton } from 'components/common/UploadAvatarButton/UploadAvatarButton';
import { Form, Formik } from 'formik';
import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PractitionerActionCreator } from 'store/practitioner/practitioner.reducer';
import { UserActionCreator } from 'store/user/getUser.reducer';

export interface ProfileInfo {
  id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  gender?: string;
  birthdate?: string;
}

interface EditPersonalInfoProps {
  profileInfo: ProfileInfo;
  validationSchema: any;
  role?: string;
}

export const EditPersonalInfo: FC<EditPersonalInfoProps> = ({
  profileInfo,
  validationSchema,
  role,
}) => {
  const [successUpdate, setSuccessUpdate] = useState<boolean>(false);
  const [activateEmailError, setActivateEmailError] = useState<string | null>(
    null,
  );
  const dispatch = useDispatch();

  const { practitionerError } = useSelector(
    (state: RootState) => state.practitioner,
  );
  const user = useSelector((state: RootState) => state.user.data);
  const userError = useSelector((state: RootState) => state.user.error);

  const onSubmit = (values: any) => {
    const { email, ...data } = values;

    if (role == UserRoles.PRACTITIONER) {
      dispatch(
        PractitionerActionCreator.updatePractitionerData({
          id: profileInfo.id,
          values: {
            ...data,
            user_id: user?.id,
          },
        }),
      );
    }

    if (email !== user?.email) {
      dispatch(
        UserActionCreator.updateUser({
          id: user?.id,
          updatedData: {
            email: values.email,
          },
        }),
      );

      setActivateEmailError('You need activate your new email');
    }

    setSuccessUpdate(true);
  };

  return (
    <Formik
      initialValues={profileInfo}
      onSubmit={onSubmit}
      validateOnBlur={true}
      validateOnChange={false}
      validationSchema={validationSchema}
    >
      {({ values, errors, setFieldValue, handleChange }) => (
        <Form>
          <div className="mb-6">
            <TextInputField
              name="first_name"
              placeholder="Write your first name"
              label="First name"
            />
          </div>
          <div className="mb-6">
            <TextInputField
              name="last_name"
              placeholder="Write your last name"
              label="Last name"
            />
          </div>
          <div className="mb-6">
            <TextInputField
              type="email"
              name="email"
              placeholder="Write your email"
              label="Email"
            />
            {activateEmailError && !userError && (
              <Typography type="Ag-13-medium" className="text-error mt-2">
                {activateEmailError}
              </Typography>
            )}
          </div>
          <Typography type="Ag-13-medium" className="mb-2.5 text-greyScaleGrey">
            Gender
          </Typography>
          <div className="flex justify-between mb-6">
            <Radio
              name="gender"
              label="Male"
              onChange={() => setFieldValue('gender', 'Male')}
              checked={values.gender === 'Male'}
            />
            <Radio
              name="gender"
              label="Female"
              onChange={() => setFieldValue('gender', 'Female')}
              checked={values.gender === 'Female'}
            />
            <Radio
              name="gender"
              label="Other"
              onChange={() => setFieldValue('gender', 'Other')}
              checked={values.gender === 'Other'}
            />
          </div>
          <BirthDateField
            name="birthdate"
            error={errors.birthdate}
            returnDate={handleChange}
            className="mb-6"
          />
          <div className="mb-6">
            <PhoneInput
              label="Phone"
              id="phone"
              value={values.phone}
              placeholder="+380 12 345 67 89"
              setFieldValue={setFieldValue}
              error={errors.phone}
            />
          </div>
          <Button
            type="submit"
            label="Save"
            className="w-[100%] desktop:w-full"
          />
          {practitionerError ||
            (userError && (
              <Typography type="Ag-13-medium" className="text-error mt-2">
                {practitionerError || userError}
              </Typography>
            ))}
          {successUpdate && !practitionerError && !userError && (
            <Typography type="Ag-13-medium" className="text-green mt-2">
              Information successfuly updated
            </Typography>
          )}
        </Form>
      )}
    </Formik>
  );
};
