import { AxiosInstance } from 'axios';

import { ArticleDetailsSchema } from '@/entities/Article';
import { ProfileSchema } from '@/entities/Profile';
import { LoginSchema } from '@/features/AuthByUserName';
import { SaveScrollSchema } from '@/features/SaveScrool/models/types/SaveScrollTypes';
import { ArticleDetailsCommentsSchema } from '@/pages/ArticleDetailsPage/model/types/ArticleDetailsCommentsSchema';
import { ArticlesPageSchema } from '@/pages/ArticlesPage/model/types/articlesPageSchema';
import {
  EnhancedStore,
  Reducer,
  ReducersMapObject,
  UnknownAction,
} from '@reduxjs/toolkit';

export interface StateSchema {
  profile: ProfileSchema;

  // async
  loginForm?: LoginSchema;
  articleDetails?: ArticleDetailsSchema;
  articleDetailsComments?: ArticleDetailsCommentsSchema;

  // addCommentForm?: AddCommentFormSchema;
  articlesPage?: ArticlesPageSchema;
  saveScroll: SaveScrollSchema;
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: UnknownAction) => StateSchema;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
  // getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
  api: AxiosInstance;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
}
