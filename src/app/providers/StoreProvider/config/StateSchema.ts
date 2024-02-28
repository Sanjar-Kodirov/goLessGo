import { AxiosInstance } from 'axios';

import { NavigateOptions, To } from 'react-router-dom';

import { ProfileSchema } from '@/entities/Profile';
import { UserSchema } from '@/entities/User';
import { LoginSchema } from '@/features/AuthByUserName';
import {
  EnhancedStore,
  Reducer,
  ReducersMapObject,
  UnknownAction,
} from '@reduxjs/toolkit';

export interface StateSchema {
  user: UserSchema;
  profile: ProfileSchema;

  // async
  loginForm?: LoginSchema;
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
