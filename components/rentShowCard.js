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
import { useRouter } from "next/router";
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
export default function RentShow(props) {
  //=============================
  const [open, setOpen] = React.useState(false);
  const [openEditedBy, setOpenEditedBy] = React.useState(false);

  const [rentDue, setRentDue] = React.useState(0);
  const [ebillDue, setEbillDue] = React.useState(0);

  const [editedRents, setEditedRents] = React.useState([]);

  const handleClose = () => setOpen(false);
  //=========================================

  const patch = useMutation({
    // mutationFn: login,
    onSuccess: (res) => {
      return Swal.fire(
        "Logged in !",
        "Continue with the OFS Admin Panel",
        "success"
      ).then(() => router.push("/admin/home"));
    },
    onError: (err) => Swal.fire("Error !", err.message, "error"),
  });

  const patchForm = useFormik({
    initialValues: {
      month: "",
      year: 0,
      eBills: 0,
      due: 0,
    },
    onSubmit: (values) => {
      patch.mutate(values);
    },
  });

  //========================================

  return (
    <>
      {/* ============== UPDATE_MODAL_FORM =====================================  */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 50,
        }}
        sx={{ overflow: "scroll" }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <form onSubmit={patchForm.handleSubmit}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Edit Rent
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  p: 2,
                  boxShadow: " 0px -2px 6px 0px grey",
                  background: "linear-gradient(252deg, #e1e1e1, #ffffff)",
                  borderRadius: "8px",
                  mb: 1,
                }}
              >
                <FormLabel>Have given</FormLabel>
                {rentDue === 0 ? (
                  <Typography sx={{ mb: 2, mt: 2, fontWeight: "bolder" }}>
                    Fuck off
                  </Typography>
                ) : (
                  <TextField
                    id="due.rentDue"
                    name="due.rentDue"
                    size="small"
                    type="number"
                    variant="standard"
                    defaultValue={patchForm.values.due.rentDue}
                    onChange={patchForm.handleChange}
                  />
                )}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  p: 2,
                  boxShadow: " 0px -2px 6px 0px grey",
                  background: "linear-gradient(252deg, #e1e1e1, #ffffff)",
                  borderRadius: "8px",
                  mb: 1,
                }}
              >
                {" "}
                <Typography sx={{ mb: 2 }}>Month</Typography>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">month</InputLabel>
                  <Select
                    id="month"
                    name="month"
                    defaultValue={patchForm.values.month}
                    label="months"
                    onChange={patchForm.handleChange}
                  >
                    {months.map((x) => (
                      <MenuItem value={x}>{x}</MenuItem>
                    ))}
                  </Select>
                </FormControl>{" "}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  p: 2,
                  boxShadow: " 0px -2px 6px 0px grey",
                  background: "linear-gradient(252deg, #e1e1e1, #ffffff)",
                  borderRadius: "8px",
                  mb: 1,
                }}
              >
                <Typography sx={{ mb: 2 }}>Year</Typography>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">year</InputLabel>
                  <Select
                    id="year"
                    name="year"
                    type="number"
                    defaultValue={patchForm.values.year}
                    label="year"
                    onChange={patchForm.handleChange}
                  >
                    {years.map((x) => (
                      <MenuItem value={x}>{x}</MenuItem>
                    ))}
                  </Select>
                </FormControl>{" "}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  p: 2,
                  boxShadow: " 0px -2px 6px 0px grey",
                  background: "linear-gradient(252deg, #e1e1e1, #ffffff)",
                  borderRadius: "8px",
                  mb: 1,
                }}
              >
                <Tooltip title={patchForm.values.eBills.reading}>
                  <Typography sx={{ mb: 2 }}>E-Bill</Typography>
                </Tooltip>
                {ebillDue === 0 ? (
                  <Typography sx={{ mb: 2, fontWeight: "bolder" }}>
                    Fuck off
                  </Typography>
                ) : (
                  <TextField
                    id="due.ebillDue"
                    name="due.ebillDue"
                    size="small"
                    type="number"
                    variant="standard"
                    defaultValue={patchForm.values.due.ebillDue}
                    onChange={patchForm.handleChange}
                  />
                )}
              </Box>
              <Button
                onClick={() => {
                  axiosInstance
                    .patch(`${ADMIN_URL}/user/rent/${props.rentId}`, {
                      data: patchForm.values,
                      userId: props.userId,
                    })
                    .then((res) => {
                      setOpen(false)
                      Swal.fire("Done !", res, "success");
                    });
                }}
                sx={{
                  backgroundColor: "white",
                  color: "gray",
                  fontWeight: "bold",
                  border: "2px solid gray",
                  mt: 4,
                }}
              >
                Update Rent
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
      {/* ============== EDITED_BY =====================================  */}
      <Modal
        open={openEditedBy}
        onClose={() => setOpenEditedBy(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Who edited & when
          </Typography>
          {editedRents?.map((x) => (
            <Box
              sx={{
                boxShadow: "inset 0px -2px 6px 0px grey",
                background: "linear-gradient(252deg, #e1e1e1, #ffffff)",
                borderRadius: "8px",
                p: 1,
                mb: 1,
              }}
            >
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2, fontWeight: "bold", color: "gray" }}
              >
                Who : <span>{x.who}</span>
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2, fontWeight: "bold", color: "gray" }}
              >
                When :{" "}
                <span>
                  @
                  {
                    dayjs(x.when)
                      .format("YYYY-MM-DDTHH:mm:ssZ[Z]")
                      .split("T")[1]
                      .split("+")[0]
                      .split(":")[0]
                  }
                  {":"}
                  <span>
                    {
                      dayjs(x.when)
                        .format("YYYY-MM-DDTHH:mm:ssZ[Z]")
                        .split("T")[1]
                        .split("+")[0]
                        .split(":")[1]
                    }
                  </span>
                </span>
                <span> on {dayjs(x.when).format("DD-MM-YYYY")}</span>
              </Typography>
            </Box>
          ))}
        </Box>
      </Modal>
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

        <Grid item xs={12} sm={2} md={2} lg={2} xl={2} sx={{}}>
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
        </Grid>

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
          {props.status === "DUE" ? (
            <Typography
              sx={{
                color: "white",
                background: " linear-gradient(70deg, red, orangeRed) ",
                borderRadius: 1,
                width: "fit-content",
                fontWeight: "bolder",
                fontSize: 14,
                // border: "2px solid red",
                p: "2px 40px",
              }}
            >
              {"- "}
              {props?.total}
            </Typography>
          ) : (
            <Typography
              sx={{
                color: "white",
                background: " linear-gradient(70deg, #7fff00, #3d7405) ",
                fontWeight: "bolder",

                borderRadius: 1,
                width: "fit-content",
                p: "2px 51px",
              }}
            >
              {props.status}
            </Typography>
          )}
        </Grid>

        {/* ====================== UPDATE ============================ */}

        <Grid item xs={12} sm={2} md={2} lg={2} xl={2} sx={{}}>
          <Typography>Update Rent</Typography>
          <Button
            // onClick={handleOpen}
            onClick={() => {
              setOpen(true);
              // console.log('--->',props.rentId)

              axios
                .post(`${ADMIN_URL}/user/get-rent/${props.rentId}`, {
                  userId: props.userId,
                })
                .then((res) => {
                  console.log("<<---", res.data.rent),
                    patchForm.setValues(res.data.rent);
                  setRentDue(res.data.rent.due.rentDue);
                  setEbillDue(res.data.rent.due.ebillDue);
                });
            }}
            sx={{
              backgroundColor: "white",
              color: "gray",
              fontWeight: "bold",
              border: "2px solid gray",
            }}
          >
            Update
          </Button>
          <span>
            <MoreVertIcon
              onClick={() => {
                setOpenEditedBy(true);
                axiosInstance
                  .get(`/user/edited-by/${props.rentId}`)
                  .then((res) => setEditedRents(res.data));
              }}
              sx={{ color: "gray", ml: 11, cursor: "pointer" }}
            />
          </span>
        </Grid>
      </Grid>
    </>
  );
}



