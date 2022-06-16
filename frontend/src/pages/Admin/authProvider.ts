import { AUTH_LOGIN } from 'react-admin';

export default async (type: string, params: any) => {
  if (type === AUTH_LOGIN) {
    const { email, password } = params;
    const request = new Request('http://localhost:3002/api/v1/admins/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });
    return fetch(request)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(({ accessToken }) => {
        localStorage.setItem('token', accessToken);
      });
  }
  return Promise.resolve();
};
