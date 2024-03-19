import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import { CreateComment } from '@/entities/Comment/model/types/comment';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const addCommentForArticle = createAsyncThunk<
  Comment,
  CreateComment,
  ThunkConfig<string>
>('articleDetails/addCommentForArticle', async (data, thunkApi) => {
  const { extra, dispatch, rejectWithValue } = thunkApi;

  // if (!data. || !text || !article) {
  //   return rejectWithValue('no data');
  // }

  try {
    const response = await extra.api.post<Comment>('/api/comments', data);

    if (!response.data) {
      throw new Error();
    }

    // dispatch(fetchCommentsByArticleId(article?.id));

    return response.data;
  } catch (e) {
    return rejectWithValue('error');
  }
});
