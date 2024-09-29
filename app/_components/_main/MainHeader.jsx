/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { Box, Stack, Typography, useMediaQuery, useTheme, ToggleButton , ToggleButtonGroup} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector , useDispatch} from "react-redux";
import { useCallback } from "react";
import { changeAPI } from "../../_redux/changeAPISlice";

const MainHeader = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleAlignment = useCallback((event, newValue) => {
    if (newValue !== null) {
      dispatch(changeAPI(newValue));
    }
  },[]);

  // @ts-ignore
  const state = useSelector(state => state.dataAPI)
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={{ xs: "center", sm: "space-between" }}
      flexWrap={"wrap"}
      gap={3}
    >
      <Box>
        <Typography variant="h6">{t("Selected Products")}</Typography>
        <Typography fontWeight={300} variant="body1">
          {t("All our new arrivals in a exclusive brand selection")}
        </Typography>
      </Box>

      <ToggleButtonGroup
        color="error"
        // da al value bta3 al parent we lma value child === y7ot 3la al value select
        value={t(state.myData)}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
        sx={{
          ".Mui-selected": {
            border: "1px solid rgba(233, 69, 96, 0.5) !important",
            color: "#e94560",
            backgroundColor: "initial",
          },
        }}
      >
        {[
          { aria: "left aligned", name: "All Products", value: state.allProductAPI },
          { aria: "centered", name: "Men Category", value: state.menCategoryAPI },
          {
            aria: "right aligned",
            name: "Women Category",
            value: state.womenCategoryAPI,
          },
          {
            aria: "right aligned",
            name: "Jewelery Category",
            value: state.jeweleryCategoryAPI,
          },
          {
            aria: "right aligned",
            name: "Electronics Category",
            value: state.electronicCategoryAPI,
          },
        ].map((item) => {
          return (
            <ToggleButton
              key={t(item.name)}
              sx={{
                mr:
                  t(item.name) != "Electronics Category"
                    ? { xs: "10px !important", sm: "16px !important" }
                    : null,
                color: theme.palette.text.primary,
                border: `1px solid ${theme.palette.divider} !important`,
                textTransform: "capitalize",
                fontSize: "0.875rem",
                px: { xs: "10px !important", sm: "11px !important" },
              }}
              className="myButton"
              value={item.value}
              aria-label={item.aria}
            >
              {useMediaQuery("(min-width:500px)") && t(item.name)}
              {useMediaQuery("(max-width:500px)") && t(item.name.split(" ")[0])}
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
    </Stack>
  );
};

export default MainHeader;
