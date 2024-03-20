import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import { CreateComment } from '@/entities/Comment/model/types/comment';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId/fetchCommentsByArticleId';

export const addCommentForArticle = createAsyncThunk<
  Comment,
  CreateComment,
  ThunkConfig<string>
>('articleDetails/addCommentForArticle', async (data, thunkApi) => {
  const { extra, dispatch, rejectWithValue } = thunkApi;

  try {
    if (!data.articleId || !data.user) {
      return rejectWithValue('error');
    }

    const response = await extra.api.post<Comment>('/api/comments', data);

    if (!response.data) {
      return rejectWithValue('error');
    }

    dispatch(fetchCommentsByArticleId(data?.articleId));

    return response.data;
  } catch (e) {
    return rejectWithValue('error');
  }
});
