import { Add, Remove, ShoppingCart } from "@mui/icons-material";
import { Badge, Button, IconButton, Stack, styled } from "@mui/material";
import Swal from "sweetalert2";
import "./Main.css";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
} from "../../_redux/cartSlice";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {},
}));

const AddToCartButton = ({ clickedProduct }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {user} = useUser();
  const router = useRouter();

  const { selectedProducts, selectedProductsID } = useSelector(
    (state) => state.cart
  );

  const [cartsSelectedId , setCartsSelectedId] = useState([]);
  useEffect(() => {
    !user ? setCartsSelectedId([]) : setCartsSelectedId(selectedProductsID)
  },[selectedProductsID]);

  const productQuantity = useCallback(
    (clickProduct) => {
      const myProduct = selectedProducts.find((itemUser) => {
        return itemUser.id === clickProduct.id;
      });
      return myProduct.quantity;
    },
    [selectedProducts]
  );
  // console.log(clickedProduct);
  return (
    <>
      {cartsSelectedId.includes(clickedProduct.id) ? (
        <Stack
          direction={"row"}
          gap={2}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: { xs: "center", sm: "start" },
          }}
        >
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
                      dispatch(decreaseQuantity({product: clickedProduct, username: user?.username}));
                    }
                  })
                : dispatch(decreaseQuantity({product: clickedProduct, username: user?.username}));
            }}
          >
            <Remove fontSize="small" />
          </IconButton>

          <StyledBadge
            badgeContent={productQuantity(clickedProduct)}
            color="primary"
          />

          <IconButton 
            color="primary"
            onClick={() => {
              dispatch(increaseQuantity({product: clickedProduct, username: user?.username}));
            }}
          >
            <Add fontSize="small" />
          </IconButton>
        </Stack>
      ) : (
        <Button
          sx={{ textTransform: "capitalize", p: 1, lineHeight: 1.1 }}
          variant="contained"
          color="primary"
          aria-hidden="true"
          onClick={() => {
            if(!user) {
              router.push('/sign-in');
            } else {
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
                  dispatch(addToCart({product: clickedProduct, username: user?.username}));
                }
              });
            }
          }}
        >
          <ShoppingCart sx={{ fontSize: "18px", mr: 1 }} /> {t("Add to cart")}
        </Button>
      )}
    </>
  );
};

export default AddToCartButton;
