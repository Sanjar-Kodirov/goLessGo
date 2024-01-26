import { userReducer } from '@/entities/User';
import { ReducersMapObject, configureStore } from '@reduxjs/toolkit';

import { StateSchema } from './StateSchema';

export function createReduxStore(initialState?: StateSchema) {
  const rootReducer: ReducersMapObject<StateSchema> = {
    user: userReducer,
  };
  return configureStore<StateSchema>({
    reducer: rootReducer,
    preloadedState: initialState,
  });
}
