import { Close, ShoppingBagOutlined, ShoppingCart, Add, Remove  } from "@mui/icons-material";
import { Badge, Box, Button, Divider, Drawer, Fade, IconButton, Stack, Tooltip, Typography, styled, useTheme,} from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { decreaseQuantity, deleteProduct, increaseQuantity } from "../../_redux/cartSlice";
import Swal from "sweetalert2";
import "./headerC.css";
import Image from "next/image";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": { right: -3, top: 13, border: `2px solid ${theme.palette.background.paper}`, padding: "0 4px",},}));

const StyledBadge2 = styled(Badge)(({ theme }) => ({ "& .MuiBadge-badge": {backgroundColor: "inherit", fontSize: "18px",
  color: theme.palette.mode == "light" ? theme.palette.common.black : theme.palette.common.white,},}));

const CartButtonIcon = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const { selectedProducts } = useSelector((state) => state.cart);
  const {user} = useUser();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const [isHydrated, setIsHydrated] = useState(false); // To track hydration status
  const [cartSelected, setCartsSelected] = useState([]);
  // const [lengthCart, setLengthCart] = useState(0);

  // إضافة حالة isHydrated: للتحقق من أن العميل جاهز بعد الانتهاء من عملية الـ hydration (تحديث البيانات بعد تحميل الصفحة).
  useEffect(() => {
    setIsHydrated(true); // Set hydrated to true once client is ready
  }, []);
  
  useEffect(() => {
    if (user) {
      setCartsSelected(selectedProducts);
      // setLengthCart(selectedProducts.length);
    } else {
      setCartsSelected([]);
      // setLengthCart(0);
    }
  }, [selectedProducts, user]);

  const toggleDrawer = useCallback((open) => (event) => {
      if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) return;
      setDrawerOpen(open);
    },[]);
  
  const handleDeleteProduct = useCallback((item) => {
    Swal.fire({
      title: t("Are you sure?"),
      text: t("You won't be able to delete this!"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t("Yes, delete it!"),
      cancelButtonText: t("Cancel"),
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct({ product: item, username: user?.username }));
      }
    });
  }, [dispatch, t, user]);

  // Calculating cart details
  const lengthCart = useMemo(() => cartSelected?.length, [cartSelected]);
  const totalAmount = useMemo(() => {
    return cartSelected.reduce((acc, item) => acc + Number(item.price) * Number(item.quantity), 0);
  }, [cartSelected]);

  if (!isHydrated) {
    return null; // or you can return a loading spinner
  }

  return (
    <>
      <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title={t("Shopping Cart")}>
        <IconButton  aria-label="cart" onClick={toggleDrawer(true)}>
          <StyledBadge badgeContent={user ? lengthCart : null} color="primary">
            <ShoppingCart />
          </StyledBadge>
        </IconButton>
      </Tooltip>

      <Drawer anchor={"right"} open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box className='h-lvh flex flex-col sm:w-[300px] md:w-[400px]' role="presentation">
          <div className="flex p-2 items-center justify-between" >
            <Box className='flex items-center gap-2' sx={{ color: theme.palette.mode == "light" ? "rgb(15, 52, 96)" : theme.palette.info.main, }}>
              <ShoppingBagOutlined fontSize="large" sx={{ fontSize: { xs: 30, sm: "2.1875rem" } }} />
              <Typography sx={{ fontSize: { xs: 13, sm: 17 } }}> {lengthCart} {t("Item")}</Typography>
            </Box>

            <IconButton aria-label="delete" size="medium" onClick={toggleDrawer(false)}><Close fontSize={"medium"} /></IconButton>
          </div>

          <Divider light />

          <div className="flex-1 overflow-auto">
            {cartSelected.map((item) => {
              return (
                <Box key={item.id}>
                  <div className="flex w-full gap-3 items-center py-4 px-2" >
                    <div className="flex w-8 h-full items-center flex-col justify-between gap-5">
                      <IconButton size="small" sx={{ color: theme.palette.info.main,}}
                        onClick={() => {dispatch(increaseQuantity({product :item, username: user?.username}));}}>
                        <Add />
                      </IconButton>

                      <StyledBadge2 badgeContent={item.quantity} color="secondary" />

                      <IconButton  size="small" sx={{ color: theme.palette.info.main, }} disabled={item.quantity <= 1 && true}
                        onClick={() => {dispatch(decreaseQuantity({product: item, username: user?.username}));}}>
                        <Remove />
                      </IconButton>
                    </div>

                    <Box sx={{width: { xs: "86px", sm: "110px" },height: { xs: "86px", sm: "110px" },}}>
                      <Image width={350} height={300} alt="image product" className="size-full object-contain" src={item.image} loading="lazy" />
                    </Box>

                    <div className="flex flex-col w-40 flex-grow gap-4">
                      <Typography className="line-clamp-1" sx={{ color: theme.palette.mode == "light" ? theme.palette.common.black : theme.palette.common.white,
                          fontSize: { xs: 13, sm: 16 },}} >{item.title}</Typography>

                      <Typography sx={{ fontSize: { xs: 11, sm: 14 },
                          color: theme.palette.mode == "light" ? "rgb(125, 135, 156)" : theme.palette.text.secondary,}}>
                        ${item.price} X {item.quantity}</Typography>

                      <Typography sx={{ fontSize: { xs: 13, sm: 16 }, height: "100%", color: theme.palette.error.main,}}>
                        ${(Number(item.price) * Number(item.quantity)).toFixed(2)}</Typography>
                    </div>

                    <Box>
                      <IconButton aria-label="delete" size="medium" onClick={() => handleDeleteProduct(item)}>
                        <Close fontSize={"small"} />
                      </IconButton>
                    </Box>
                  </div>
                  <Divider light />
                </Box>
              );
            })}
          </div>

          <div className="flex flex-col items-center gap-4 mt-auto p-5">
            <Button variant="contained" className="w-full m-auto capitalize"
              sx={{ backgroundColor: theme.palette.mode == "light" && theme.palette.error.main,
                ":hover": { backgroundColor: theme.palette.mode == "light" && theme.palette.error.dark,},
              }}
              onClick={()=> {
                if(lengthCart){
                  toggleDrawer()(false);
                  router.push(`/checkout?amount=${totalAmount}`);
                }
              }}
            >
              {t("Checkout Now")} (${totalAmount.toFixed(2)})
            </Button>
            <Button className="w-full m-auto capitalize" variant="outlined" onClick={toggleDrawer(false)}
              sx={{
                border: theme.palette.mode == "light" && `1px solid ${theme.palette.error.light}`,
                color: theme.palette.mode == "light" && theme.palette.error.main,
                backgroundColor: theme.palette.mode == "light" && theme.palette.common.white,
                ":hover": {
                  backgroundColor: theme.palette.mode == "light" && "rgba(210, 63, 87, 0.04)",
                  border: theme.palette.mode == "light" && `1px solid ${theme.palette.error.dark}`,
                },
              }} >
              {t("View Cart")}
            </Button>
          </div>
        </Box>
      </Drawer>
    </>
  );
};

export default React.memo(CartButtonIcon);
