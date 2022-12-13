import {
  Grid,
  TextField,
  Typography,
  Button,
  Avatar,
  Box,
} from "@mui/material";

import { useEffect, useState } from "react";
import { getUserById } from "../api/user";
import { useRouter } from "next/router";
//============================================
export default function RentShow(props) {
  //=============================

  //===========================
  return (
    <>
      <Grid
        container
        sx={{
          boxShadow: "0px 2px 3px 0px grey",
          background: "linear-gradient(252deg, #e1e1e1, #ffffff)",
          borderRadius: "8px",
          p: 2,
          mb: 2,
        }}
      >
        <Grid item xs={12} sm={3} md={3} lg={3} xl={3} sx={{}}>
          <Typography>Month</Typography>
          <Typography
            sx={{
              color: "white",
              backgroundColor: "#4682B4",
              borderRadius: 1,
              width: "fit-content",
              p: "2px 51px",
            }}
          >
            {props.month ? props.month : "month"}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3} md={3} lg={3} xl={3} sx={{}}>
          <Typography>Rent</Typography>
          <Typography> {props.rent ? props.rent : "₹ x,xxx"}</Typography>
        </Grid>
        <Grid item xs={12} sm={3} md={3} lg={3} xl={3} sx={{}}>
          <Typography>Status</Typography>
          {props.status === "DUE" ? (
            <Typography
              sx={{
                color: "white",
                backgroundColor:"#E34234",
                borderRadius: 1,
                width: "fit-content",
                p: "2px 51px",
              }}
            >
              {props.status}
            </Typography>
          ) : (
            <Typography 
              sx={{
                color: "white",
                backgroundColor:"#7fff00",

                borderRadius: 1,
                width: "fit-content",
                p: "2px 51px",
              }}
            >
              {props.status}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={3} md={3} lg={3} xl={3} sx={{}}>
          <Typography>UpdateRent</Typography>
          <Button
            sx={{
              backgroundColor: "white",
              color: "gray",
              border: "1cpx dashed gray",
            }}
          >
            Update
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
