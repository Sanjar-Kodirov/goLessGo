import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { Profile } from '../../types/profile';

export const fetchProfileData = createAsyncThunk<
  Profile,
  void,
  ThunkConfig<string>
>('profile/fetchProfileData', async (_, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;


  try {
    const response = await extra.api.get<Profile>('/api/current_user');

    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue('error');
  }
});
