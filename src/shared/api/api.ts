import axios from 'axios';

import { USER_LOCALSTORAGE_KEY, access_token } from '../const/localStorage';

const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
const token = JSON.parse(user || '{}');

export const $api = axios.create({
  headers: {
    Authorization: `Bearer ${token.token}`,
  },
});
