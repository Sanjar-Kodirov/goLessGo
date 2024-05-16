import {
  StateSchema,
  ThunkConfig,
} from '@/app/providers/StoreProvider/config/StateSchema';
import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  getArticlesPageHasMore,
  getArticlesPageIsLoading,
  getArticlesPageNum,
} from '../../selectors/articlesPageSelectors';
import { articlesPageActions } from '../../slices/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const fetchNextArticlesPage = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
>('articlesPage/fetchNextArticlesPage', async (_, thunkApi) => {
  const { getState, dispatch } = thunkApi;
  const hasMore = getArticlesPageHasMore(getState() as StateSchema);
  const page = getArticlesPageNum(getState() as StateSchema);
  const isLoading = getArticlesPageIsLoading(getState() as StateSchema);

  console.log('hasmore', hasMore);

  if (hasMore && !isLoading) {
    dispatch(articlesPageActions.setPage(page + 1));
    dispatch(
      fetchArticlesList({
        page: page + 1,
      }),
    );
  }
});
