import DashboardLayout from "../../../components/layout/dashboard-layout";
import {
  Grid,
  Typography,
  Box,
  Container,
  Button,
  TextField,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import Loading from "../../../components/loading";
import Table from "../../../components/table";
import { getUserById } from "../../../api/user";
import { approval } from "../../../api/approval";
import { getRentStructure } from "../../../api/rental";

import { useQuery, useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { approvalValidation } from "../../../validation/approval";
import { useState } from "react";
import axios from "axios";
import axiosInstance from "../../../api/axios";
import dayjs from "dayjs";
import { useRentController } from "../../../controller/rental";
//========================================
export default function UserRentalDetails() {

  const{rentQuery} = useRentController()
  const router = useRouter();
  const theme = useTheme();

  const query = useQuery({
    queryKey: ["userById", router.query.id],
    queryFn: () => getUserById(router.query.id),
    enabled: !!router.query.id,
  });
  //----------------------------------------
  const [joinDate, setJoinDate] = useState(
    dayjs(query?.data?.data?.joiningDate).format("YYYY-MM-DD")
  );
  const [rent, setRent] = useState(query?.data?.data?.dues);

  if (!query.isLoading) {
    // return <Loading />;
  }
  const user = query?.data?.data

  if (query.isLoading) {
    return <Loading />;
  }
console.log(query.data.data)
 
  //===================================================

  return (
    <Container sx={{}}>
      <Typography
        variant="h5"
        sx={[theme.custom.typography.h1, { mb: 5, mt: 5 }]}
      >
        User rental details :
      </Typography>
      {/* =========================== */}

      <Grid container sx={{gap:1}}>
        {/* ----------------------------- */}
        <Grid
          item
          xs={12}
          sm={4}
          md={6}
          lg={6}
          xl={4}
          sx={{ boxShadow: "0px 5px 7px 0px #cfcaca", p: 3, borderRadius: 1 }}
        >
          <Typography
            variant="caption"
            sx={[theme.custom.typography.h1, { mb: 5, mt: 5 }]}
          >
            Rental details :
          </Typography>
          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "space-between",
            }}
          >
            <Typography
              variant="caption"
              sx={[theme.custom.typography.h1, { fontSize: 14 }]}
            >
              Joining Date :
            </Typography>

            <TextField
           
              type="date"
              defaultValue={joinDate}
              onChange={(e) => setJoinDate(e.target.value)}
              sx={{
                // width: "90%",
                ml: 2,
                "& label.Mui-focused": {
                  color: "red",
                },
              }}
              size="small"
              variant="outlined"
            />
          </Box>
          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "space-between",
            }}
          >
            <Typography
              variant="caption"
              sx={[theme.custom.typography.h1, { fontSize: 14 }]}
            >
              Security
            </Typography>

            <Typography
              variant="caption"
              sx={[theme.custom.typography.h1, { fontSize: 14 }]}
            >
              {user.security}
            </Typography>
          </Box>


          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "space-between",
            }}
          >
            <Typography
              variant="caption"
              sx={[theme.custom.typography.h1, { fontSize: 14 }]}
            >
              Est. Rent
            </Typography>

            <Typography
              variant="caption"
              sx={[theme.custom.typography.h1, { fontSize: 14 }]}
            >
              {rent}
            </Typography>
          </Box>


          <Box
            sx={{
              cursor: "pointer",
              //   width: "40%",
              mt: 5,
              textAlign: "center",
              //   color: "gray",
              fontWeight: "bolder",
              border: "1px solid black",
              backgroundColor: "white",
              p: 1,
              borderRadius: "5px",
            }}
            onClick={() =>
              axiosInstance
                .get(`/rent/structure/?date=${joinDate}`)
                .then((res) => setRent(res.data.dues))
            }
          >
            Get Rent
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          sm={4}
          md={6}
          lg={5}
          xl={4}
          sx={{ boxShadow: "0px 5px 7px 0px #cfcaca", p: 3, borderRadius: 1 }}
        >
          <Typography
            variant="caption"
            sx={[theme.custom.typography.h1, { mb: 5, mt: 5 }]}
          >
            E-Bills :
          </Typography>
          
          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "space-between",
              // flex:1,
              // height:"20%"
            }}
          >
            <Typography
              variant="caption"
              sx={[theme.custom.typography.h1, { fontSize: 14 }]}
            >
              Meter Reading
            </Typography>

            <Typography
              variant="caption"
              sx={[theme.custom.typography.h1, { fontSize: 14 }]}
            >
              {query.data.data.meterReading}
            </Typography>
          </Box>

          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "space-between",
              // flex:1,
              // height:"20%"
            }}
          >
            <Typography
              variant="caption"
              sx={[theme.custom.typography.h1, { fontSize: 14 }]}
            >
              Per unit price
            </Typography>

            <Typography
              variant="caption"
              sx={[theme.custom.typography.h1, { fontSize: 14 }]}
            >
              {rentQuery.data.data.data[0].pricePerUnit}
            </Typography>
          </Box>

          <Box
            sx={{
              mt: 2,
              // mb:5,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "space-between",
              // flex:1,
              // height:"20%"
            }}
          >
            <Typography
              variant="caption"
              sx={[theme.custom.typography.h1, { fontSize: 14 }]}
            >
              Bill for this month
            </Typography>

            <Typography
              variant="caption"
              sx={[theme.custom.typography.h1, { fontSize: 14 }]}
            >
              ₹ {query.data.data.eBills}
            </Typography>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          sm={4}
          md={4}
          lg={4}
          xl={4}
          sx={{ boxShadow: "0px 5px 7px 0px #cfcaca", p: 3, borderRadius: 1 }}
        >
          <Typography
            variant="caption"
            sx={[theme.custom.typography.h1, { mb: 5, mt: 5 }]}
          >
            Misc. Bills :
          </Typography>
          
          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "space-between",
              // flex:1,
              // height:"20%"
            }}
          >
            <Typography
              variant="caption"
              sx={[theme.custom.typography.h1, { fontSize: 14 }]}
            >
              Total
            </Typography>

            <Typography
              variant="caption"
              sx={[theme.custom.typography.h1, { fontSize: 14 }]}
            >
              {query.data.data.misc}
            </Typography>
          </Box>

          
        </Grid>
        
        {/* ----------------------------- */}
      </Grid>

      {/* ======================== */}
      <Box
        sx={{
          cursor: "pointer",
          //   width: "40%",
          mt: 5,
          textAlign: "center",
          color: "#ff855f",
          fontWeight: "bolder",
          border: "1px solid #ff855f",
          backgroundColor: "white",
          p: 1,
          borderRadius: "5px",
          mb:2
        }}
        onClick={() =>
          axiosInstance
            .patch(`/user/approval/${router.query.id}`, {
              joiningDate: joinDate,
              dues: rent,
            })
            .then((res) => console.log("ho gaya --------", res))
        }
      >
        Update
      </Box>
      {/* ======================== */}
    </Container>
  );
}
UserRentalDetails.getLayout = (page) => (
  <DashboardLayout>{page}</DashboardLayout>
);
