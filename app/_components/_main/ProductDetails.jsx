import { Box, Typography, useTheme } from "@mui/material";
import AddToCartButton from "./AddToCartButton";

const ProductDetails = ({ clickedProduct }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2.5,
        flexDirection: "row",
        [theme.breakpoints.down("sm")]: {
          flexDirection: "column",
        },
        height: "400px",
      }}
    >
      <Box sx={{ display: "flex", height: "100%",
        width: "40%",
        [theme.breakpoints.down("sm")]: {
          width: "100%",
        },
       }}>
        <img
          style={{width: "100%"}}
          src={clickedProduct.image}
          alt={clickedProduct.title}
        />
      </Box>

      <Box
        sx={{
          py: 2,
          flex: 1,
          textAlign: { xs: "center", sm: "left" },
          [theme.breakpoints.down("md")]: {
            width: "100%",
          },
          width: "60%",
        }}
      >
        <Typography
          variant="body1"
          sx={{ textTransform: "capitalize !important" }}
        >
          {clickedProduct.title}
        </Typography>
        <Typography my={0.4} fontSize={"22px"} color={"crimson"} variant="h6">
          ${clickedProduct.price}
        </Typography>
        <Typography
          variant="body1"
          px={"4px"}
          sx={{ px: "4px", maxHeight: "200px", overflow: "auto" }}
        >
          {clickedProduct.description}
        </Typography>

        <AddToCartButton clickedProduct={clickedProduct} />
      </Box>
    </Box>
  );
};

export default ProductDetails;
