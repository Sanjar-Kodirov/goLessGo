import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import { fetchProfileData } from '@/entities/Profile';
import { User } from '@/entities/User';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface LoginByUsernameProps {
  username: string;
  password: string;
}

export const loginByUsername = createAsyncThunk<
  User,
  LoginByUsernameProps,
  ThunkConfig<string>
>('login/loginByUsername', async (authData, thunkApi) => {
  const { extra, rejectWithValue, dispatch } = thunkApi;

  try {
    const response = await extra.api.post<User>('/api/login', authData);

    if (!response.data) {
      throw new Error();
    }

    localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));

    dispatch(fetchProfileData());

    return response.data;
  } catch (e) {
    console.log('err', e);
    return rejectWithValue('error');
  }
});
