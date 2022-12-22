import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { CartItem } from './cartSlice';
import { Sort } from './filterSlice';

type Pizza = {
  key?: number;
  id?: string;
  title?: string;
  sizes?: number[];
  types?: number[];
  imageUrl?: string;
  count?: number;
  price?: number;
  searchValue?: string;
  currentPage?: number;
  categoryId?: number;
  sort: Sort;
};

interface PizzaSliceState {
  items: Pizza[];
  status: 'loading' | 'success' | 'error';
}

export const fetchPizza = createAsyncThunk('pizza/fetchPizzaStatus', async (params: Pizza) => {
  const { currentPage, categoryId, sort, searchValue } = params;
  const { data } = await axios.get(
    `https://6388f4cbd94a7e5040ab61cb.mockapi.io/items?page=${currentPage}&limit=4${
      categoryId ? `&category=${categoryId}` : ''
    }&sortBy=${sort.sortProperty}${sort.sortReach === 'increase' ? '&order=asc' : '&order=desc'}${
      searchValue ? `&search=${searchValue}` : ''
    }`,
  );

  return data;
});

const initialState: PizzaSliceState = {
  items: [],
  status: 'loading',
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Pizza[]>) => {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizza.pending, (state, action) => {
      state.status = 'loading';
      state.items = [];
    });

    builder.addCase(fetchPizza.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    });

    builder.addCase(fetchPizza.rejected, (state, action) => {
      state.status = 'error';
      state.items = [];
    });
  },
});

export const selectPizzas = (state: RootState) => state.pizzaReducer;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
