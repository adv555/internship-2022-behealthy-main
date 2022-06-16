import { ProfileSection } from 'components/common/ProfileSection/ProfileSection';
import { Form, Formik, FormikProps } from 'formik';
import { ImageThumb, ImageUploadInput } from 'components/common/ImageUpload';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Button } from 'components/common/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'common/types/app/root-state.type';
import { DocumentInfoActionCreators } from 'store/document_upload/createDocument.reducer';
import { DocumentsActionCreator } from 'store/document_upload/loadDocuments.reducer';
import { Typography } from 'components/common/Typography';

interface UploadDocumentsProps {
  user_id: string;
  files: File[];
}

export const PractitionerDocuments = () => {
  const inputFile: MutableRefObject<null> = useRef(null);
  const { data, isLoaded } = useSelector((state: RootState) => state.user);
  const { documentsData } = useSelector(
    (state: RootState) => state.load_documents,
  );
  const [successUploaded, setSuccesUploaded] = useState(false);
  const [idImg, setIdImg] = useState('');
  const [passportImg, setPassportImg] = useState('');

  const dispatch = useDispatch();

  const initialValues: UploadDocumentsProps = {
    user_id: '',
    files: [],
  };

  useEffect(() => {
    isLoaded && dispatch(DocumentsActionCreator.loadDocumentsData(data?.id));
  }, [isLoaded]);

  const onSubmitData = (values: UploadDocumentsProps) => {
    values.user_id = data?.id.toString() as string;

    let formData = new FormData();
    values.files.forEach((file: File) => {
      formData.append('files', file);
    });

    formData.append('user_id', values.user_id);

    dispatch(DocumentInfoActionCreators.submitDocumentsData(formData));
    setSuccesUploaded(true);
  };

  return (
    <ProfileSection title="My documents">
      {documentsData.length === 0 ? (
        <Formik initialValues={initialValues} onSubmit={onSubmitData}>
          {(props: FormikProps<any>) => {
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
                {!successUploaded && (
                  <div className=" mt-10">
                    <Button
                      type="submit"
                      label="Save"
                      disabled={!dirty}
                      className="w-[100%] desktop:w-full"
                    />
                  </div>
                )}
                {successUploaded && (
                  <Typography type="Ag-13-medium" className="text-green mt-2">
                    Documents was successfully uploaded
                  </Typography>
                )}
              </Form>
            );
          }}
        </Formik>
      ) : (
        <div>
          {documentsData.map((document) => (
            <div key={document.id} className="w-full mb-10 last:mb-0">
              <img src={document.scan} alt="" className="w-full" />
            </div>
          ))}
        </div>
      )}
    </ProfileSection>
  );
};
