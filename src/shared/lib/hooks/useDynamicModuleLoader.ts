import { useDispatch, useStore } from 'react-redux';

import { useEffect } from 'react';

import {
  ReduxStoreWithManager,
  StateSchemaKey,
} from '@/app/providers/StoreProvider/config/StateSchema';
import { Reducer } from '@reduxjs/toolkit';

export type ReducersList = {
  [name in StateSchemaKey]?: Reducer;
};

export const useDynamicModuleLoader = (
  name: StateSchemaKey,
  reducer?: Reducer,
  removeAfterUnmount?: boolean,
  reducers?: ReducersList,
) => {
  const store = useStore() as ReduxStoreWithManager;
  const dispatch = useDispatch();

  // useEffect(() => {
  //   store.reducerManager.add(name, reducer);
  //   dispatch({ type: `@INIT ${name} reducer` });

  //   return () => {
  //     if (removeAfterUnmount) {
  //       store.reducerManager.remove(name);
  //       dispatch({ type: `@DESTROY ${name} reducer` });
  //     }
  //   };
  // }, [dispatch, store, name, reducer, removeAfterUnmount]);

  useEffect(() => {
    const mountedReducers = store.reducerManager.getReducerMap();

    if (!reducers || Object.keys(reducers).length === 0) {
      if (reducer) {
        store.reducerManager.add(name, reducer);
        dispatch({ type: `@INIT ${name} reducer` });
      }

      return () => {
        if (removeAfterUnmount) {
          store.reducerManager.remove(name);
          dispatch({ type: `@DESTROY ${name} reducer` });
        }
      };
    }

    Object.entries(reducers).forEach(([name, reducer]) => {
      const mounted = mountedReducers[name as StateSchemaKey];
      // Add new reducer only if it doesn't exist
      if (!mounted) {
        store.reducerManager.add(name as StateSchemaKey, reducer);
        dispatch({ type: `@INIT ${name} reducer` });
      }
    });

    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(([name, reducer]) => {
          store.reducerManager.remove(name as StateSchemaKey);
          dispatch({ type: `@DESTROY ${name} reducer` });
        });
      }
    };
  }, [dispatch, store, reducers, removeAfterUnmount]);
};
