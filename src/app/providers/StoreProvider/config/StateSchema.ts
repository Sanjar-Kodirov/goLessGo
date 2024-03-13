import { AxiosInstance } from 'axios';

import { NavigateOptions, To } from 'react-router-dom';

import { ArticleDetailsSchema } from '@/entities/Article';
import { ProfileSchema } from '@/entities/Profile';
import { LoginSchema } from '@/features/AuthByUserName';
import { ArticleDetailsCommentsSchema } from '@/pages/ArticleDetailsPage/model/types/ArticleDetailsCommentsSchema';
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
}

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: UnknownAction) => StateSchema;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
}

export type StateSchemaKey = keyof StateSchema;
export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
  api: AxiosInstance;
  navigate?: (to: To, options?: NavigateOptions) => void;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
}
