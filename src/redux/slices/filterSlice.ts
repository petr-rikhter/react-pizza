import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { CartItem } from './cartSlice';

export type Sort = {
  name: string;
  sortProperty: 'rating' | 'price' | 'title';
  sortReach: 'increase' | 'decrease';
};

export interface filterSliceState {
  searchValue: string;
  currentPage: number;
  categoryId: number;
  sort: Sort;
}

const initialState: filterSliceState = {
  searchValue: '',
  currentPage: 1,
  categoryId: 0,
  sort: {
    name: 'популярности(возр.)',
    sortProperty: 'rating',
    sortReach: 'increase',
  },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId: (state, index: PayloadAction<number>) => {
      state.categoryId = index.payload;
    },

    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },

    setSortType: (state, categoty: PayloadAction<Sort>) => {
      state.sort = categoty.payload;
    },

    setCurrentPage: (state, page: PayloadAction<number>) => {
      state.currentPage = page.payload;
    },

    setFilters: (state, filters: PayloadAction<filterSliceState>) => {
      if (Object.keys(filters.payload).length) {
        console.log(filters.payload);
        state.currentPage = Number(filters.payload.currentPage);
        state.categoryId = Number(filters.payload.categoryId);
        state.sort = filters.payload.sort;
      } else {
        state.currentPage = 1;
        state.categoryId = 0;
        state.sort = {
          name: 'популярности(возр.)',
          sortProperty: 'rating',
          sortReach: 'increase',
        };
      }
    },
  },
});

export const selectFilter = (state: RootState) => state.filterReducer;

export const { setCategoryId, setSortType, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
