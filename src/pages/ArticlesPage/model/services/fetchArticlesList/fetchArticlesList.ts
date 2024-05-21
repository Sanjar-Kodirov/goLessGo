import {
  StateSchema,
  ThunkConfig,
} from '@/app/providers/StoreProvider/config/StateSchema';
import { Article } from '@/entities/Article';
import { ArticleType } from '@/entities/Article/model/types/article';
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';
import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  getArticlesPageLimit,
  getArticlesPageNum,
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType,
} from '../../selectors/articlesPageSelectors';

interface FetchArticlesListProps {
  replace?: boolean;
}

export const fetchArticlesList = createAsyncThunk<
  Article[],
  FetchArticlesListProps,
  ThunkConfig<string>
>('articlesPage/fetchArticlesList', async (props, thunkApi) => {
  const { extra, rejectWithValue, getState } = thunkApi;
  const limit = getArticlesPageLimit(getState() as StateSchema);
  const sort = getArticlesPageSort(getState() as StateSchema);
  const order = getArticlesPageOrder(getState() as StateSchema);
  const search = getArticlesPageSearch(getState() as StateSchema);
  const page = getArticlesPageNum(getState() as StateSchema);
  const type = getArticlesPageType(getState() as StateSchema);

  try {
    addQueryParams({
      _limit: String(limit),
      _page: String(page),
      _sort: sort,
      _order: order,
      q: search,
      type: type === ArticleType.ALL ? undefined : type,
    });
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
        _sort: sort,
        _order: order,
        q: search,
        type: type === ArticleType.ALL ? undefined : type,
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
