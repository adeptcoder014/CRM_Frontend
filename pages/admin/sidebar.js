import { useEffect, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Divider,
  Typography,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
// import { NavItem } from "../nav-item";
import Image from "next/image";
// import { dashboardMenuList } from "src/constants/sidebarMenu";
import LogoutIcon from "@mui/icons-material/Logout";
import Swal from "sweetalert2";
import DashboardIcon from "@mui/icons-material/Dashboard";
// import { useTheme } from '@mui/styles'
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';



const drawerWidth = 250;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(6)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  backgroundColor: "#272727",
  height: 80,
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
//========================================================================
export default function DashboardSidebar(props) {
  //   const theme = useTheme()
  const [opN, setOpN] = useState(false);

  const handleClickOpen = () => {
    setOpN(true);
  };

  const handleClose = () => {
    setOpN(false);
  };
  //========================================================================
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });
  //========================================================================
  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (open) {
      onClose?.();
    }
  }, [router.asPath]);

  return (
    <>
      <Drawer variant="permanent" sx={{ backgroundColor: "red" }} open={open}>
        {/* ==========  Drawer_Header(Logo part) =========================== */}
        {open ? (
          <DrawerHeader
            sx={
              dark
                ? { backgroundColor: "#b32b00" }
                : { backgroundColor: "white" }
            }
          >
            <Box
              fullWidth
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                p: 1,
                backgroundColor: dark ? "#b32b00" : "white",
                width: "100%",
              }}
            >
              <Image
                onClick={() => router.push("/")}
                style={{
                  margin: "auto",
                  marginTop: 18,
                }}
                src="/logo.png"
                alt="me"
                width="120"
                height="100"
              />
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: 18,
                    color: dark ? "white" : "black",
                  }}
                >
                  One Fine Stay
                </Typography>
                <Typography
                  sx={{
                    mb: 3,
                    fontSize: 12,
                    fontWeight: "bold",
                    color: dark ? "white" : "black",
                  }}
                >
                  Arise Enterprise ©️
                </Typography>
              </Box>
            </Box>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
        ) : null}

        <Divider />
        {/* ==========  SidebarMenu_Items(Dynamic-->comes from the Constants file) =========================== */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            backgroundColor: "white",
            color: "white",
          }}
        >
          <List>
            {[
              {
                href: "/financial-dashobard/my-gold-financials",
                title: "About",
              },
              {
                href: "/retail-dashboard/retail",
                title: "Retail",
              },
              {
                href: "/inventory-dashboard/inventory",
                title: "Inventory",
              },
              {
                href: "/app-bar ",
                title: "App Bar",
              },
            ].map((text, index) => (
              <ListItem
                key={text.title}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : null,
                      justifyContent: "start",
                      color: "black",
                    }}
                  >
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <NextLink href={text.href} passHref>
                    {open ? (
                      <ListItemText
                        sx={[
                          dark
                            ? themeHai.colors.primary
                            : themeHai.colors.secondary,
                          {
                            color: dark ? "white" : "black",
                            fontWeight: "bolder",
                          },
                        ]}
                      >
                        {text.title}
                      </ListItemText>
                    ) : null}
                  </NextLink>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Box
            disableRipple
            onClick={() => router.push("/")}
            sx={{
              // zoom: '90%',
              //   background: 'linear-gradient(45deg, #ff4b4b, #ffb5b5)',
              display: "flex",
              // justifyContent:"space-around",
              cursor: "pointer",
              color: "gray",
              fontWeight: "bolder",
              p: 1,
              height: "100%",
              alignItems: "end",
              width: "100%",
              marginRight: 1,
              borderRadius: 1,
              mb: 2,
              textAlign: "center",
              //   flex: 1,
            }}
          >
            {/* <AccountBoxIcon sx={{ mr: 2, fontSize: "36px" }} />
            <Box>
              <Typography sx={{ fontWeight: "bold" }}>Nischal Gupta</Typography>
              <Typography variant="caption">Adept Baniya</Typography>
            </Box> */}
          </Box>
          <Box
            onClick={() =>
              Swal.fire(
                "You have been logged out!",
                "Log in to continue",
                "success"
              )
            }
            sx={{
              // zoom: '90%',
              // background: 'linear-gradient(45deg, #ff4b4b, #ffb5b5)',
              display: "flex",
              justifyContent: "start",
              alignItems: "flex-end",
              color: "gray",
              cursor: "pointer",
              fontWeight: "bolder",
              p: 1,
              width: "100%",
              marginRight: 1,
              borderRadius: 1,
              textAlign: "right",
              flex: 1,
              color: "black",
            }}
          >
            <LogoutIcon sx={{ mr: 2, color:"black" }} />
            Logout
          </Box>
          {/* <Switch onChange={() => setDark((prev) => !prev)} /> */}
          <label style={{ color:"black" }}>Dark Mode</label>
        </Box>
      </Drawer>
    </>
  );
}
//========================================================================
DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
