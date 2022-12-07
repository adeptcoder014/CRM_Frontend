import {
  Grid,
  Typography,
  Box,
  Container,
  Avatar,
  Divider,
} from "@mui/material";
import DashboardLayout from "../../components/layout/user-layout";
import BedIcon from "@mui/icons-material/Bed";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../api/user";
import Loading from "../../components/loading";
import OutletIcon from "@mui/icons-material/Outlet";
//===========================================================
function getWindowDimensions() {
  if (typeof window !== "undefined") {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }
}
//--------------------------------------------------------
export default function Home() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  //---------------------------------------------------
  const router = useRouter();

  const query = useQuery({
    queryKey: ["userById", router.query.id],
    queryFn: () => getUserById(router.query.id),
    enabled: !!router.query.id,
  });

  if (query.isLoading) {
    return <Loading />;
  }
  console.log("query --->", query.data.data);
  //================================================
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          backgroundColor: query?.data?.data.status === "NEW" ? "red" : "#22BB33",
          width:"20%",
          textAlign:"center",
          fontWeight:"bolder",
          mb:2,
          color: "white",
          p: 1,
          borderRadius: "10px",
        }}
      >
        {query?.data?.data.status}
      </Box>
      {/* -------------------------------------------------- */}
      <Grid
        container
        sx={{
          // width:"150%",
          ml: -5,
          display: "flex",
          // justifyContent: "space-between",
          boxShadow: "0px 2px 3px 0px grey",
          background: "linear-gradient(252deg, #e1e1e1, #ffffff)",
          p: 1,
          borderRadius: "8px",
        }}
      >
        <Grid item sm={12} md={6} lg={6} xl={6} sx={{ display: "flex" }}>
          <Avatar sx={{ mr: 1, fontSize: 5 }} />
          <Box>
            <Typography sx={{ fontWeight: 600, color: "gray" }}>
              {query?.data?.data.name}
            </Typography>
            <Typography
              variant="caption" 
              sx={{
                color: "gray",
                inlineSize: "150px",
                wordWrap: "break-word",
              }}
            >
              {query?.data?.data.email}
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          sm={12}
          md={6}
          lg={6}
          xl={6}
          sx={{ display: "flex", alignSelf: "center" }}
        >
          <BedIcon sx={{ alignSelf: "center", mr: 1, color: "gray" }} />
          <Typography
            sx={{ fontWeight: 600, color: "gray", mr: 5, alignSelf: "center" }}
          >
            Double
          </Typography>
          <OutletIcon sx={{ mr: 1, color: "gray" }} />
          <Typography sx={{ fontWeight: 600, color: "gray" }}>789</Typography>
        </Grid>
        <Grid
          item
          sm={12}
          md={12}
          lg={12}
          xl={12}
          // sx={{ }}
        >
          <Typography sx={{ fontWeight: 600, color: "gray", mr: 1, mt: 2 }}>
            Joined on : 28th Aug `22
          </Typography>
        </Grid>
        {/* <Grid item sm={12} md={4} lg={4} xl={4}> */}{" "}
        <Typography sx={{ color: "gray", mr: 1, mt: 2 }}>
          Rent Structure
        </Typography>
        <Divider sx={{ backgroundColor: "red", width: "90%", m: 2 }} />
        {/* ------------------------------------------ */}
        {/* <Box sx={{ display: "flex" }}> */}
        <Grid
          item
          xs={12}
          sm={2}
          md={2}
          lg={2}
          xl={2}
          sx={{ display: windowDimensions.width <= 500 ? "column" : "flex" }}
        >
          {/* <Box sx={{ display: "flex" }}> */}
          {/* ----------------------- */}
          <Box>
            <Box
              sx={{
                // width: "80px",
                // height: "80px",
                p: 2,
                borderRadius: 1,
                backgroundColor: "white",
                boxShadow: "0px 2px 3px 0px grey",
                mr: 5,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: "gray",
                  fontWeight: "bolder",
                  textAlign: "center",
                }}
              >
                25
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ color: "gray", mr: 1, mt: 2 }}>
              Left out days
            </Typography>
          </Box>

          <Box>
            <Box
              sx={{
                // width: "100%",
                // height: "80px",
                p: 2,
                borderRadius: 1,
                backgroundColor: "white",
                boxShadow: "0px 2px 3px 0px grey",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: "gray",
                  fontWeight: "bolder",
                  textAlign: "center",
                }}
              >
                2,500
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ color: "gray", mr: 1, mt: 2 }}>
              Left out days
            </Typography>
          </Box>
          {/* </Box>   */}
          {/* ----------------------- */}
        </Grid>
        {/* </Box> */}
        {/* ------------------------------------------ */}
        {/* </Grid> */}
      </Grid>
      {/* -------------------------------------------------- */}
    </Container>
  );
}
//============================================================
Home.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
