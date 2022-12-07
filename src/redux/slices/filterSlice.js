import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  sortType: {
    name: 'популярности(возр.)',
    sortProperty: 'rating',
    sortReach: 'increase',
  },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId: (state, index) => {
      state.categoryId = index.payload;
    },

    setSortType: (state, categoty) => {
      state.sortType = categoty.payload;
    },
  },
});

export const { setCategoryId, setSortType } = filterSlice.actions;

export default filterSlice.reducer;
