import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductsByNameQuery } from "../../_redux/product";
import { addProductsSearch } from "../../_redux/selectedProductSlice"; 

export const useLoadProducts = () => {
  const dispatch = useDispatch();
  const myData = useSelector((state) => state.dataAPI.myData);

  const { data: products, isSuccess, error, isLoading,} = useGetProductsByNameQuery(myData);

  const searchTerm = useSelector((state) => state.selectedProduct.searchTerm); 
  
  const filteredProducts = products?.filter(product => 
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  const shouldLog= useRef(true);
  useEffect(() => {
    // clean up
    if(shouldLog.current){
      shouldLog.current = false;
      if (isSuccess && products) {
        dispatch(addProductsSearch({ filteredProducts }));
      }
    }
  }, [isSuccess, products, dispatch, searchTerm]);
  return { filteredProducts, error, isLoading, searchTerm };
};
