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

    setFilters: (state, filters) => {
      state.currentPage = Number(filters.payload.currentPage);
      state.categoryId = Number(filters.payload.categoryId);
      state.sort = filters.payload.sort;
    },
  },
});

export const { setCategoryId, setSortType, setCurrentPage, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
