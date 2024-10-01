import { Box, Container, Divider, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { ElectricBolt, CreditScoreOutlined, WorkspacePremiumOutlined, AccessAlarmOutlined} from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const IconSection = () => {
  const theme = useTheme();
  return (
    <Container
      sx={{ mt: 3, bgcolor: theme.palette.mode === "dark" ? "#000" : "#fff" }}
    >
      <Stack sx={{ flexWrap: "wrap" }} direction={"row"} alignItems={"center"}>
        <MyBox
          icon={<ElectricBolt fontSize="large" />}
          title={"Fast Delivery"}
          subTitle={"Start from $10"}
        />
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            [theme.breakpoints.down("sm")]: {
              display: "none",
            },
          }}
        />
        <MyBox
          icon={<WorkspacePremiumOutlined fontSize="large" />}
          title={"Money Guarantee"}
          subTitle={"7 Days Back"}
        />
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            [theme.breakpoints.down("md")]: {
              display: "none",
            },
          }}
        />
        <MyBox
          icon={<AccessAlarmOutlined fontSize="large" />}
          title={"365 Days"}
          subTitle={"For free return"}
        />
        {useMediaQuery("(min-width:1097px)") ? (
          <Divider orientation="vertical" flexItem />
        ) : null}

        <MyBox
          icon={<CreditScoreOutlined fontSize="large" />}
          title={"Payment"}
          subTitle={"Secure system"}
        />
      </Stack>
    </Container>
  );
};

export default IconSection;

// eslint-disable-next-line react/prop-types
const MyBox = ({ icon, title, subTitle }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: 250,
        display: "flex",
        flexGrow: 1,
        alignItems: "center",
        gap: 3,
        py: 1.6,
        justifyContent: useMediaQuery("(min-width:600px)") ? "center" : "left",
      }}
    >
      {icon}

      <Box>
        <Typography variant="body1">{t(title)}</Typography>
        <Typography
          sx={{ fontWeight: 300, color: theme.palette.text.secondary }}
          variant="body1"
        >
          {t(subTitle)}
        </Typography>
      </Box>
    </Box>
  );
};
