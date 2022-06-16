import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  if (localStorage.getItem('token') && config.headers)
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    console.clear();
    const originalConfig = err.config;
    if (originalConfig.url !== '/auth/login' && err.response) {
      const access = localStorage.getItem('token');
      if (err.response.status === 401 && access) {
        try {
          const token = document.cookie.replace(
            /(?:(?:^|.*;\s*)refresh_token\s*\=\s*([^;]*).*$)|^.*$/,
            '$1',
          );
          const rs = await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/auth/refresh`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          const { accessToken, refreshToken } = rs.data;
          localStorage.setItem('token', accessToken);
          document.cookie = `refresh_token=${refreshToken}; max-age=604800; path=/`;
          return api(originalConfig);
        } catch (_err) {
          return Promise.reject(_err);
        }
      }
    }
    return Promise.reject(err);
  },
);

export { api };
