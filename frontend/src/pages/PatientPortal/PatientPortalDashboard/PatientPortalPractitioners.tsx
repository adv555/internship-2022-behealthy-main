import { Typography } from 'components/common/Typography';
import { Layout } from 'components/PatientPortal/Layout/Layout';
import { FiltersDashboard } from 'components/PatientPortal/MyFamilyPractitioners/FiltersDashboard';
import { PractitionerCard } from 'components/PatientPortal/MyFamilyPractitioners/PractitionerCard';
import { useEffect, useState } from 'react';
import { MyPractitionerActionCreators } from 'store/patient/myPractitioner.reducer';
import { useDispatch, useSelector } from 'react-redux';
import { ExperienceActionCreator } from 'store/experience/experience.reducer';
import { EducationActionCreator } from 'store/education/education.reducer';
import { IPractitionerFullData } from 'store/patient/types';
import { SimpleSelect } from 'components/common/Select/Select';
import { sortStyles } from 'components/common/Select/selectSort.styles';
import { IDeclaration } from 'common/types/app/Declaration.type';
import { DeclarationActionCreator } from 'store/declaration/declaration.reducer';

import { useNavigate } from 'react-router';
import { AppRoute } from 'common/enums/app/app-route.enum';
import GoBackButton from 'components/common/GoBackButton/GoBackButton';
import {
  getFilteredPractitionersByAllFilters,
  getPatientData,
  getPatientDeclarations,
  getPractitionerData,
} from 'store/patient/selectors';
import { DeclarationFilterActionCreator } from 'store/declaration/declarationFilters.reducer';
import { PractitionerActionCreator } from 'store/practitioner/practitioner.reducer';

const options = [
  { value: 'Low', label: 'A to Z' },
  { value: 'High', label: 'Z to A' },
];

export const PatientPortalPractitioners = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sortOption, setOption] = useState('');

  const [declarationStatus, setDeclarationStatus] = useState('');
  const [genderOption, setGenderOption] = useState('');

  const practitioners = useSelector(getFilteredPractitionersByAllFilters);
  const practitioner = useSelector(getPractitionerData);
  const patient = useSelector(getPatientData);

  useEffect(() => {
    if (!sortOption) {
      return;
    }
    dispatch(DeclarationFilterActionCreator.setFilterByExperience(sortOption));
  }, [dispatch, sortOption]);

  useEffect(() => {
    dispatch(MyPractitionerActionCreators.getPractitioners());

    if (!patient?.id) {
      return;
    }
    dispatch(DeclarationActionCreator.getDeclarationByPatientId(patient?.id));
  }, [dispatch, patient?.id, declarationStatus]);

  const declarations = useSelector(getPatientDeclarations);

  let newPractitionersData: IPractitionerFullData[] = [];
  practitioners?.map((practitioner) => {
    let clinicAddress = 'No clinic address';
    let yearsOfExperience = 0;

    if (practitioner.workExperience.length > 0) {
      const currentClinic = practitioner?.workExperience.filter(
        (item) => item.date_to === null && item,
      );
      clinicAddress = currentClinic
        .map((clinic) => clinic.clinic_address)
        .join();
      const startDateExperience = practitioner?.workExperience
        .map((item) => item.date_from)
        .sort()[0]
        .split('-')[0];

      yearsOfExperience =
        new Date().getFullYear() - Number(startDateExperience);
    }
    console.log(practitioner);

    const newPractitioner: IPractitionerFullData = {
      ...practitioner,
      avatar: practitioner.user.avatar,
      experience: yearsOfExperience,
      clinicAddress: clinicAddress,
      declaration: declarations?.find(
        (dec) => dec.family_practitioner_id === practitioner.id,
      ),
    };

    return newPractitionersData.push(newPractitioner);
  });

  const getProfile = (id: number) => {
    dispatch(MyPractitionerActionCreators.getPractitionerById(id));
    dispatch(ExperienceActionCreator.getExperience(id));
    dispatch(EducationActionCreator.getEducation(id));
    if (
      declarations?.find(
        (dec) =>
          dec.family_practitioner_id === id &&
          (dec.status === 'REQUESTED' || dec.status === 'ACTIVE'),
      )
    ) {
      navigate(AppRoute.PATIENT_PORTAL_MY_PRACTITIONER, { replace: true });
    } else {
      navigate(AppRoute.PATIENT_PORTAL_PRACTITIONERS_PROFILE, {
        replace: true,
      });
    }
  };

  const postRequestForDeclaration = (family_practitioner_id: number) => {
    setDeclarationStatus('REQUESTED');
    const declarationData: IDeclaration = {
      family_practitioner_id,
      patient_id: patient?.id,
      status: 'REQUESTED',
    };

    getProfile(family_practitioner_id);
    dispatch(DeclarationActionCreator.postDeclaration(declarationData));

    navigate(AppRoute.PATIENT_PORTAL_MY_PRACTITIONER, { replace: true });
  };
  const updateDeclaration = (status: string, declaration_id: number) => {
    setDeclarationStatus('REJECTED');
    const newDeclaration: IDeclaration = {
      id: declaration_id,
      patient_id: patient?.id,
      family_practitioner_id: practitioner?.id,
      status,
    };

    dispatch(DeclarationActionCreator.updateDeclaration(newDeclaration));

    navigate(AppRoute.PATIENT_PORTAL_PRACTITIONERS_PROFILE, { replace: true });
  };

  return (
    <Layout>
      <div className="flex justify-between align-middle">
        {practitioner ? (
          <GoBackButton
            onClick={() =>
              navigate(AppRoute.PATIENT_PORTAL_MY_PRACTITIONER, {
                replace: true,
              })
            }
          >
            <Typography type={'h4'} children={'Family practitioners'} />
          </GoBackButton>
        ) : (
          <Typography
            type={'h4'}
            children={'Family practitioners'}
            onClick={() => {
              setGenderOption('');
              dispatch(DeclarationFilterActionCreator.setFilterByGender('All'));
              setGenderOption('All');
            }}
          />
        )}

        <SimpleSelect
          name={`sortBy`}
          options={options}
          placeholder={'Sort by'}
          styles={sortStyles}
          onChange={(option: { value: string }) => {
            setOption(option.value);
          }}
          size={'default'}
        />
      </div>
      <FiltersDashboard genderFilter={genderOption} />
      <div className="grid gap-x-10 gap-y-4 grid-cols-declaration-cards">
        {newPractitionersData &&
          newPractitionersData?.map(
            ({
              id,
              first_name,
              last_name,
              avatar,
              clinicAddress,
              experience,
              declaration,
              phone,
            }) => (
              <PractitionerCard
                key={id}
                avatar={avatar}
                name={`Dr. ${first_name} ${last_name}`}
                phone={phone}
                address={clinicAddress}
                experience={`${experience} years`}
                getProfile={() => {
                  getProfile(id);
                  dispatch(PractitionerActionCreator.getPractitionerById(id));
                }}
                getDeclaration={() => {
                  postRequestForDeclaration(id);
                  dispatch(PractitionerActionCreator.getPractitionerById(id));
                }}
                cancelRequest={() =>
                  updateDeclaration('REJECTED', declaration?.id)
                }
                btnStatus={declaration?.status}
              />
            ),
          )}
      </div>
    </Layout>
  );
};
