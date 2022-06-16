import React, { useRef } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { Form, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import FormHeader from '../../common/FormHeader/FormHeader';
import { Button } from 'components/common/Button/Button';
import { ImageThumb, ImageUploadInput } from '../../common/ImageUpload';
import { AppRoute } from 'common/enums/app/app-route.enum';
import { DocumentInfoActionCreators } from 'store/document_upload/createDocument.reducer';
import { PractitionerRegistrationActionCreator } from 'store/practitioner/practitionerRegistration.reducer';

export interface DocumentProps {
  user_id: string;
  files: File[];
}

const InitialValues: DocumentProps = {
  user_id: '',
  files: [],
};

const PersonalVerificationForm: React.FC = () => {
  const inputFile: React.MutableRefObject<null> = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [idImg, setIdImg] = React.useState('');
  const [passportImg, setPassportImg] = React.useState('');

  const onSubmitData = (values: DocumentProps) => {
    let data = new FormData();
    values.files.forEach((file: File) => {
      data.append('files', file);
    });

    data.append('user_id', values.user_id);
    dispatch(
      PractitionerRegistrationActionCreator.addStepPayload({
        key: 'verification',
        data: values,
      }),
    );

    dispatch(
      PractitionerRegistrationActionCreator.unlockStep({
        data: 'education',
      }),
    );
    navigate(AppRoute.PRACTITIONER_QUESTIONNAIRE_EDUCATION, {
      replace: true,
    });
  };
  return (
    <div className="mt-[42px]  w-480 ">
      <FormHeader
        title="Person verification"
        subtitle="Please upload your documents to verify your person. Also, you can skip it for now and upload them later. "
      />
      <div className="flex flex-col mb-3 mt-3 w-full">
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
                            values.files.concat(event.currentTarget.files[0]),
                          );
                          setIdImg(
                            URL.createObjectURL(event.currentTarget.files[0]),
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
                            values.files.concat(event.currentTarget.files[0]),
                          );
                          setPassportImg(
                            URL.createObjectURL(event.currentTarget.files[0]),
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
            onClick={() => {
              dispatch(
                PractitionerRegistrationActionCreator.unlockStep({
                  data: 'education',
                }),
              );
              navigate(AppRoute.PRACTITIONER_QUESTIONNAIRE_EDUCATION, {
                replace: true,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalVerificationForm;
