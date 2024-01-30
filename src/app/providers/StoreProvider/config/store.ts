import { userReducer } from '@/entities/User';
import { loginReducer } from '@/features/AuthByUserName';
import { ReducersMapObject, configureStore } from '@reduxjs/toolkit';

import { StateSchema } from './StateSchema';

export function createReduxStore(initialState?: StateSchema) {
  const rootReducer: ReducersMapObject<StateSchema> = {
    user: userReducer,
    loginForm: loginReducer,
  };
  return configureStore<StateSchema>({
    reducer: rootReducer,
    preloadedState: initialState,
  });
}
