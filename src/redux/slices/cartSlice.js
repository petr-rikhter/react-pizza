import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPizzas: 0,
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPizzas = state.items.reduce((acc, current) => current.count + acc, 0);

      state.totalPrice = state.items.reduce(
        (acc, current) => current.price * current.count + acc,
        0,
      );
    },

    removeItem: (state, action) => {
      if (action.payload.count <= 1) {
        state.items = state.items.filter((item) => item.id !== action.payload.id);
      } else {
        const findItem = state.items.find((obj) => obj.id === action.payload.id);

        findItem.count--;
      }

      state.totalPizzas = state.items.reduce((acc, current) => current.count + acc, 0);

      state.totalPrice = state.items.reduce(
        (acc, current) => current.price * current.count + acc,
        0,
      );
    },

    removeOnePizza: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },

    clearItems: (state) => {
      state.items = [];

      state.totalPizzas = state.items.reduce((acc, current) => current.count + acc, 0);

      state.totalPrice = state.items.reduce(
        (acc, current) => current.price * current.count + acc,
        0,
      );
    },
  },
});

export const selectCart = (state) => state.cartReducer;

export const { addItem, removeItem, clearItems, removeOnePizza } = cartSlice.actions;

export default cartSlice.reducer;
