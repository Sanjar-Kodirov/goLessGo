import { SaveScrollSchema } from '@/features/SaveScrool/models/types/SaveScrollTypes';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: SaveScrollSchema = {
  scroll: {},
};

const SaveScrollSlice = createSlice({
  name: 'saveScrool',
  initialState,
  reducers: {
    setScrollPosition: (
      state,
      { payload }: PayloadAction<{ path: string; position: number }>,
    ) => {
      state.scroll[payload.path] = payload.position;
    },
  },
});

export const { actions: saveScrollActions } = SaveScrollSlice;
export const { reducer: saveScrollReducer } = SaveScrollSlice;
