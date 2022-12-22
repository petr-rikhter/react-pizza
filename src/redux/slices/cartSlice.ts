import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type CartItem = {
  id: string;
  title: string;
  size: number;
  type: string;
  imageUrl: string;
  count: number;
  price: number;
};

interface CartSliceState {
  totalPizzas: number;
  totalPrice: number;
  items: CartItem[];
}

const initialState: CartSliceState = {
  totalPizzas: 0,
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
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

    removeItem: (state, action: PayloadAction<CartItem>) => {
      if (action.payload.count <= 1) {
        state.items = state.items.filter((item) => item.id !== action.payload.id);
      } else {
        const findItem = state.items.find((obj) => obj.id === action.payload.id);
        if (findItem) {
          findItem.count--;
        }
      }

      state.totalPizzas = state.items.reduce((acc, current) => current.count + acc, 0);

      state.totalPrice = state.items.reduce(
        (acc, current) => current.price * current.count + acc,
        0,
      );
    },

    removeOnePizza: (state, action: PayloadAction<CartItem>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);

      state.totalPizzas = state.items.reduce((acc, current) => current.count + acc, 0);

      state.totalPrice = state.items.reduce(
        (acc, current) => current.price * current.count + acc,
        0,
      );
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

export const selectCart = (state: RootState) => state.cartReducer;

export const { addItem, removeItem, clearItems, removeOnePizza } = cartSlice.actions;

export default cartSlice.reducer;
