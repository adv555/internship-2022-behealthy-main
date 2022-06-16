import React, { useRef } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import FormHeader from '../../common/FormHeader/FormHeader';
import { Button } from 'components/common/Button/Button';
import { ImageThumb, ImageUploadInput } from '../../common/ImageUpload';
import { AppRoute } from 'common/enums/app/app-route.enum';
import { DocumentInfoActionCreators } from 'store/document_upload/createDocument.reducer';
import { Preloader } from 'components/Patient-questionary/Preloader/Preloader';
import { RootState } from 'common/types/app/root-state.type';

export interface DocumentProps {
  user_id?: number | string;
  files: File[];
}

const InitialValues: DocumentProps = {
  user_id: '',
  files: [],
};

const PersonalVerificationForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputFile: React.MutableRefObject<null> = useRef(null);
  const [idImg, setIdImg] = React.useState('');
  const [passportImg, setPassportImg] = React.useState('');

  const { isSubmitting } = useSelector(
    ({ documentUpload }: RootState) => documentUpload,
  );
  const { data } = useSelector(({ user }: RootState) => user);
  const id = data?.id;

  const nextPage = () => {
    navigate(AppRoute.PATIENT_QUESTIONARY_BMI, { replace: true });
  };

  const onSubmitData = (values: DocumentProps) => {
    values.user_id = id?.toString() as string;
    let data = new FormData();
    values.files.forEach((file: File) => {
      data.append('files', file);
    });

    data.append('user_id', values.user_id);

    dispatch(DocumentInfoActionCreators.submitDocumentsData(data));
    nextPage();
  };
  return (
    <div className="mt-[42px]  w-480 ">
      <FormHeader
        title="Person verification"
        subtitle="Please upload your documents to verify your person. Also, you can skip it for now and upload them later. "
      />
      <div className="flex flex-col mb-3 mt-3 w-full">
        {isSubmitting ? (
          <div className="flex justify-center items-center h-[350px]">
            <Preloader />
          </div>
        ) : (
          <>
            <Formik
              initialValues={InitialValues}
              validationSchema={Yup.mixed().nullable().notRequired()}
              onSubmit={onSubmitData}
            >
              {(props: FormikProps<DocumentProps>) => {
                const { values, dirty, setFieldValue } = props;
                return (
                  <Form>
                    <div className="flex flex-col gap-6">
                      {idImg ? (
                        <ImageThumb path={idImg} />
                      ) : (
                        <ImageUploadInput
                          id="file"
                          name="file"
                          text="Upload ID Number"
                          onImageUpload={(event) => {
                            if (
                              event &&
                              event.currentTarget &&
                              event.currentTarget.files
                            ) {
                              setFieldValue(
                                'files',
                                values.files.concat(
                                  event.currentTarget.files[0],
                                ),
                              );
                              setIdImg(
                                URL.createObjectURL(
                                  event.currentTarget.files[0],
                                ),
                              );
                            }
                          }}
                          inputFile={inputFile}
                        />
                      )}
                      {passportImg ? (
                        <ImageThumb path={passportImg} />
                      ) : (
                        <ImageUploadInput
                          id="file2"
                          name="file2"
                          text="Upload Your Passport"
                          onImageUpload={(event) => {
                            if (
                              event &&
                              event.currentTarget &&
                              event.currentTarget.files
                            ) {
                              setFieldValue(
                                'files',
                                values.files.concat(
                                  event.currentTarget.files[0],
                                ),
                              );
                              setPassportImg(
                                URL.createObjectURL(
                                  event.currentTarget.files[0],
                                ),
                              );
                            }
                          }}
                          inputFile={inputFile}
                        />
                      )}
                    </div>
                    <div className=" mt-10">
                      <Button type="submit" label="Save" disabled={!dirty} />
                    </div>
                  </Form>
                );
              }}
            </Formik>
            <div className=" mt-8">
              <Button
                type="submit"
                label="Skip"
                nameBtn="tertiary"
                onClick={nextPage}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PersonalVerificationForm;
