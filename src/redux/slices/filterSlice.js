import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPage: 1,
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

    setCurrentPage: (state, page) => {
      state.currentPage = page.payload;
    },
  },
});

export const { setCategoryId, setSortType, setCurrentPage } = filterSlice.actions;

export default filterSlice.reducer;
