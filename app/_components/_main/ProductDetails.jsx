import { Box, Typography, useTheme ,Badge, Button, IconButton, styled} from "@mui/material";
import { Add, Remove, ShoppingCart } from "@mui/icons-material";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { addToCart, decreaseQuantity, increaseQuantity,} from "../../_redux/cartSlice";
// import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {},
}));

const ProductDetails = ({ clickedProduct }) => {
  const [cartsSelectedId , setCartsSelectedId] = useState([]);
  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  // const {user} = useUser();
  const router = useRouter();

  const { selectedProducts, selectedProductsID } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    setCartsSelectedId(selectedProductsID)
  },[selectedProductsID]);

  const productQuantity = useCallback((clickProduct) => {
      const myProduct = selectedProducts.find((itemUser) => itemUser.id === clickProduct.id);
      return myProduct?.quantity;
    }, [selectedProducts]);
  return (
    <Box className="flex items-center gap-5 flex-col sm:flex-row h-[400px]">
      <Box sx={{ display: "flex", height: "100%",  width: "40%",  [theme.breakpoints.down("sm")]: { width: "100%", }, }}>
        <Image loading="lazy" width={350} height={300} style={{width: "100%"}} src={clickedProduct.image} alt={clickedProduct.title} />
      </Box>

      <Box className="py-4 flex-1 text-center sm:text-left w-full md:w-3/5" >
        <Typography variant="body1" sx={{ textTransform: "capitalize !important" }}>
          {clickedProduct.title}
        </Typography>
        <Typography my={0.4} fontSize={"22px"} color={"crimson"} variant="h6"> ${clickedProduct.price} </Typography>
        <Typography variant="body1" px={"4px"} sx={{ px: "4px", my: 3, maxHeight: "200px", overflow: "auto" }}>
          {clickedProduct.description}
        </Typography>

        {cartsSelectedId.includes(clickedProduct.id) ? (
          <div className="flex gap-4 items-center justify-center sm:justify-start">
            <IconButton
              color="primary"
              onClick={() => {
                productQuantity(clickedProduct) <= 1
                  ? Swal.fire({
                      title: t("Are you sure?"),
                      text: `${t("You won't Delete")} ${
                        clickedProduct.productTitle
                      }!`,
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: t(`Yes, delete it!`),
                      cancelButtonText: t("Cancel"),
                    }).then((result) => {
                      if (result.isConfirmed) {
                        dispatch(decreaseQuantity({product: clickedProduct}));
                      }
                    })
                  : dispatch(decreaseQuantity({product: clickedProduct}));
              }}
            >
              <Remove fontSize="small" />
            </IconButton>

            <StyledBadge badgeContent={productQuantity(clickedProduct)} color="primary" />

            <IconButton color="primary" onClick={() => { dispatch(increaseQuantity({product: clickedProduct}));}}>
              <Add fontSize="small" />
            </IconButton>
          </div>
        ) : (
          <Button sx={{ textTransform: "capitalize", p: 1, lineHeight: 1.1 }}
            variant="contained" color="primary" aria-hidden="false"
            onClick={() => {
              Swal.fire({
                title: t("Are you sure?"),
                text: t("You won't be able to Buy this!"),
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: t("Yes, Buy it!"),
                cancelButtonText: t("Cancel"),
              }).then((result) => {
                if (result.isConfirmed) {
                  dispatch(addToCart({product: clickedProduct}));
                }
              });
            }}>
            <ShoppingCart sx={{ fontSize: "18px", mr: 1 }} /> {t("Add to cart")}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ProductDetails;
