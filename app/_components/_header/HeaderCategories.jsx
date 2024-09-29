import { useCallback, useMemo, useState } from "react";
import {Box,ListItemIcon,ListItemText,Tooltip,Typography,useTheme,Button,Menu,MenuItem, ListItem, 
  Fade,Container, ListItemButton ,List, Accordion, AccordionSummary} from "@mui/material";
import {LaptopChromebookOutlined,Female,Male,Diamond,Window,KeyboardArrowRightOutlined,Close,} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { changeAPI } from "../../_redux/changeAPISlice";
import {  Drawer, IconButton, useMediaQuery } from '@mui/material';
import Links from './_headerC/Links';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from "next/navigation";

const HeaderCategories = () => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [expandedMain, setExpandedMain] = useState(false);
  const [expandedSub, setExpandedSub] = useState(false);
  const router = useRouter();
  const [state, setState] = useState({
    top: false, left: false,
    bottom: false, right: false,
  });
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const dataAPI = useSelector((state) => state.dataAPI);
  const dispatch = useDispatch();

  // memo 3shan value sabta (fixed)
  const categoryList = useMemo(() => [
    { text: "Men", icon: <Male fontSize="small" /> },
    { text: "Women", icon: <Female fontSize="small" /> },
    { text: "Electronics", icon: <LaptopChromebookOutlined fontSize="small" /> },
    { text: "Jewelery", icon: <Diamond fontSize="small" /> }
  ], []);
  const linkList = useMemo(() => [
    {titleLink: 'Home', subLink: [
      {text: 'Market', subLink: [{title: "Market 1", link: "/market1"}, {title: "Market 2", link: "/market2"}]},
      {text: 'Gadget', subLink: [{title: "Gadget 1", link: "/gadget1"}, {title: "Gadget 2", link: "/gadget2"}, {title: "Gadget 3", link: "/gadget3"}]},
      {text: 'Grocery', subLink: [{title: "Grocery 1", link: "/grocery1"}, {title: "Grocery 2", link: "/grocery2"}, {title: "Grocery 3", link: "/grocery3"}, {title: "Grocery 4", link: "/grocery4"}]},
      {text: 'Fashion', subLink: [{title: "Fashion 1", link: "/fashion1"}, {title: "Fashion 2", link: "/fashion2"}, {title: "Fashion 3", link: "/fashion3"}]},
      {text: 'furniture', subLink: [{title: "Furniture 1", link: "/furniture1"}, {title: "Furniture 2", link: "/furniture2"}, {title: "Furniture 3", link: "/furniture3"}]},
      {text: 'Medical', link: '/medical'},
      {text: 'Gift Store', link: '/gift-store'},
      {text: 'Health and Beauty', link: '/health-beauty'},
    ] },
    {titleLink: 'Full Screen Menu', subLink: [
      {text: 'Sale Page', subLink: [{title: "Version 1", link: "/version1"}, {title: "Version 2", link: "/version2"}]},
      {text: 'Vendor', subLink: [{title: "All Vendors", link: "/all-vendors"}, {title: "vendor store", link: "/vendor-store"}]},
      {text: 'Shop', subLink: [{title: "Search product", link: "/search-product"}, {title: "Single product", link: "/single-product"}, {title: "Cart", link: "/"}, {title: "Checkout", link: "/"}, {title: "Alternative Checkout", link: "/"}, {title: "Order confirmation", link: "/"} ]},
      {text: 'Auth', subLink: [{title: "Login", link: "/sign-in"}, {title: "Register", link: "/sign-up"}]},
    ] },
    {titleLink: 'Mega Menu', subLink: [
      {text: 'Market', subLink: [{title: "Market 1", link: "/market1"}, {title: "Market 2", link: "/market2"}]},
      {text: 'Gadget', subLink: [{title: "Gadget 1", link: "/gadget1"}, {title: "Gadget 2", link: "/gadget2"}, {title: "Gadget 3", link: "/gadget3"}]},
      {text: 'Grocery', subLink: [{title: "Grocery 1", link: "/grocery1"}, {title: "Grocery 2", link: "/grocery2"}, {title: "Grocery 3", link: "/grocery3"}, {title: "Grocery 4", link: "/grocery4"}]},
      {text: 'Fashion', subLink: [{title: "Fashion 1", link: "/fashion1"}, {title: "Fashion 2", link: "/fashion2"}, {title: "Fashion 3", link: "/fashion3"}]},
      {text: 'furniture', subLink: [{title: "Furniture 1", link: "/furniture1"}, {title: "Furniture 2", link: "/furniture2"}, {title: "Furniture 3", link: "/furniture3"}]},
      {text: 'Medical', link: '/medical'},
      {text: 'Gift Store', link: '/gift-store'},
      {text: 'Health and Beauty', link: '/health-beauty'},
    ] },
    {titleLink: 'Pages', subLink: [
      {text: 'Sale Page', subLink: [{title: "Version 1", link: "/version1"}, {title: "Version 2", link: "/version2"}]},
      {text: 'Vendor', subLink: [{title: "All Vendors", link: "/all-vendors"}, {title: "vendor store", link: "/vendor-store"}]},
      {text: 'Shop', subLink: [{title: "Search product", link: "/search-product"}, {title: "Single product", link: "/single-product"}, {title: "Cart", link: "/"}, {title: "Checkout", link: "/"}, {title: "Alternative Checkout", link: "/"}, {title: "Order confirmation", link: "/"} ]},
      {text: 'Auth', subLink: [{title: "Login", link: "/sign-in"}, {title: "Register", link: "/sign-up"}]},
    ] },
    {titleLink: 'User Account', subLink: [
      {text: 'Market', subLink: [{title: "Market 1", link: "/market1"}, {title: "Market 2", link: "/market2"}]},
      {text: 'Gadget', subLink: [{title: "Gadget 1", link: "/gadget1"}, {title: "Gadget 2", link: "/gadget2"}, {title: "Gadget 3", link: "/gadget3"}]},
      {text: 'Grocery', subLink: [{title: "Grocery 1", link: "/grocery1"}, {title: "Grocery 2", link: "/grocery2"}, {title: "Grocery 3", link: "/grocery3"}, {title: "Grocery 4", link: "/grocery4"}]},
      {text: 'Fashion', subLink: [{title: "Fashion 1", link: "/fashion1"}, {title: "Fashion 2", link: "/fashion2"}, {title: "Fashion 3", link: "/fashion3"}]},
      {text: 'furniture', subLink: [{title: "Furniture 1", link: "/furniture1"}, {title: "Furniture 2", link: "/furniture2"}, {title: "Furniture 3", link: "/furniture3"}]},
      {text: 'Medical', link: '/medical'},
      {text: 'Gift Store', link: '/gift-store'},
      {text: 'Health and Beauty', link: '/health-beauty'},
    ] },
    {titleLink: 'Vendor Account', subLink: [
      {text: 'Sale Page', subLink: [{title: "Version 1", link: "/version1"}, {title: "Version 2", link: "/version2"}]},
      {text: 'Vendor', subLink: [{title: "All Vendors", link: "/all-vendors"}, {title: "vendor store", link: "/vendor-store"}]},
      {text: 'Shop', subLink: [{title: "Search product", link: "/search-product"}, {title: "Single product", link: "/single-product"}, {title: "Cart", link: "/"}, {title: "Checkout", link: "/"}, {title: "Alternative Checkout", link: "/"}, {title: "Order confirmation", link: "/"} ]},
      {text: 'Auth', subLink: [{title: "Login", link: "/sign-in"}, {title: "Register", link: "/sign-up"}]},
    ] },
  ], []);
  
  const toggleDrawer = useCallback((anchor, open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) return;
    setState({ ...state, [anchor]: open });
  }, [state]);

  const handleMainChange = useCallback((panel) => (event, isExpanded) => setExpandedMain(isExpanded ? panel : false), []);
  const handleSubChange = useCallback((panel) => (event, isExpanded) => setExpandedSub(isExpanded ? panel : false), []);
  return (
    <Container className="flex items-center justify-between mt-3">
      <Box>
        <Tooltip
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          title={t("Categories Menu")}
        >
          <Button id="basic-button" aria-controls={open ? "basic-menu" : undefined} aria-haspopup="true"
            aria-expanded={open ? "true" : undefined} onClick={e => setAnchorEl(e.currentTarget)}
            sx={{ width: 222, bgcolor: theme.palette.myColor.main, color: theme.palette.text.secondary,}}>
            <Window />
            <Typography className="p-0 capitalize mx4">{t("Categories")}</Typography>
            <Box flexGrow={1} />

            <KeyboardArrowRightOutlined />
          </Button>
        </Tooltip>

        <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={e => setAnchorEl(null)}
          MenuListProps={{ "aria-labelledby": "basic-button",}}
          sx={{ ".MuiPaper-root": { width: 220, bgcolor: theme.palette.myColor.main,},}}>
          {categoryList.map((item) => {
            return (
              <MenuItem key={item.text}
                onClick={() => {
                  setAnchorEl(null);
                  item.text == "Women"
                    ? dispatch(changeAPI(dataAPI.womenCategoryAPI))
                    : item.text == "Electronics"
                    ? dispatch(changeAPI(dataAPI.electronicCategoryAPI))
                    : item.text == "Jewelery"
                    ? dispatch(changeAPI(dataAPI.jeweleryCategoryAPI))
                    : dispatch(changeAPI(dataAPI.menCategoryAPI));
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>

                <ListItemText>{t(item.text)}</ListItemText>
              </MenuItem>
            );
          })}
        </Menu>
      </Box>
      

      {useMediaQuery("(min-width:992px)") && (
        <div className="flex mb-3 gap-3 items-center">
          {linkList.map(links => <Links key={links.titleLink} {...{links}} />)}
        </div>
      )}
      {useMediaQuery("(max-width:991px)") && (
        <IconButton  onClick={toggleDrawer("top", true)}>
          <MenuIcon />
        </IconButton>
      )}
      
      <Drawer anchor={"top"} open={state["top"]}
          onClose={toggleDrawer("top", false)}
          sx={{ ".MuiPaper-root.css1sozasi-MuiPaper-root-MuiDrawer-paper": { height: "100%", mb: '20px' }, }}
        >
          <Box
            sx={{ width: 444, mx: "auto", mt: 6, position: "relative", pt: 10 }}
          >
      
            <IconButton 
              sx={{
                ":hover": { color: "red", rotate: "180deg", transition: "0.3s" },
                position: "absolute",
                top: 0,
                right: 10,
              }}
              onClick={toggleDrawer("top", false)}
            >
              <Close />
            </IconButton>
      
            {linkList.map((item, index) => {
              return (
                <Accordion
                  expanded={expandedMain === t(item.titleLink)}
                  onChange={handleMainChange(t(item.titleLink))}
                  key={t(item.titleLink)}
                  elevation={0}
                  sx={{ bgcolor: "initial" }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index + 1}a-content`}
                    id={`panel${index + 1}a-header`}
                  >
                    <Typography>{t(item.titleLink)}</Typography>
                  </AccordionSummary>
                  {<List sx={{ py: 0, my: 0 }}>
                    {item.subLink.map((link) => {
                      return (
                        <Accordion
                          expanded={expandedSub === t(link.text)}
                          onChange={handleSubChange(t(link.text))}
                          key={t(link.text)}
                          elevation={1}
                          sx={{ bgcolor: "initial" }}
                          onClick={(e)=> {
                            if(link.link) {
                              setState({ ...state, ["top"]: false });
                              router.push(link.link);
                            }
                          }}
                        >
                          <AccordionSummary
                            expandIcon={!link.link && <ExpandMoreIcon />}
                            aria-controls={`panel${index + 2}a-content`}
                            id={`panel${index + 2}a-header`}
                          >
                            <Typography>{t(link.text)}</Typography>
                          </AccordionSummary>
                          {!link.link && <List sx={{ py: 0, my: 0 }}>
                            {link.subLink?.map((link) => {
                              return (
                                <ListItem key={link.title} sx={{ py: 0, my: 0 }}>
                                  <ListItemButton onClick={()=> {
                                    setState({ ...state, ["top"]: false });
                                    router.push(link.link);
                                    }}>
                                    <ListItemText primary={t(link.title)} />
                                  </ListItemButton>
                                </ListItem>
                              );
                            })}
                          </List>}
                        </Accordion>
                      );
                    })}
                  </List>}
                </Accordion>
              );
            })}
      
          </Box>
        </Drawer>
    </Container>
  );
};

export default HeaderCategories;
