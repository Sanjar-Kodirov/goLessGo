// import { StateSchema } from '@/app/providers/StoreProvider';
// import { Comment } from '@/entities/Comment';
// import {
//   PayloadAction,
//   createEntityAdapter,
//   createSlice,
// } from '@reduxjs/toolkit';
// import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId';
// import { ArticleDetailsCommentsSchema } from '../types/ArticleDetailsCommentsSchema';
// const commentsAdapter = createEntityAdapter<Comment>({
//   // @ts-ignore
//   selectId: (comment: any) => comment.id,
// });
// export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
//   (state) => state.articleDetailsComments || commentsAdapter.getInitialState(),
// );
// const articleDetailsCommentsSlice = createSlice({
//   name: 'articleDetailsCommentsSlice',
//   initialState: commentsAdapter.getInitialState<ArticleDetailsCommentsSchema>({
//     isLoading: false,
//     error: undefined,
//     ids: [],
//     entities: {},
//   }),
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCommentsByArticleId.pending, (state) => {
//         state.error = undefined;
//         state.isLoading = true;
//       })
//       .addCase(
//         fetchCommentsByArticleId.fulfilled,
//         (state, action: PayloadAction<Comment[]>) => {
//           state.isLoading = false;
//           commentsAdapter.setAll(state, action.payload);
//         },
//       )
//       .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       });
//   },
// });
// export const { reducer: articleDetailsCommentsReducer } =
//   articleDetailsCommentsSlice;
import { StateSchema } from '@/app/providers/StoreProvider';
import { Comment } from '@/entities/Comment';
import {
  PayloadAction,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';

import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { ArticleDetailsCommentsSchema } from '../types/ArticleDetailsCommentsSchema';

const commentsAdapter = createEntityAdapter({
  selectId: (comment: Comment) => comment.id,
});

export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
  (state) => state.articleDetailsComments || commentsAdapter.getInitialState(),
);

const articleDetailsCommentsSlice = createSlice({
  name: 'articleDetailsCommentsSlice',
  initialState: commentsAdapter.getInitialState<ArticleDetailsCommentsSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
  }),
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByArticleId.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchCommentsByArticleId.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.isLoading = false;
          commentsAdapter.setAll(state, action.payload);
        },
      )
      .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reducer: articleDetailsCommentsReducer } =
  articleDetailsCommentsSlice;
