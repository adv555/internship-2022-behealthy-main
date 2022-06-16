import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { RootState } from 'common/types/app/root-state.type';
import { UserAvatar } from 'common/types/UserAvatar';
import { Typography } from 'components/common/Typography';
import { UploadAvatarButton } from 'components/common/UploadAvatarButton/UploadAvatarButton';
import { Preloader } from 'components/Patient-questionary/Preloader/Preloader';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { UserActionCreator } from 'store/user/getUser.reducer';

export type UploadAvatarFormFields = Omit<UserAvatar, 'id' | 'user_id'>;

export const UploadAvatarForm = () => {
  const dispatch = useDispatch();
  const fieldName = 'avatar';

  const {
    isAvatarSubmiting,
    updateAvatarError,
    data: user,
  } = useSelector((state: RootState) => state[ReducerName.USER]);

  const onSubmit = (values: UploadAvatarFormFields) => {
    dispatch(UserActionCreator.updateUserAvatar({ id: user!.id, ...values }));
  };

  return (
    <>
      {user && !isAvatarSubmiting ? (
        <>
          {updateAvatarError && (
            <Typography type="Ag-13-medium" className="text-error mt-2">
              Server error: {updateAvatarError}
            </Typography>
          )}
          <Formik initialValues={{ file: null }} onSubmit={onSubmit}>
            {({ setFieldValue }) => {
              return (
                <Form>
                  <Field
                    id={fieldName}
                    name={fieldName}
                    fieldName={fieldName}
                    setFieldValue={setFieldValue}
                    component={UploadAvatarButton}
                    imgUrl={user.avatar}
                  />
                  <button type="submit" className="hidden" />
                </Form>
              );
            }}
          </Formik>
        </>
      ) : (
        <div className="flex justify-center">
          <Preloader />
        </div>
      )}
    </>
  );
};
