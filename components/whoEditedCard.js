import {
    Grid,
    TextField,
    Typography,
    Button,
    Avatar,
    Box,
    Modal,
    Backdrop,
    Fade,
    Slide,
    FormLabel,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Tooltip,
  } from "@mui/material";
  import { useEffect, useState } from "react";
  import { getUserById } from "../api/user";
  import  { useRouter } from "next/router";
  import React from "react";
  import axios from "axios";
  import { ADMIN_URL } from "../constants/url";
  import { useQuery, useMutation } from "@tanstack/react-query";
  import { useFormik } from "formik";
  import Loading from "./loading";
  import PedalBikeIcon from "@mui/icons-material/PedalBike";
  import axiosInstance from "../api/axios";
  import MoreVertIcon from "@mui/icons-material/MoreVert";
  import dayjs from "dayjs";
  import Swal from "sweetalert2";
  import Link from "next/link";
  import { useToken } from "../context/localStorageToken";
  import jwt_decode from "jwt-decode";

  //=====================================
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    boxShadow: "inset 0px -2px 6px 0px grey",
    background: "linear-gradient(252deg, #e1e1e1, #ffffff)",
    borderRadius: "8px",
    p: 4,
  };
  
  const months = ["December", "January", "Feburary", "March"];
  const years = [2021, 2022, 2023];
  
  //============================================
  export default function WhoEditedCard(props) {
    const router = useRouter();


    //========================================
  if(router.query.id === props.rentId)return (
    
      <>
        
        {/* ============================================= */}
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
          {/* ====================== MONTH ============================ */}
  
          {/* <Grid item xs={12} sm={2} md={2} lg={2} xl={2} sx={{}}>
            <Box sx={{ display: "flex" }}>
              <Tooltip title={props.rentCycle}>
                <PedalBikeIcon sx={{ color: "gray", fontSize: "18px", mr: 1 }} />
              </Tooltip>
              <Typography>Month</Typography>
            </Box>
            <Tooltip title={props.year}>
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
            </Tooltip>
          </Grid> */}
  
          {/* ====================== RENT ============================ */}
  
          <Grid item xs={12} sm={2} md={2} lg={2} xl={2} sx={{}}>
            <Typography>Rent</Typography>
            <Typography> {props.rent ? props.rent : "₹ x,xxx"}</Typography>
          </Grid>
  
          {/* ====================== DUE_RENT ============================ */}
  
          <Grid item xs={12} sm={2} md={2} lg={2} xl={2} sx={{}}>
            <Typography>To be receive</Typography>
            <Typography> {props.rentDue}</Typography>
          </Grid>
  
          {/* ====================== DUE_eBILL ============================ */}
  
          <Grid item xs={12} sm={2} md={2} lg={2} xl={2} sx={{}}>
            <Typography>Ebill</Typography>
            <Typography> {props.ebillDue}</Typography>
          </Grid>
          {/* ====================== STATUS ============================ */}
  
          <Grid item xs={12} sm={2} md={2} lg={2} xl={2} sx={{}}>
            <Typography>Status</Typography>
            {/* {props.status === "DUE" ? ( */}
              <Typography
               
              >
                {"- "}
                {Math.abs(props?.total)}
              </Typography>
            {/* ) : ( */}
              
          </Grid>
  
          {/* ====================== UPDATE ============================ */}
          <span>
                  @
                  {
                    dayjs(props.time)
                      .format("YYYY-MM-DDTHH:mm:ssZ[Z]")
                      .split("T")[1]
                      .split("+")[0]
                      .split(":")[0]
                  }
                  {":"}
                  <span>
                    {
                      dayjs(props.time)
                        .format("YYYY-MM-DDTHH:mm:ssZ[Z]")
                        .split("T")[1]
                        .split("+")[0]
                        .split(":")[1]
                    }
                  </span>
                </span>
         
        </Grid>
      </>
    );
  }
  