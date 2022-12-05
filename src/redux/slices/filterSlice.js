import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  arrayOfCategories: ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'],
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId: (state, index) => {
      state.categoryId = index.payload;
    },
  },
});

export const { setCategoryId } = filterSlice.actions;

export default filterSlice.reducer;
