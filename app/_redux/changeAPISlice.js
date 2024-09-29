import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  myData: "products",
  allProductAPI: "products",
  menCategoryAPI: "products/category/men's clothing",
  womenCategoryAPI: "products/category/women's clothing",
  jeweleryCategoryAPI: "products/category/jewelery",
  electronicCategoryAPI: "products/category/electronics",
  clickedProduct: {},
  openDialog: false,
  searchResults: [], // لتخزين نتائج البحث
  searchTerm: "", // النص المدخل في البحث
};
export const changeAPISlice = createSlice({
  initialState,
  name: "myDataAPI",
  reducers: {
    // dool al actions 2le bna5odhom export n8yr behom state
    changeAPI: (state, action) => {
      state.myData = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    addProductsSearch: (state, action) => {
      state.searchResults = action.payload.products;
    },
    setClickedProduct: (state, action) => {
      state.clickedProduct = action.payload;
    },
    setOpenDialog: (state, action) => {
      state.openDialog = action.payload;
    },
  },
});
// al slice feh gwah 7aga asmha reducer & action
export const { changeAPI, setSearchTerm, addProductsSearch, setClickedProduct , setOpenDialog} =
  changeAPISlice.actions;
// da reducer 2le hn7oto gwa configureStore
export default changeAPISlice.reducer;
