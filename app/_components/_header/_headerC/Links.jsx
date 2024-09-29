import { ExpandMore, KeyboardArrowRightOutlined } from "@mui/icons-material";
import { Box, Paper, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const Links = ({ links }) => {
  const { t } = useTranslation();
  const router = useRouter();
  
  return (
    <Box className="relative flex items-center gap-3"
      sx={{ ":hover .show-when-hover": { display: "block" }, ":hover": { cursor: "pointer" },}}
    >
      <Typography variant="body1">{t(links.titleLink)}</Typography>

      <ExpandMore sx={{ fontSize: "16px", ml: "4px" }} />

      <Box className="show-when-hover absolute top-full min-w-[170px] left-1/2 -translate-x-1/2 hidden z-10">

        <Paper sx={{ mt: 2 }}>
          <nav aria-label="secondary mailbox folders">
            <List>
              {links.subLink.map((item) => {
                return (
                  <ListItem className="relative" key={item.text} disablePadding
                    sx={{
                      ":hover .sub-link": (t(item.text) == "products" ||
                        "des products") && {
                        display: "block",
                      },
                    }}
                  >
                    <ListItemButton className="flex p-0 px-3" onClick={()=> item.link && router.push(item.link)}>
                      <ListItemText primary={t(item.text)}
                        sx={{ "& .MuiTypography-root": { fontSize: "15px", fontWeight: 300,},}}
                      />
                      <Box flexGrow={1} />

                      {item.subLink && <KeyboardArrowRightOutlined fontSize="small" />}
                    </ListItemButton>

                    <Box
                      className="sub-link hidden absolute top-0"
                      sx={{ left: links.titleLink == "Vendor Account" || links.titleLink == "User Account" ? "-100%" : "100%",}}
                    >
                      {item.subLink && <Paper sx={{ ml: 1, mr: 2, minWidth: 150 }}>
                        <nav aria-label="secondary mailbox folders">
                          <List>
                            {item.subLink?.map(
                              (itemProduct) => {
                                return (
                                  <ListItem key={itemProduct.title} disablePadding>
                                    <ListItemButton className="flex p-0 px-3" onClick={()=> router.push(itemProduct.link)}>
                                      <ListItemText primary={t(itemProduct.title)} sx={{"& .MuiTypography-root": { fontSize: "15px", fontWeight: 300, },}} />
                                      <Box flexGrow={1} />
                                    </ListItemButton>
                                  </ListItem>
                                );
                              }
                            )}
                          </List>
                        </nav>
                      </Paper>}
                    </Box>
                  </ListItem>
                );
              })}
            </List>
          </nav>
        </Paper>
      </Box>
    </Box>
  );
};

export default Links;
