import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import NextPlanIcon from "@mui/icons-material/NextPlan";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import {
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Container,
} from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
// import { sideBarMenuItems } from "../constant";
// import { NavItem } from "../component/nav-items";
import NextLink from "next/link";
import Image from "next/image";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import App_Bar from "../../components/app-bar";
import { themeHai } from "../../theme/index";
import Switch from "@mui/material/Switch";
import Swal from "sweetalert2";
import DashboardLayout from "../../components/layout/dashboard-layout";
import { useSidebarOpen } from "../../context/sidebarOpen";
//==========================================================

// const drawerWidth = 250;

// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: "hidden",
// });

// const closedMixin = (theme) => ({
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: "hidden",
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up("sm")]: {
//     width: `calc(${theme.spacing(6)} + 1px)`,
//   },
// });

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
// }));

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   backgroundColor: "#272727",
//   height: 80,
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
//   ...(open && {
//     ...openedMixin(theme),
//     "& .MuiDrawer-paper": openedMixin(theme),
//   }),
//   ...(!open && {
//     ...closedMixin(theme),
//     "& .MuiDrawer-paper": closedMixin(theme),
//   }),
// }));
//===========================================
export default function Home(props) {
  const [open, setOpen] = React.useState(false);
  const [dark, setDark] = React.useState(false);
  const { sidebarOpen, setSidebarOpen } = useSidebarOpen();
  const theme = useTheme();

  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

  console.log("Toggling Sidebar state--", sidebarOpen);
  return (
    <Box
      sx={{
        // backgroundColor: "pink",
        // width: sidebarOpen ? "calc(100% - 250px)" : "100%",
        // marginLeft: sidebarOpen ? "14.5%" : null,
        // ...(sidebarOpen && { width: "calc(100% - 250px)" }), // calc(max - min)
        // float: sidebarOpen ? "right" : "left",
        // display:"flex",
        // justifyContent:sidebarOpen ? "flex-end":"center",
        // ml:sidebarOpen ? "30%":"0px"
        ...(sidebarOpen && {
          width: "calc(100% + 250px)",
          // ml:"calc(100% - 250px)"
         }), // calc(max - min)

        // width: (sidebarOpen ? "50%":"100%"),
      }}
    >
      {/* <CssBaseline /> */}

      {/* ==========  APP_BAR(Customisable-component) =========================== */}

      {/* <App_Bar onClick={handleDrawerOpen} open={open} /> */}
      {/* ==========  Drawer(Customisable-component) =========================== */}

      {/* <Drawer variant="permanent" sx={{ backgroundColor: "red" }} open={open}>
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            backgroundColor: dark ? "#b32b00" : "white",
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
                      color: dark ? "white" : "black",
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
              display: "flex",
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
            }}
          >
           
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
              color: dark ? "white" : "black",
            }}
          >
            <LogoutIcon sx={{ mr: 2, color: dark ? "white" : "black" }} />
            Logout
          </Box>
          <Switch onChange={() => setDark((prev) => !prev)} />
          <label style={{ color: dark ? "white" : "black" }}>Dark Mode</label>
        </Box>
      </Drawer> */}

      {/* ==========  Main_Content =========================== */}

      <Container>
        <Typography variant="h5" sx={theme.custom.typography.h1}>
          Newly registered Users :
        </Typography>

        <Box
          sx={{
            boxShadow: "0px 4px 7px 0px #8080805c",
            borderRadius: "15px",
            backgroundColor: "#f5f5f5",
            display: "flex",
            justifyContent: "space-around",
            mt: 5,
            overflow: "auto",
            fontWeight: 500,
            color: "gray",
          }}
        >
          <Box sx={{ p: 2 }}>
            <p style={{ color: "black" }}>Name</p>
            <p>Nischal Gupta</p>
          </Box>
          <Box sx={{ p: 2 }}>
            <p style={{ color: "black" }}>Email</p>
            <p>gupta.nischal@gmail.com</p>
          </Box>
          <Box sx={{ p: 2 }}>
            <p style={{ color: "black" }}>Mobile</p>
            <p>7392988369</p>
          </Box>
          <Box sx={{ p: 2 }}>
            <p style={{ color: "black" }}>ID Proof</p>
            <Image src="/idProof.jpg" width={150} height={80} />
          </Box>
          <Box sx={{ p: 2 }}>
            <p style={{ color: "black" }}>Action</p>
            <Button
              variant="outlined"
              sx={{
                backgroundColor: "white",
                fontWeight: "bold",
              }}
            >
              Register
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            boxShadow: "0px 4px 7px 0px #8080805c",
            borderRadius: "15px",
            backgroundColor: "#f5f5f5",
            display: "flex",
            justifyContent: "space-around",
            mt: 5,
            overflow: "auto",
            fontWeight: 500,
            color: "gray",
          }}
        >
          <Box sx={{ p: 2 }}>
            <p style={{ color: "black" }}>Name</p>
            <p>Nischal Gupta</p>
          </Box>
          <Box sx={{ p: 2 }}>
            <p style={{ color: "black" }}>Email</p>
            <p>gupta.nischal@gmail.com</p>
          </Box>
          <Box sx={{ p: 2 }}>
            <p style={{ color: "black" }}>Mobile</p>
            <p>7392988369</p>
          </Box>
          <Box sx={{ p: 2 }}>
            <p style={{ color: "black" }}>ID Proof</p>
            <Image src="/idProof.jpg" width={150} height={80} />
          </Box>
          <Box sx={{ p: 2 }}>
            <p style={{ color: "black" }}>Action</p>
            <Button
              variant="outlined"
              sx={{
                backgroundColor: "white",
                fontWeight: "bold",
              }}
            >
              Register
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            boxShadow: "0px 4px 7px 0px #8080805c",
            borderRadius: "15px",
            backgroundColor: "#f5f5f5",
            display: "flex",
            justifyContent: "space-around",
            mt: 5,
            overflow: "auto",
            fontWeight: 500,
            color: "gray",
          }}
        >
          <Box>
            <p style={{ color: "black" }}>Name</p>
            <p>Nischal Gupta</p>
          </Box>
          <Box>
            <p style={{ color: "black" }}>Email</p>
            <p>gupta.nischal@gmail.com</p>
          </Box>
          <Box>
            <p style={{ color: "black" }}>Mobile</p>
            <p>7392988369</p>
          </Box>
          <Box>
            <p style={{ color: "black" }}>ID Proof</p>
            <Image src="/idProof.jpg" width={150} height={80} />
          </Box>
          <Box>
            <p style={{ color: "black" }}>Action</p>
            <Button
              variant="outlined"
              sx={{
                backgroundColor: "white",
                fontWeight: "bold",
              }}
            >
              Register
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
Home.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
