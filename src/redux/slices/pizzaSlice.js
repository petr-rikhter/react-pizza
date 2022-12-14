import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizza = createAsyncThunk('pizza/fetchPizzaStatus', async (params) => {
  const { currentPage, categoryId, sortType, searchValue } = params;
  const { data } = await axios.get(
    `https://6388f4cbd94a7e5040ab61cb.mockapi.io/items?page=${currentPage}&limit=4${
      categoryId ? `&category=${categoryId}` : ''
    }&sortBy=${sortType.sortProperty}${
      sortType.sortReach === 'increase' ? '&order=asc' : '&order=desc'
    }${searchValue ? `&search=${searchValue}` : ''}`,
  );
  return data;
});

const initialState = {
  items: [],
  status: 'loading',
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },

  extraReducers: {
    [fetchPizza.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizza.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPizza.rejected]: (state, action) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

export const selectPizzas = (state) => state.pizzaReducer;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
