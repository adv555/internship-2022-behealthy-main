import { AxiosResponse } from 'axios';
import { AuthResponse } from 'common/types/auth/AuthResponse';
import { UserRole } from 'common/types/user.types';
import { api } from './http/http.service';

export const signUp = async (
  email: string,
  password: string,
  role: UserRole,
): Promise<AxiosResponse<AuthResponse>> => {
  const authData = await api.post<AuthResponse>('/user/', {
    email,
    password,
    role,
  });
  localStorage.setItem('token', authData.data.accessToken);

  return authData;
};
