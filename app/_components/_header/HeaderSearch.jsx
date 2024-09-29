"use client";
import { Login, PersonOutlined, ShoppingCartOutlined,} from "@mui/icons-material";
import { Container, Fade, IconButton, Stack, Tooltip, Typography, useMediaQuery,} from "@mui/material";
import { useTranslation } from "react-i18next";
import CartButtonIcon from "./_headerC/CartButtonIcon";
import { useRouter } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import changeClerk from "../changeClerk";
import { changeAPI, setSearchTerm } from "../../_redux/changeAPISlice";
import SearchIcon from "@mui/icons-material/Search";
import {useCallback, useState } from "react";
import { InputBase, styled, useTheme , List, ListItem, ListItemText, MenuItem, Menu } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";

const Search = styled("div")(({ theme }) => ({
  flexGrow: 0.4,
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  border: "1px solid #777",
  "&:hover": {
    border: "1px solid #c34444",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "220px",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "330px",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const options = ["All Categories", "Men", "Women", "Electronics", "Jewelery"];

const loginIcon = [{ title: "Sign In", url: "/sign-in", icon: <PersonOutlined /> }, { title: "Sign Up", url: "/sign-up", icon: <Login /> },];

const HeaderSearch = () => {
  const { t, i18n } = useTranslation();
  const { user } = useUser();
  const router = useRouter();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchProduct, setSearchProduct] = useState('');
  const theme = useTheme();
  const state = useSelector(state => state.dataAPI)
  const open = Boolean(anchorEl);
  const isDesktop = useMediaQuery('(min-width:500px)');


  const handleMenuItemClick = useCallback((index) => {
    setSelectedIndex(index);
    setAnchorEl(null);

    const categoryMap = {
      Men: state.menCategoryAPI,
      Women: state.womenCategoryAPI,
      Electronics: state.electronicCategoryAPI,
      Jewelery: state.jeweleryCategoryAPI,
      'All Categories': state.allProductAPI,
    };

    dispatch(changeAPI(categoryMap[options[index]]));
  }, [dispatch, state]);
  
  const handleClickedSearch = () => {
    if (searchProduct !== '') {
      dispatch(setSearchTerm(searchProduct));
      router.push(`/search/${searchProduct}`);
    }
  };
  changeClerk(".cl-internal-16vtwdp");
  changeClerk(".cl-internal-lk7758");
  return (
    <Container className="my-5 flex justify-between">
      <Stack className="items-center cursor-pointer"  onClick={() => { dispatch(setSearchTerm("")); router.push("/");}}>
        <ShoppingCartOutlined />
        <Typography variant="body2">{t("E-commerce")}</Typography>
      </Stack>

      {isDesktop && 
      (
        <Search className="flex rounded-3xl justify-between">
          <IconButton onClick={handleClickedSearch} className="ml-1">
            <SearchIcon />
          </IconButton>
          
          <StyledInputBase
            placeholder={t("Search…")}
            inputProps={{ "aria-label": "search" }}
            sx={{ flexGrow: 1 , 
              '.css-1jrstcx-MuiInputBase-input' : {pl: 1}
            }}
            value={searchProduct}
            onChange={e => setSearchProduct(e.target.value)}
          />

          <div>
            <List component="nav" aria-label="Device settings"
              sx={{
                bgcolor: theme.palette.myColor.main,
                borderBottomRightRadius: 22,
                borderTopRightRadius: 22,
                p: "0",
                width: typeof window !== 'undefined' && (localStorage.getItem("langaugeSite") === "FR" || i18n.language === "FR")
                    ? "165px !important"
                    : typeof window !== 'undefined' && (localStorage.getItem("langaugeSite") === "CHI" || i18n.language === "CHI")
                    ? "190px !important"
                    : typeof window !== 'undefined' && (localStorage.getItem("langaugeSite") === "RUS" || i18n.language === "RUS")
                    ? "190px !important"
                    : null,
                "&:hover": { cursor: "pointer" },
              }}
            >
              <ListItem
                aria-haspopup="listbox"
                aria-controls="lock-menu"
                aria-label="when device is locked"
                aria-expanded={open ? "true" : undefined}
                onClick={event => setAnchorEl(event.currentTarget)}
              >
                <ListItemText className="w-[93px] text-center" secondary={t(options[selectedIndex])}/>
                <ExpandMore sx={{ fontSize: "16px" }} />
              </ListItem>
            </List>
            <Menu id="lock-menu" anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}
              MenuListProps={{"aria-labelledby": "lock-button", role: "listbox",}}>
              {options.map((option, index) => (
                <MenuItem className="text-sm" key={option} selected={index === selectedIndex} onClick={() => {handleMenuItemClick(index);}}>
                  {t(option)}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </Search>
      )}

      <Stack direction={"row"} alignItems={"center"} gap={2}>
        <CartButtonIcon />

        {!user ? (<div> {loginIcon.map((button) => (
              <Tooltip key={button.title} TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title={button.title}>
                <IconButton onClick={() => router.push(button.url)} color="inherit">{button.icon}</IconButton>
              </Tooltip>))}
          </div>) : (<UserButton />)}
      </Stack>
    </Container>
  );
};

export default HeaderSearch;
