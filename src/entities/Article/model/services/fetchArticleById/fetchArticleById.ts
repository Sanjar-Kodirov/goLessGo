import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { ArticleDetailsResponseModel } from '../../types/article';

export const fetchArticleById = createAsyncThunk<
  ArticleDetailsResponseModel,
  string,
  ThunkConfig<string>
>('articleDetails/fetchArticleById', async (articleId, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.get<ArticleDetailsResponseModel>(
      `/api/articles/${articleId}`,
    );

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue('error');
  }
});
