import { NavigateOptions, To } from 'react-router-dom';

import { userReducer } from '@/entities/User';
import { $api } from '@/shared/api/api';
import { Reducer, ReducersMapObject, configureStore } from '@reduxjs/toolkit';

import { StateSchema, ThunkExtraArg } from './StateSchema';
import { createReducerManager } from './reducerManager';

export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
  navigate?: (to: To, options?: NavigateOptions) => void,
) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    user: userReducer,
  };

  const reducerManager = createReducerManager(rootReducers);

  const extraArg: ThunkExtraArg = {
    api: $api,
    navigate,
  };

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<StateSchema>,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: {
            api: extraArg,
          },
        },
      }),
  });

  // @ts-ignore
  store.reducerManager = reducerManager;

  return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
