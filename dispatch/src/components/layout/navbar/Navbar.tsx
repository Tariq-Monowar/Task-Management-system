import "./navbar.scss";
import logo from "../../../assets/app-logo.png";
import { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Avatar, Divider, Stack } from "@mui/material";

import { deepPurple } from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { HiBars3BottomLeft } from "react-icons/hi2";
import Sidebar from "../Sidebar/Sidebar";

import ProfileDialog from "../../profileDialog/ProfileDialog";
import { toggleSidebar } from "../../../features/project/projectSlice";
import NotificationMenu from "../../notifications/NotificationMenu";
import { logOut } from "../../../features/auth/authSlice";
import {
  getAllNotifications,
  readAllNotification,
} from "../../../features/notification/notificationSlice";

// const StyledBadge = styled(Badge)(({ theme }) => ({
//   "& .MuiBadge-badge": {
//     backgroundColor: "#44b700",
//     color: "#44b700",
//     boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
//     "&::after": {
//       position: "absolute",
//       top: 0,
//       left: 0,
//       width: "100%",
//       height: "100%",
//       borderRadius: "50%",
//       animation: "ripple 1.2s infinite ease-in-out",
//       border: "1px solid currentColor",
//       content: '""',
//     },
//   },
//   "@keyframes ripple": {
//     "0%": {
//       transform: "scale(.8)",
//       opacity: 1,
//     },
//     "100%": {
//       transform: "scale(2.4)",
//       opacity: 0,
//     },
//   },
// }));

export default function NavBar() {
  const user = useSelector((state: RootState) => state.authorization.user);
  const { count } = useSelector((state: RootState) => state.notifications);
  const dispatch = useDispatch<AppDispatch>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] =
    useState<null | HTMLElement>(null);

  // for open profile dialog
  const [openProfil, setOpenProfil] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
    dispatch(toggleSidebar());
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isProfileMenuOpen = Boolean(profileMenuAnchorEl);

  const handleNotificationsMenuOpen = async (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setAnchorEl(event.currentTarget);
    await dispatch(getAllNotifications());
    await dispatch(readAllNotification());
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setProfileMenuAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleOpenProfile = () => {
    setOpenProfil(true);
    handleMenuClose();
  };

  const logOuts = async () => {
    let res = await dispatch(logOut());
    console.log(res);
  };

  const menuId = "primary-notifications-menu";
  const renderMenu = (
    <Menu
      className="manues"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      sx={{ mt: "48px" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <NotificationMenu handleMenuClose={handleMenuClose} />
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem onClick={handleNotificationsMenuOpen}>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="account of current user"
          color="inherit"
          onClick={handleProfileMenuOpen}
        >
          <AccountCircle />
        </IconButton>
      </MenuItem>
    </Menu>
  );

  // Render profile menu when avatar is clicked

  const renderProfileMenu = (
    <Menu
      anchorEl={profileMenuAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isProfileMenuOpen}
      onClose={handleMenuClose}
      sx={{
        "& .MuiPaper-root": {
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)", // Shadow effect
          borderRadius: "8px", // Rounded corners
          border: "1px solid rgba(0, 0, 0, 0.1)", // Border effect
        },
        "& .MuiMenuItem-root": {
          padding: "8px 16px",
          fontSize: "16px", // Font size
          fontWeight: 500, // Font weight
          transition: "background-color 0.3s", // Transition effect
          "&:hover": {
            backgroundColor: "#f0f0f0", // Light gray background on hover
          },
        },
      }}
    >
      <MenuItem
        onClick={handleOpenProfile}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <PersonIcon sx={{ marginRight: 1 }} />
        Profile
      </MenuItem>

      <Divider />

      <MenuItem
        onClick={handleMenuClose}
        sx={{
          display: "flex",
          alignItems: "center",
          color: "error.main", // Sets the text color to the error color (usually red)
          "&:hover": {
            backgroundColor: "#ffebee", // Light red background on hover
          },
        }}
      >
        <LogoutIcon onClick={logOuts} sx={{ marginRight: 1 }} />
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          width: "100%",
        }}
      >
        <AppBar
          sx={{
            bgcolor: "#ffffff",
            boxShadow:
              "2px 2px 5px -1px rgb(14 14 14 / 9%), 0px 2px 5px 0px rgb(132 132 132 / 14%), -2px 0px 1px 0px rgba(158, 158, 158, 0.12)",
          }}
          position="static"
          className="NavBar"
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              aria-label="open drawer"
              sx={{ mr: 2, color: "#545659" }}
              onClick={handleSidebarToggle}
            >
              <HiBars3BottomLeft />
            </IconButton>

            <Typography variant="h6" noWrap component="div">
              <Avatar alt="Remy Sharp" className="webLogo" src={logo} />
            </Typography>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { md: "flex" } }}>
              <IconButton
                aria-label="show 17 new notifications"
                sx={{ width: "55px" }}
                onClick={handleNotificationsMenuOpen}
              >
                <Badge
                  badgeContent={count}
                  sx={{
                    "& .MuiBadge-badge": {
                      height: "19px",
                      width: "20px",
                    },
                  }}
                  color="error"
                >
                  <NotificationsIcon
                    sx={{ fontSize: "32px", color: "#65676b" }}
                  />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                color="inherit"
                onClick={handleProfileMenuOpen}
              >
                <Stack direction="row" spacing={2}>
                  <Avatar className="abator" sx={{ bgcolor: deepPurple[500] }}>
                    {user?.name?.slice(0, 2)}
                  </Avatar>
                </Stack>
              </IconButton>
            </Box>
            {/* <Box sx={{ display: { xs: "flex", md: "none", color: "#65676b" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box> */}
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
        {renderProfileMenu} {/* Add the profile menu here */}
      </Box>

      <Sidebar isOpen={isSidebarOpen} />
      <ProfileDialog
        openProfil={openProfil}
        setOpenProfil={setOpenProfil}
        user={user}
      />
    </>
  );
}
