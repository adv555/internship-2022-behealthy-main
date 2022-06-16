import React from 'react';
import { AppRoute } from '../../../common/enums/app/app-route.enum';
import { ReactComponent as ArrowIcon } from '../../../assets/images/chevron-right.svg';
import { Typography } from '../Typography/Typography';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'common/types/app/root-state.type';

export interface BreadcrumbProps {
  role?: 'practitioner' | 'patient';
}
export interface DataProps {
  name: string;
  to: string;
  icon: React.ReactNode | HTMLAllCollection | string;
  stepName?: string;
}

const Breadcrumbs: React.FC<BreadcrumbProps> = ({ role }) => {
  const steps = useSelector(
    (state: RootState) => state.practitioner_registration.steps,
  );
  const PatientData: DataProps[] = [
    {
      name: 'PERSONAL INFO',
      to: AppRoute.PATIENT_QUESTIONARY_INFO,
      icon: <ArrowIcon />,
    },
    {
      name: 'VERIFICATION',
      to: AppRoute.PATIENT_QUESTIONARY_VERIFICATION,
      icon: <ArrowIcon />,
    },
    { name: 'BMI', to: AppRoute.PATIENT_QUESTIONARY_BMI, icon: <ArrowIcon /> },
    {
      name: 'MEDICAL INFO',
      to: AppRoute.PATIENT_QUESTIONARY_MEDICAL_INFO,
      icon: <ArrowIcon />,
    },
    {
      name: 'CONTACT PERSON INFO',
      to: AppRoute.PATIENT_QUESTIONARY_CONTACT_PERSON_INFO,
      icon: '',
    },
  ];
  const PractitionerData: DataProps[] = [
    {
      name: 'PERSONAL INFO',
      to: AppRoute.PRACTITIONER_QUESTIONNAIRE_INFO,
      icon: <ArrowIcon />,
      stepName: 'personalInfo',
    },
    {
      name: 'VERIFICATION',
      to: AppRoute.PRACTITIONER_QUESTIONNAIRE_VERIFICATION,
      icon: <ArrowIcon />,
      stepName: 'verification',
    },
    {
      name: 'EDUCATION',
      to: AppRoute.PRACTITIONER_QUESTIONNAIRE_EDUCATION,
      icon: <ArrowIcon />,
      stepName: 'education',
    },
    {
      name: 'WORK EXPERIENCE',
      to: AppRoute.PRACTITIONER_QUESTIONNAIRE_WORK_EXPERIENCE,
      icon: '',
      stepName: 'workExperience',
    },
  ];

  return (
    <div className="w-full mt-9 items-center justify-center flex gap-2 flex-wrap md:flex-nowrap">
      {role &&
        role === 'patient' &&
        PatientData.map(({ name, to, icon }) => (
          <div
            key={name}
            className="flex flex-nowrap justify-center items-center gap-2 text-greyScaleGrey uppercase whitespace-nowrap"
          >
            <NavLink
              to={to}
              key={name}
              className={({ isActive }) =>
                [
                  'text-greyScaleGrey',
                  isActive ? 'text-gray-600 font-medium' : null,
                ]
                  .filter(Boolean)
                  .join(' ')
              }
            >
              <Typography type={'Ag-13-medium'} className="text-sm">
                {name}
              </Typography>
            </NavLink>
            <div className="flex-shrink-0">{icon}</div>
          </div>
        ))}

      {role &&
        role === 'practitioner' &&
        PractitionerData.map(({ name, to, icon, stepName }) => (
          <div
            key={name}
            className="flex flex-nowrap justify-center items-center gap-1 sm:gap-2 text-greyScaleGrey uppercase"
          >
            <NavLink
              to={to}
              key={name}
              className={({ isActive }) =>
                [
                  'text-greyScaleGrey text-center',
                  isActive ? 'text-gray-600 font-medium' : null,
                  steps[stepName as keyof typeof steps].status === 'unlocked'
                    ? null
                    : 'pointer-events-none',
                ]
                  .filter(Boolean)
                  .join(' ')
              }
            >
              <Typography type={'Ag-13-responsive'}>{name}</Typography>
            </NavLink>
            <div className="flex-shrink-0">{icon}</div>
          </div>
        ))}
    </div>
  );
};

export default Breadcrumbs;
