import type { StateSchema } from './config/StateSchema';
import { createReduxStore } from './config/store';
import { StoreProvider } from './ui/StoreProvider';

export type { AppDispatch } from './config/store';
export type { ThunkConfig } from './config/StateSchema';

export { StoreProvider, createReduxStore, StateSchema };
