import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  myData: "products",
  allProductAPI: "products",
  menCategoryAPI: "products/category/men's clothing",
  womenCategoryAPI: "products/category/women's clothing",
  jeweleryCategoryAPI: "products/category/jewelery",
  electronicCategoryAPI: "products/category/electronics",
};
export const changeAPISlice = createSlice({
  initialState,
  name: "myDataAPI",
  reducers: {
    // dool al actions 2le bna5odhom export n8yr behom state
    changeAPI: (state, action) => {state.myData = action.payload;},
  },
});
// al slice feh gwah 7aga asmha reducer & action
export const { changeAPI } = changeAPISlice.actions;
// da reducer 2le hn7oto gwa configureStore
export default changeAPISlice.reducer;
