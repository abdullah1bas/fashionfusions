import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clickedProduct: {},
  openDialog: false,
  searchResults: [], // لتخزين نتائج البحث
  searchTerm: "", // النص المدخل في البحث
};
export const selectedProductSlice = createSlice({
  initialState,
  name: "selectedProduct",
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    addProductsSearch: (state, action) => {
      state.searchResults = action.payload.products;
    },
  },
});
// al slice feh gwah 7aga asmha reducer & action
export const { setSearchTerm, addProductsSearch} = selectedProductSlice.actions;
// da reducer 2le hn7oto gwa configureStore
export default selectedProductSlice.reducer;
