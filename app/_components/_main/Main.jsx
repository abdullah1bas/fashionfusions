import { Box, CircularProgress, Container, Dialog, IconButton, Typography, useTheme,} from "@mui/material";
import React, { useState } from "react";
import { Close } from "@mui/icons-material";
import ProductDetails from "./ProductDetails";
import MainHeader from "./MainHeader";
import MainProducts from "./MainProducts";
import { useLoadProducts } from "./useLoadProducts";
import { useTranslation } from "react-i18next";

const Main = ({ IsSearch }) => {
  const {t} = useTranslation();
  const [clickedProduct, setClickedProduct] = useState({});
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const { filteredProducts, error, isLoading, searchTerm } = useLoadProducts();


  if (isLoading) {
    return (
      <Box sx={{ py: 11, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  } else if (error) {
    return (
      <Container
        sx={{
          py: 11,
          textAlign: "center",
        }}
      >
        <Typography variant="h6">{error.error}</Typography>

        <Typography variant="h6">Please try again later</Typography>
      </Container>
    );
  } else {
    return (
      <Container sx={{ py: 9 }}>
        {!IsSearch ? (  <MainHeader />
        ) : (<div className="mt-4 ml-4"><h1 className="">{t("Searching for")} “{searchTerm}”</h1><h3>{filteredProducts?.length} {t("results found")}</h3></div>)}

        <MainProducts {...{ filteredProducts, setClickedProduct, setOpen }} />

        <Dialog sx={{".MuiPaper-root": { minWidth: { xs: "100%", md: 900 }, [theme.breakpoints.down("sm")]: { height: "60%" },},}}
          open={open}
          onClose={() => setOpen(!open)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <IconButton sx={{":hover": { color: "red", rotate: "180deg", transition: "0.3s" }, position: "absolute", top: 0, right: 10,}}
            onClick={() => setOpen(!open)}>
            <Close />
          </IconButton>

          <ProductDetails {...{ clickedProduct }} />
        </Dialog>
      </Container>
    );
  }
};

export default React.memo(Main);
