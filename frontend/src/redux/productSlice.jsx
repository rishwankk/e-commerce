import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allProducts: [],
  filteredProducts: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.allProducts = action.payload;
      state.filteredProducts = action.payload; // Initially, both are the same
    },
    filterProducts: (state, action) => {
      const { minPrice, maxPrice } = action.payload;
      state.filteredProducts = state.allProducts.filter(
        (product) => product.offerPrice >= minPrice && product.offerPrice <= maxPrice
      );
    },
    resetFilters: (state) => {
      state.filteredProducts = state.allProducts; // Reset to original list
    },
  },
});

export const { setProducts, filterProducts, resetFilters } = productsSlice.actions;
export default productsSlice.reducer;
