import { IPatient } from './Patient.type';

export interface IDeclaration {
  id?: number;
  patient_id?: number;
  family_practitioner_id: number;
  status: string;
}
export interface IDeclarationSelect extends IDeclaration {
  patient: IPatient;
  createdAt: string;
}

export interface IDeclarationState {
  items: IDeclarationSelect[];
  isBusy: boolean;
  error: string | null;
  declaration: IDeclaration[] | null;
  current: IDeclarationSelect | null;
}
