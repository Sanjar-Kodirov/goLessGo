import { StateSchema } from '@/app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';

export const getSaveScrollPath = (state: StateSchema, path: string) =>
  state.saveScroll.scroll;

export const getSaveScrollByPath = createSelector(
  getSaveScrollPath,
  (state: StateSchema, path: string) => path,
  (scroll, path) => scroll[path] || 0,
);
