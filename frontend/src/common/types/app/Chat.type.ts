import { IPractitioner } from './Practitioner';
import { IPatient } from './Patient.type';
import { IChatMessage } from './ChatMessage.type';
export interface IChat extends IChatCreateDto {
  id: number;
}
export interface IChatState {
  isLoaded: boolean;
  items: IChatSelect[];
  error: string | null;
  currentItem: { item: IChatSelect | null; isLoaded: boolean };
}

export interface IChatSelect extends IChat {
  messages: IChatMessage[];
  patient: IPatient;
  familyPractitioner: IPractitioner;
  createdAt: string;
}

export interface IChatCreateDto {
  patient_id: number;
  family_practitioner_id: number;
  is_active: boolean;
}
