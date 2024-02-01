import { useDispatch, useStore } from 'react-redux';

import { useEffect } from 'react';

import {
  ReduxStoreWithManager,
  StateSchemaKey,
} from '@/app/providers/StoreProvider/config/StateSchema';

export const useDynamicModuleLoader = (
  name: StateSchemaKey,
  reducer: any,
  removeAfterUnmount?: boolean,
) => {
  const store = useStore() as ReduxStoreWithManager;
  const dispatch = useDispatch();

  useEffect(() => {
    store.reducerManager.add(name, reducer);
    dispatch({ type: `@INIT ${name} reducer` });

    return () => {
      if (removeAfterUnmount) {
        store.reducerManager.remove(name);
        dispatch({ type: `@DESTROY ${name} reducer` });
      }
    };
  }, [dispatch, store, name, reducer, removeAfterUnmount]);
};
