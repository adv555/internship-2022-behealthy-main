import { createSelector } from '@reduxjs/toolkit';
import { IPatient, IPractitioner } from './types';
import { IWorkExperience } from 'common/types/app/WorkExperience';
import { IEducationFormItem } from 'common/types/app/Education';

import { IDeclaration } from 'common/types/app/Declaration.type';

export const getUserId = (state: { user: { data: { id: number } } }) =>
  state.user.data.id;

export const getAllPractitioners = (state: {
  my_practitioner: { practitioners: IPractitioner[] };
}) => state.my_practitioner.practitioners;

export const getPractitionerData = (state: {
  my_practitioner: { practitioner: IPractitioner };
}) => state.my_practitioner.practitioner;

export const getPractitionerName = createSelector(
  getPractitionerData,
  (practitioner: IPractitioner) => {
    const practitionerName = `${practitioner.first_name} ${practitioner.last_name}`;
    return practitionerName;
  },
);

export const getPractitionerId = (state: {
  my_practitioner: { practitioner: IPractitioner };
}) => state.my_practitioner.practitioner?.id;

export const getPractitionerEducation = (state: {
  education: { educationList: IEducationFormItem[] };
}) => state.education.educationList;

export const getPractitionerExperience = (state: {
  work_experience: { experienceList: IWorkExperience[] };
}) => state.work_experience.experienceList;

export const getAvatar = createSelector(
  [getPractitionerData],
  (practitioner: IPractitioner) => {
    if (!practitioner) {
      return null;
    }

    const avatar = practitioner.user.avatar;
    return avatar ? avatar : 'https://via.placeholder.com/150';
  },
);

export const getCity = createSelector(
  [getPractitionerExperience],
  (experienceList: IWorkExperience[]) => {
    if (!experienceList) {
      return null;
    }
    const city: string = experienceList
      .slice(-1)
      .map(({ clinic_address }) => clinic_address)
      .join()
      .split(',')[1];
    return city;
  },
);

export const getClinicContacts = createSelector(
  [getPractitionerExperience],
  (experienceList: IWorkExperience[]) => {
    if (!experienceList) {
      return null;
    }
    const clinicName: string = experienceList
      .slice(-1)
      .map((item) => item.clinic_name)
      .join();

    const clinicAddress: string = experienceList
      .slice(-1)
      .map(({ clinic_address }) => clinic_address)
      .join();
    const city: string = experienceList
      .slice(-1)
      .map(({ clinic_address }) => clinic_address)
      .join()
      .split(',')[1];
    const clinicContacts = {
      clinicName,
      clinicAddress,
      city,
    };

    return clinicContacts;
  },
);

export const getPractitionerFullYearExperience = createSelector(
  [getPractitionerExperience],
  (experienceList: IWorkExperience[]) => {
    if (!experienceList) {
      return null;
    }
    const startYear: string = experienceList[0]?.date_from.split('-')[0];

    if (!startYear) {
      return null;
    }

    const fullYearsExperience: number =
      new Date().getFullYear() - Number(startYear);
    return fullYearsExperience;
  },
);

export const getPractitionerProfile = createSelector(
  [getPractitionerData, getPractitionerEducation, getPractitionerExperience],
  (practitioner, education, experience) => {
    return {
      ...practitioner,
      education,
      experience,
    };
  },
);

export const getFullPractitionerData = createSelector(
  [
    getAllPractitioners,
    getPractitionerEducation,
    getPractitionerExperience,
    getAvatar,
  ],
  (practitioners, education, experience, avatar) => {
    return practitioners.map((practitioner) => ({
      ...practitioner,
      experience: experience,
      education: education,
      avatar: avatar,
    }));
  },
);

export const getFilterByName = (state: {
  declaration_filters: { filterByName: string };
}) => state.declaration_filters.filterByName;

export const getFilterByGender = (state: {
  declaration_filters: { filterByGender: string };
}) => state.declaration_filters.filterByGender;

export const getFilterByCity = (state: {
  declaration_filters: { filterByCity: string };
}) => state.declaration_filters.filterByCity;

export const getFilterByClinic = (state: {
  declaration_filters: { filterByClinic: string };
}) => state.declaration_filters.filterByClinic;

export const getFilterByExperience = (state: {
  declaration_filters: { filterByExperience: string };
}) => state.declaration_filters.filterByExperience;

export const getFilteredPractitioners = createSelector(
  [
    getAllPractitioners,
    getFilterByName,
    getFilterByGender,
    getFilterByCity,
    getFilterByExperience,
  ],
  (practitioners, filterByName, filterByGender, filterByCity) => {
    const filteredPractitioners = practitioners.filter((practitioner) => {
      const fullNameLowerCase =
        `${practitioner.first_name} ${practitioner.last_name}`.toLowerCase();
      const gender = practitioner.gender;

      const currentClinic = practitioner.workExperience.filter(
        (item) => item.date_to === null && item,
      );
      const clinicAddress = currentClinic
        .map((clinic) => clinic.clinic_address)
        .join()
        .toLowerCase();

      const filterByNameLowerCase = filterByName.toLowerCase();
      if (filterByGender === 'All') {
        const isNameMatch = fullNameLowerCase.includes(filterByNameLowerCase);
        const isGenderMatch = gender.includes('');
        const isClinicAddressMatch = clinicAddress.includes(
          filterByCity.toLowerCase(),
        );
        return isNameMatch && isGenderMatch && isClinicAddressMatch;
      } else {
        const isClinicAddressMatch = clinicAddress.includes(
          filterByCity.toLowerCase(),
        );
        const isNameMatch = fullNameLowerCase.includes(filterByNameLowerCase);
        const isGenderMatch = gender.includes(filterByGender);

        return isNameMatch && isGenderMatch && isClinicAddressMatch;
      }
    });
    return filteredPractitioners;
  },
);

export const getFilteredPractitionersByAllFilters = createSelector(
  [getFilteredPractitioners, getFilterByExperience],
  (practitioners, filterByExperience) => {
    if (filterByExperience === 'Low') {
      return practitioners.sort((a, b) => {
        const fullNameA = `${a.first_name} ${a.last_name}`.toLowerCase();
        const fullNameB = `${b.first_name} ${b.last_name}`.toLowerCase();
        return fullNameA > fullNameB ? 1 : -1;
      });
    } else if (filterByExperience === 'High') {
      return practitioners.sort((a, b) => {
        const fullNameA = `${a.first_name} ${a.last_name}`.toLowerCase();
        const fullNameB = `${b.first_name} ${b.last_name}`.toLowerCase();
        return fullNameA < fullNameB ? 1 : -1;
      });
    } else {
      return practitioners;
    }
  },
);

export const getPatientData = (state: { patient: { data: IPatient } }) =>
  state.patient.data;

export const getPatientId = (state: { patient: { data: { id: number } } }) =>
  state.patient.data.id;

export const getPatientName = createSelector([getPatientData], (patient) => {
  if (!patient) {
    return '';
  }
  return `${patient.first_name} ${patient.last_name}`;
});

export const getPatientDeclarations = (state: {
  declaration: { declaration: IDeclaration[] };
}) => state.declaration.declaration;
