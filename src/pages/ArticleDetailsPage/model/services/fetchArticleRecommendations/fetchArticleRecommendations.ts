import type { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article } from '@/entities/Article';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchArticleRecommendations = createAsyncThunk<
  Article[],
  void,
  ThunkConfig<string>
>(
  'articleDetailsPage/fetchArticleRecommendations',
  async (_props, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    console.log('fetching recommendations');

    try {
      const response = await extra.api.get<Article[]>(
        '/api/articles/recommendations',
        {
          params: {
            _limit: 4,
          },
        },
      );

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (e) {
      return rejectWithValue('error');
    }
  },
);
