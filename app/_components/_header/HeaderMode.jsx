import { Box, Container, Stack, Typography } from "@mui/material";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import {Fade,IconButton,List,ListItem,ListItemText,Menu,MenuItem,Tooltip, useTheme, Zoom,} from "@mui/material";
import { DarkModeOutlined, ExpandMore, Facebook, Instagram, LightModeOutlined, Twitter } from "@mui/icons-material";
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import { ColorModeContext } from "../../_style/theme";

const socialIcons = [
  {
    title: "Twitter",
    iconButton: <Twitter sx={{ fontSize: "16px", color: "#fff" }} />,
    iconUrl: "https://www.twitter.com/",
  },
  {
    title: "Facebook",
    iconButton: <Facebook sx={{ fontSize: "16px", color: "#fff" }} />,
    iconUrl: "https://www.facebook.com/",
  },
  {
    title: "Instagram",
    iconButton: <Instagram sx={{ fontSize: "16px", color: "#fff" }} />,
    iconUrl: "https://www.instagram.com/",
  },
]

const HeaderMode = () => {
  const { t } = useTranslation();
  const options = [t("EN"), t("FR"), t("AR"), t("CHI"), t("RUS")];
  const colorMode = useContext(ColorModeContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const theme = useTheme();
  const open = Boolean(anchorEl);

  const changeLanguage = useCallback((lang, langCode) => {
    i18n.changeLanguage(lang);
    document.documentElement.lang = langCode;
    localStorage.setItem("langaugeSite", lang);
  }, []);

  const handleMenuItemClick = (index, option) => {
      setSelectedIndex(index);
      setAnchorEl(null);
      const langMap = {
        [t('EN')]: { lang: 'EN', code: 'en' },
        [t('FR')]: { lang: 'FR', code: 'fr' },
        [t('AR')]: { lang: 'AR', code: 'ar' },
        [t('CHI')]: { lang: 'CHI', code: 'zh' },
        [t('RUS')]: { lang: 'RUS', code: 'ru' },
      };
  
      const { lang, code } = langMap[option];
      changeLanguage(lang, code);
    };

  
  const toggleMode = () => {
    const newMode = theme.palette.mode === "dark" ? "light" : "dark";
    localStorage.setItem("mode", newMode);

    document.body.classList.toggle("dark", newMode === "dark");

    colorMode.toggleColorMode();
  };

  const shouldLog = useRef(true);
  useEffect(() => {
    // if shouldLog == because clean up effect
    if (shouldLog.current && typeof window !== 'undefined') {
      shouldLog.current = false;
      const storedLang = localStorage.getItem("langaugeSite");
      if (storedLang) {
        i18n.use(initReactI18next).init({fallbackLng: storedLang,});
        document.documentElement.lang = storedLang.toLowerCase();
        setSelectedIndex(options.indexOf(storedLang));
      }
    }
  }, [options]);

  return (
    <Box className='bg-[#2B3445] py-1 rounded-br rounded-bl'>
      <Container>
        <Stack direction={"row"} alignItems={"center"}>
          <Typography className="mr-2 py-1 px-3 bg-red-500 rounded-xl text-xs bold text-white" variant="body2">
          {t('HOT')}
          </Typography>

          <Typography className="text-xs text-white font-light" variant="body2">
            {t('Free Express Shipping')}
          </Typography>

          <Box flexGrow={1} />

          <div>
            {theme.palette.mode === "light" ? (
              <Tooltip TransitionComponent={Zoom} title={t('Light Mode')}>
                <IconButton onClick={toggleMode} color="inherit">
                  <LightModeOutlined sx={{ fontSize: "16px", color: "#fff" }} />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip TransitionComponent={Zoom} title={t('Dark Mode')}>
                <IconButton onClick={toggleMode} color="inherit" >
                  <DarkModeOutlined sx={{ fontSize: "16px" }} />
                </IconButton>
              </Tooltip>
            )}
          </div>

          <div>
            <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title={t("Transilation Lang")}>
              <List component="nav" aria-label="Device settings" sx={{ p: 0, m: 0 }}>
                <ListItem id="lock-button" aria-haspopup="listbox" aria-hidden='undefined'
                  aria-controls="lock-menu" aria-label="when device is locked" aria-expanded={open ? "true" : undefined}
                  onClick={(e)=> setAnchorEl(e.currentTarget)}
                  sx={{ "&:hover": { cursor: "pointer" }, px: 1 }}
                >
                  <ListItemText secondary={options[selectedIndex]}
                    sx={{ ".MuiTypography-root": { fontSize: "11px", color: "#fff" },}}/>
                  <ExpandMore sx={{ fontSize: "16px", color: "#fff" }} />
                </ListItem>
              </List>
            </Tooltip>

            <Menu id="lock-menu" anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}
              MenuListProps={{ "aria-labelledby": "lock-button", role: "listbox",}}>
              {options.map((option, index) => (
                <MenuItem
                  sx={{ fontSize: "11px", p: "3px 10px", minHeight: "10px" }}
                  key={index}
                  selected={index === selectedIndex}
                  onClick={() => {handleMenuItemClick(index, option);}}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </div>

          {socialIcons.map((button) => (
            <Tooltip
              key={button.title}
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
              title={t(button.title)}
            >
              <IconButton href={button.iconUrl}>{button.iconButton}</IconButton>
            </Tooltip>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default HeaderMode;
