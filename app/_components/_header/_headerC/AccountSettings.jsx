import { useCallback, useState } from "react";
import {IconButton,Tooltip,Avatar,Menu,MenuItem,ListItemIcon,Divider,Fade,} from "@mui/material";
import {PersonOutlined,PersonAdd,Settings,Logout,} from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const AccountSettings = () => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = useCallback(
    (event) => {
      setAnchorEl(event.currentTarget);
    },
    [anchorEl]
  );
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [anchorEl]);
  return (
    <>
      <Tooltip
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 600 }}
        title={t("Account settings")}
      >
        <IconButton 
          onClick={handleClick}
          aria-controls={openMenu ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openMenu ? "true" : undefined}
          color="inherit"
        >
          <PersonOutlined />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={openMenu}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> {t("Profile")}
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> {t("My account")}
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          {t("Add another account")}
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          {t("Settings")}
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {t("Logout")}
        </MenuItem>
      </Menu>
    </>
  );
};

export default AccountSettings;
