import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

// eslint-disable-next-line react/prop-types
const SliderCard = ({ text }) => {
  const {t} = useTranslation();
  const theme = useTheme();
  return (
    <Box
      sx={{
        [theme.breakpoints.up("sm")]: {
          position: "absolute",
          left: "10%",
          textAlign: "left",
        },

        [theme.breakpoints.down("sm")]: {
          pt: 4,
          pb: 6,
        },
      }}
    >
      <Typography
        sx={{
          color: "#222",
        }}
        variant="h5"
      >
        {t('LIFESTYLE COLLECTION')}
      </Typography>

      <Typography
        sx={{
          color: "#222",
          fontWeight: 500,
          my: 1,
        }}
        variant="h3"
      >
        {text}
      </Typography>

      <Stack
        sx={{
          justifyContent: { xs: "center", sm: "left" },
        }}
        direction={"row"}
        alignItems={"center"}
      >
        <Typography color={"#333"} mr={1} variant="h4">
          {t('SALE UP TO')}
        </Typography>
        <Typography color={"#D23F57"} variant="h4">
          30% {t('OFF')}
        </Typography>
      </Stack>

      <Typography
        sx={{
          color: "#000",
          fontWeight: 300,
          my: 1,
        }}
        variant="body1"
      >
        {t('Get Free Shipping on orders over')} $99.00
      </Typography>

      <Button
        sx={{
          px: 5,
          py: 1,
          mt: 2,
          backgroundColor: "#222",
          boxShadow: "0px 4px 16px rgba(43, 52, 69, 0.1) !important",
          color: "#fff",
          borderRadius: "1px",
          "&:hover": {
            bgcolor: "#151515",
            boxShadow: "10px 4px 16px rgba(43, 52, 69, 0.1) !important",
          },
        }}
        variant="contained"
      >
        {t('shop now')}
      </Button>
    </Box>
  );
};

export default React.memo(SliderCard);
