import axios from 'axios';
import { toast } from 'sonner';

import { USER_LOCALSTORAGE_KEY } from '../const/localStorage';

export const $api = axios.create({
  withCredentials: true,
  headers: { 'Content-Type': 'application/json', language: 'ru' },
});

$api.interceptors.request.use((config) => {
  const token = localStorage.getItem(USER_LOCALSTORAGE_KEY);

  if (token) {
    config.headers = Object.assign(config.headers, {
      Authorization: 'Bearer ' + token,
    });
    return config;
  } else {
    return config;
  }
});

$api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = (error.response && error.response.status) || 0;

    if (status === 401) {
      toast.error('Ошибка авторизации');
    } else if (status === 403) {
      toast.error('Ошибка');
    } else if (status >= 400) {
      if (error.response) {
        toast.error('Ошибка');
      }
    }

    return Promise.reject(error);
  },
);
