import {
  StateSchema,
  ThunkConfig,
} from '@/app/providers/StoreProvider/config/StateSchema';
import { Article } from '@/entities/Article';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { getArticlesPageLimit } from '../../selectors/articlesPageSelectors';

export const fetchArticlesList = createAsyncThunk<
  Article[],
  { page: number },
  ThunkConfig<string>
>('articlesPage/fetchArticlesList', async (props, thunkApi) => {
  const { extra, rejectWithValue, getState } = thunkApi;
  const { page = 1 } = props;
  const limit = getArticlesPageLimit(getState() as StateSchema);

  try {
    const response = await extra.api.get<{
      articles: {
        modelName: string;
        models: Article[];
      };
    }>('/api/articles', {
      params: {
        _expand: 'user',
        _limit: limit,
        _page: page,
      },
    });

    if (!response.data) {
      throw new Error();
    }

    return response.data.articles.models;
  } catch (e) {
    return rejectWithValue('error');
  }
});
