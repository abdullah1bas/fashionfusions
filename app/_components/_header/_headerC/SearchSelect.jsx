'use client'
import SearchIcon from "@mui/icons-material/Search";
import {useState } from "react";
import { InputBase, styled, useTheme , List, ListItem, ListItemText, MenuItem, Menu, IconButton } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { changeAPI, setSearchTerm } from "../../../_redux/changeAPISlice";
import { useRouter } from "next/navigation";

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

const SearchSelect = () => {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchProduct, setSearchProduct] = useState('');
  const theme = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();
  const state = useSelector(state => state.dataAPI)
  const open = Boolean(anchorEl);

  const handleMenuItemClick = (event, index) => {
      setSelectedIndex(index);
      setAnchorEl(null);
  };

  const handleClickedSearch = () => {
    if (searchProduct !== '') {
      dispatch(setSearchTerm(searchProduct));
      router.push(`/search/${searchProduct}`);
    }
  };

  return (
    <>
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
          <List
            component="nav"
            aria-label="Device settings"
            sx={{
              // @ts-ignore
              bgcolor: theme.palette.myColor.main,
              borderBottomRightRadius: 22,
              borderTopRightRadius: 22,
              p: "0",
              width: typeof window !== 'undefined' && (localStorage.getItem("langaugeSite") == "FR" || i18n.language == "FR")
                  ? "165px !important"
                  : typeof window !== 'undefined' && (localStorage.getItem("langaugeSite") == "CHI" || i18n.language == "CHI")
                  ? "190px !important"
                  : typeof window !== 'undefined' && (localStorage.getItem("langaugeSite") == "RUS" || i18n.language == "RUS")
                  ? "190px !important"
                  : null,
              "&:hover": { cursor: "pointer" },
            }}
          >
            <ListItem
              id="lock-button"
              aria-haspopup="listbox"
              aria-controls="lock-menu"
              aria-label="when device is locked"
              aria-expanded={open ? "true" : undefined}
              onClick={event => setAnchorEl(event.currentTarget)}
            >
              <ListItemText
                sx={{
                  width: 93,
                  textAlign: "center",
                }}
                secondary={t(options[selectedIndex])}
              />
              <ExpandMore sx={{ fontSize: "16px" }} />
            </ListItem>
          </List>
          <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            MenuListProps={{
              "aria-labelledby": "lock-button",
              role: "listbox",
            }}
          >
            {options.map((option, index) => (
              <MenuItem
                sx={{ fontSize: "13px" }}
                key={option}
                selected={index === selectedIndex}
                onClick={(event) => {
                  handleMenuItemClick(event, index);
                  option == "Men"
                    ? dispatch(changeAPI(state.menCategoryAPI))
                    : option == "Women"
                    ? dispatch(changeAPI(state.womenCategoryAPI))
                    : option == "Electronics"
                    ? dispatch(changeAPI(state.electronicCategoryAPI))
                    : option == "Jewelery"
                    ? dispatch(changeAPI(state.jeweleryCategoryAPI))
                    : dispatch(changeAPI(state.allProductAPI));
                }}
              >
                {t(option)}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </Search>
    </>
  );
};

export default SearchSelect;
