import { AxiosResponse, AxiosError } from 'axios';
import { api } from './http/http.service';

interface IPassword {
  password: string;
  id: number;
  linkId: string;
}

type TPickPassword = Pick<IPassword, 'password'>;

export const ChangeUserPassword = async (
  password: string,
  id: number,
  linkId: string,
): Promise<AxiosResponse<TPickPassword>> => {
  return api.post<TPickPassword>(`/auth/restore-forgotten-password/${id}`, {
    password,
    linkId,
  });
};

export const PathUserPassword = async (
  password: string,
  id: number,
  linkId: string,
) => {
  try {
    return await ChangeUserPassword(password, id, linkId);
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(`${err}`);
    }
    if (err instanceof Error) {
      throw new Error(`${err.message}`);
    }
  }
};
