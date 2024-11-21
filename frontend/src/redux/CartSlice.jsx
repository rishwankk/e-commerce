import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartData: [],
  cartStatus: {},
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartData: (state, action) => {
      state.cartData = action.payload.items;
      state.totalPrice = action.payload.totalPrice;
    },
    setCartStatus: (state, action) => {
      state.cartStatus = action.payload;
    },
    addToCart: (state, action) => {
      const { productId, productData } = action.payload;

     
      if (!state.cartData) {
        state.cartData = []; 
      }

   
      const existingProductIndex = state.cartData.findIndex(
        (item) => item.productId === productId
      );

      if (existingProductIndex !== -1) {
     
        state.cartData[existingProductIndex].quantity += 1;
      } else {
      
        state.cartData.push({
          productId,
          ...productData,
          quantity: 1,
        });
      }

      state.cartStatus[productId] = true; 
      state.totalPrice += productData.offerPrice; 
    },
  },
});

export const { setCartData, setCartStatus, addToCart } = cartSlice.actions;
export default cartSlice.reducer;
