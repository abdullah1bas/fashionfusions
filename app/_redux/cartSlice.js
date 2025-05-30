import { createSlice } from "@reduxjs/toolkit";

const loadFromLocalStorage = (key) => {
  if (typeof window !== "undefined") {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : [];
  }
  return [];
};

// use "useSelector" to get the array
const initialState = {
  selectedProducts: loadFromLocalStorage("selectedProducts"),
  selectedProductsID: loadFromLocalStorage("selectedProductsID"),
};

export const counterSlice = createSlice({
  name: "cart",
  initialState,
  // action.payload => product From API => القيمة التى بداخل الاقواس
  reducers: {
    addToCart: (state, action) => {
      const { product} = action.payload;
      // action.payload => product From API => القيمة التى بداخل الاقواس
      const productWithQuantity = {...product, quantity: 1};
      state.selectedProducts.push(productWithQuantity);
      state.selectedProductsID.push(product.id);

      setLocal("selectedProductsID", JSON.stringify(state.selectedProductsID));
      setLocal("selectedProducts", JSON.stringify(state.selectedProducts));
    },

    increaseQuantity: (state, action) => {
      const { product} = action.payload;
      // action.payload => product From user, we dh b2a obj selected
      state.selectedProducts.find((item) => {
        item.id === product.id ? (item.quantity += 1) : null;
      });
      setLocal("selectedProducts", JSON.stringify(state.selectedProducts));
    },

    decreaseQuantity: (state, action) => {
      const {product} = action.payload;
      // action.payload => product From user
      const decreaseProduct = state.selectedProducts.find((item) => {
        return item.id === product.id;
      });

      decreaseProduct.quantity -= 1;
      if (decreaseProduct.quantity === 0) {
        // delete the selected product
        const newArr = state.selectedProducts.filter((item) => {
          return item.id !== product.id;
        });

        const newArr2 = state.selectedProductsID.filter((item) => {
          return item !== product.id;
        });

        state.selectedProducts = newArr;
        state.selectedProductsID = newArr2;

        setLocal("selectedProductsID", JSON.stringify(state.selectedProductsID))
      }
      
      setLocal("selectedProducts", JSON.stringify(state.selectedProducts));
    },

    deleteProduct: (state, action) => {
      const { product } = action.payload;
      // delete the selected product
      const newArr = state.selectedProducts.filter((item) => {
        return item.id !== product.id;
      });

      const newArr2 = state.selectedProductsID.filter((item) => {
        return item !== product.id;
      });

      state.selectedProducts = newArr;
      state.selectedProductsID = newArr2;

      setLocal("selectedProductsID", JSON.stringify(state.selectedProductsID));
      setLocal("selectedProducts", JSON.stringify(state.selectedProducts));
    },

    deleteAllProducts: (state, action) => {

      state.selectedProducts = [];
      state.selectedProductsID = [];

      setLocal("selectedProductsID", JSON.stringify(state.selectedProductsID));
      setLocal("selectedProducts", JSON.stringify(state.selectedProducts));
    },
  },
});

//  دائماً هتنساهااااااااااااااااااااااااااااااااااااااع
export const { deleteProduct, addToCart, increaseQuantity, decreaseQuantity, deleteAllProducts,} = counterSlice.actions;

export default counterSlice.reducer;

function setLocal(key, value) {
  localStorage.setItem(key, value);
}
