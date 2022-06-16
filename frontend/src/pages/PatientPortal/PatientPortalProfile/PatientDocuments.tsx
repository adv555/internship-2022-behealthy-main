import { ProfileSection } from 'components/common/ProfileSection/ProfileSection';
import { Form, Formik, FormikProps } from 'formik';
import { ImageThumb, ImageUploadInput } from 'components/common/ImageUpload';
import {
  ChangeEvent,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Button } from 'components/common/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'common/types/app/root-state.type';
import { DocumentInfoActionCreators } from 'store/document_upload/createDocument.reducer';
import {
  DocumentsActionCreator,
  DocumentsData,
} from 'store/document_upload/loadDocuments.reducer';
import { Typography } from 'components/common/Typography';
import { ReducerName } from 'common/enums/app/reducer-name.enum';

interface UploadDocumentsProps {
  user_id: string;
  files: File[];
}

export const PatientDocuments = () => {
  const inputFile: MutableRefObject<null> = useRef(null);
  const { data, isLoaded } = useSelector(
    (state: RootState) => state[ReducerName.USER],
  );
  const { documentsData } = useSelector(
    (state: RootState) => state[ReducerName.LOAD_DOCUMENTS],
  );
  const [successUploaded, setSuccesUploaded] = useState(false);

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
      {documentsData.length < 2 ? (
        <Formik initialValues={initialValues} onSubmit={onSubmitData}>
          {(props: FormikProps<any>) => {
            const { values, dirty, setFieldValue } = props;
            return (
              <Form className="flex flex-col gap-6">
                <UploadDocument
                  name="id_num"
                  title="Upload ID Number"
                  inputFile={inputFile}
                  setFieldValue={setFieldValue}
                  value={values.files}
                  loadedData={documentsData ? documentsData[0] : null}
                />

                <UploadDocument
                  name="pasport"
                  title="Upload Your Passport"
                  inputFile={inputFile}
                  setFieldValue={setFieldValue}
                  value={values.files}
                  loadedData={documentsData ? documentsData[1] : null}
                />

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

const UploadDocument = (props: {
  name: string;
  title: string;
  inputFile: MutableRefObject<null>;
  setFieldValue: (field: string, value: File[]) => void;
  value: File[];
  loadedData: DocumentsData | null;
}) => {
  const { name, title, inputFile, setFieldValue, value, loadedData } = props;

  const [img, setImg] = useState('');

  const onImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event && event.currentTarget && event.currentTarget.files) {
      const file = event.currentTarget.files[0];
      setFieldValue('files', value.concat(file));
      setImg(URL.createObjectURL(file));
    }
  };

  return (
    <>
      {loadedData ? (
        <div key={loadedData.id} className="w-full mb-10 last:mb-0">
          <img src={loadedData.scan} alt="" className="w-full" />
        </div>
      ) : img ? (
        <ImageThumb path={img} />
      ) : (
        <ImageUploadInput
          id={name}
          name={name}
          text={title}
          onImageUpload={onImageUpload}
          inputFile={inputFile}
        />
      )}
    </>
  );
};
