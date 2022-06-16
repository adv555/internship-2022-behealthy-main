import { AxiosResponse } from 'axios';
import { AuthResponse } from 'common/types/auth/AuthResponse';
import { api } from './http/http.service';

export const login = async (
  email: string,
  password: string,
): Promise<AxiosResponse<AuthResponse>> => {
  const authData = await api.post<AuthResponse>('/auth/login', {
    email,
    password,
  });
  localStorage.setItem('token', authData.data.accessToken);
  document.cookie = `refresh_token=${authData.data.refreshToken}; max-age=604800; path=/`;

  return authData;
};
