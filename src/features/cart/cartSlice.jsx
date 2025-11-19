import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      // const item = state.cart.filter((item) => {
      //   return action.payload.pizzaId === item.pizzaId;
      // });
      // item.length > 0
      //   ? (item[0].quantity += 1)
      //   : state.cart.push(action.payload);
      state.cart.push(action.payload);
    },
    increaseItem(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.unitPrice * item.quantity;
    },
    decreaseItem(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.unitPrice * item.quantity;

      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    deleteItem(state, action) {
      // const item = state.cart.filter((item) => item.pizzaId === action.payload);
      // item[0].quantity > 1
      //   ? (item[0].quantity -= 1)
      //   : (state.cart = state.cart.filter(
      //       (item) => item.pizzaId !== action.payload,
      //     ));
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const { addItem, increaseItem, decreaseItem, deleteItem, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

export const getTotalQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);
export const getTotalPrice = (state) =>
  state.cart.cart.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0,
  );
export const getCart = (state) => state.cart.cart;

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
