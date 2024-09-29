import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Link, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

// eslint-disable-next-line react/prop-types
const SmSliderCard = ({ title, Class, price, img }) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ position: "relative" }}>
      <img width={"100%"} src={img} alt="" />

      <Stack
        sx={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          left: 31,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: "#2B3445",
            fontSize: "18px",
          }}
        >
          {t(title)}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "#2B3445",
            lineHeight: "16px",
            mt: 1,
          }}
        >
          {t(Class)}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "#2B3445",
          }}
        >
          {t(price)}
        </Typography>

        <Link
          sx={{
            color: "#2B3445",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            transition: "0.2s",
            position: "relative",
            cursor: 'pointer',
            "&:hover": {
              color: "#D23F57",
            },
            "&:hover:before": {
              width:
                t("shop now") == "Achetez maintenant"
                  ? "165px"
                  : t("shop now") == "تسوق الآن"
                  ? "70px"
                  : "90px",
            },
            "&:hover .icon-arrow": {
              animationPlayState: "running",
            },
          }}
          className="link-shop"
          underline="none"
        >
          {t("shop now")}
          <ArrowForwardIcon
            className="icon-arrow"
            sx={{
              fontSize: "13px",
              position: "relative",
              left: "-3px",
              top: "1px",
              transition: ".3s",
              animation: "ani-arrow 1s ease-in-out infinite",
              animationPlayState: "paused",
            }}
          />
        </Link>
      </Stack>
    </Box>
  );
};

export default SmSliderCard;
