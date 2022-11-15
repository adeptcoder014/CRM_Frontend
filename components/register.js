import {
  Box,
  Button,
  FormLabel,
  Grid,
  Input,
  InputAdornment,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import bg from "../public/bg.jpg";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import HotelIcon from "@mui/icons-material/Hotel";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import React, { useEffect } from "react";
import axios from "axios";
import { getUsers } from "../api/user";
import { useController } from "../controller/register";
import LoadingButton from "@mui/lab/LoadingButton";
import Loading from "./loading";

//===================================================
export default function Register() {
  const [double, setDouble] = React.useState(false);
  const [tripple, setTripple] = React.useState(false);
  const { query, add, addForm } = useController();
  const [image, setImage] = React.useState("");
  // useEffect(() => {
  //   getUsers().then((res) => console.log("---->", res.data.user));
  // }, []);
  if (query.isLoading) {
    return <Loading />;
  }
  // console.log("xxx ---", addForm.errors);
  //===================================================
  return (
    <Box
      maxWidth="md"
      style={{
        background: "linear-gradient(45deg, #ff7f56, #ffffffc9)",
        // border: "1px solid gray",
        margin: "auto",
        height: "99vh",
        borderRadius: "10px",
      }}
    >
      {/* ====================================== */}
      <Box
        sx={{
          //   backgroundImage: `url(${bg.src})`,
          background: "linear-gradient(45deg, #ff7f56, #ffffffc9)",
          p: 10,
          //  height: "10%",
          display: "flex",
          //  justifyContent: "center",
          //  alignItems: "center",
          flexDirection: "column",
          //  opacity: 0.5,

          minWidth: "100%",
        }}
      >
        {" "}
        {/* <Button variant="outlined">Sign in</Button> */}
        <Typography
          variant="h4"
          sx={{
            color: "white",
            width: "50%",
            // height: "100vh",

            fontFamily: "poppins",
          }}
        >
          Welcome to he OFS Hostel fellow Hosteler
        </Typography>
      </Box>
      {/* ============== FORM ======================== */}
      <form onSubmit={addForm.handleSubmit}>
        <Box
          sx={{
            //  backgroundImage: `url(${bg.src})`,
            backgroundColor: "white",
            //  border:"1px solid gray",
            boxShadow: "0px -4px 4px 0px #b1a1a1",

            // height: "100vh",
            display: "flex",
            p: 5,
            flexDirection: "column",
            //  minWidth: "100%",
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
          }}
        >
          {" "}
          <Grid container sx={{ p: 3 }}>
            <Grid
              item
              md={12}
              xs={12}
              sx={{
                display: "flex",
                mt: 3,
                fontWeight: "bolder",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Typography variant="h4" sx={{ fontFamily: "poppins", mb: 5 }}>
                New Registeration
              </Typography>
              {/* <Typography variant="h4" sx={{ fontFamily: "poppins" }}>
                Registeration
              </Typography> */}
            </Grid>

            {/* <Grid sx={{ display: "flex", p: 3 }} item md={4} xs={12}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <label
                  style={{ display: "flex", flexDirection: "column" }}
                  for="file-input"
                >
                  {" "}
                  <AddAPhotoIcon
                    sx={{
                      border: "1px dashed brown",
                      p: 2,
                      mb: 1,

                      fontSize: 75,
                      borderRadius: "50%",
                    }}
                  />
                  Upload ID Proof
                </label>

                <TextField
                  id="file-input"
                  error={
                    addForm.touched.idPhoto && Boolean(addForm.errors.idPhoto)
                  }
                  helperText={addForm.touched.idPhoto && addForm.errors.idPhoto}
                  name="idPhoto"
                  type="file"
                  onChange={(e) =>
                    addForm.setFieldValue("idPhoto", e.target.files[0])
                  }
                />
              </Box>
            </Grid> */}

            <Grid sx={{ display: "flex", p: 3 }} item md={6} xs={6}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <label
                  style={{ display: "flex", flexDirection: "column" }}
                  for="file-input"
                >
                  {" "}
                  <AddAPhotoIcon
                    sx={{
                      border: "1px dashed brown",
                      p: 2,
                      fontSize: 75,
                      mb: 1,
                      borderRadius: "50%",
                    }}
                  />
                  Upload Photo
                </label>
                <TextField
                  id="file-input"
                  error={addForm.touched.photo && Boolean(addForm.errors.photo)}
                  helperText={addForm.touched.photo && addForm.errors.photo}
                  name="photo"
                  type="file"
                  onChange={(e) => {
                    addForm.setFieldValue("photo", e.target.files[0]);
                    if (e.target.files && e.target.files[0]) {
                      setImage(URL.createObjectURL(e.target.files[0]));
                    }
                  }}
                />{" "}
              </Box>
            </Grid>
            <Grid sx={{ display: "flex", p: 3 }} item md={6} xs={6}>
              {image ? <img src={image} width={250} height={150} /> : null}
            </Grid>
          </Grid>
          <Grid container sx={{ width: "100%", mt: 5, display: "flex", p: 0 }}>
            <Grid
              className="responsive"
              item
              md={6}
              xs={12}
              sx={{ display: "flex", flexDirection: "column", mb: 5 }}
            >
              <FormLabel sx={{ mb: 2 }}>Name</FormLabel>
              <TextField
                error={addForm.touched.name && Boolean(addForm.errors.name)}
                helperText={addForm.touched.name && addForm.errors.name}
                id="name"
                name="name"
                value={addForm.values.name}
                onChange={addForm.handleChange}
                sx={{
                  width: "90%",
                  "& label.Mui-focused": {
                    color: "red",
                  },
                }}
                size="small"
                variant="standard"
                startAdornment={
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                }
              />
            </Grid>
            <Grid
              className="responsive"
              item
              md={6}
              xs={12}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <FormLabel sx={{ mb: 2 }}>Email</FormLabel>
              <TextField
                error={addForm.touched.email && Boolean(addForm.errors.email)}
                helperText={addForm.touched.email && addForm.errors.email}
                id="email"
                name="email"
                value={addForm.values.email}
                onChange={addForm.handleChange}
                sx={{ width: "90%" }}
                size="small"
                variant="standard"
                startAdornment={
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                }
              />
            </Grid>
            <Grid
              className="responsive"
              item
              md={6}
              xs={12}
              sx={{ display: "flex", flexDirection: "column", mt: 5 }}
            >
              <FormLabel sx={{ mb: 2 }}>Mobile</FormLabel>

              <TextField
                error={addForm.touched.phone && Boolean(addForm.errors.phone)}
                helperText={addForm.touched.phone && addForm.errors.phone}
                id="phone"
                name="phone"
                type="number"
                value={addForm.values.phone}
                onChange={addForm.handleChange}
                sx={{ width: "90%" }}
                size="small"
                variant="standard"
                startAdornment={
                  <InputAdornment position="start">
                    <LocalPhoneIcon />
                  </InputAdornment>
                }
              />
            </Grid>
            <Grid
              className="responsive"
              item
              md={6}
              xs={12}
              sx={{ display: "flex", flexDirection: "column", mt: 5 }}
            >
              <FormLabel sx={{ mb: 2 }}>DOB</FormLabel>

              <TextField
                error={addForm.touched.dob && Boolean(addForm.errors.dob)}
                helperText={addForm.touched.dob && addForm.errors.dob}
                id="dob"
                name="dob"
                type="date"
                value={addForm.values.dob}
                onChange={addForm.handleChange}
                sx={{ width: "90%" }}
                size="small"
                variant="standard"
                startAdornment={
                  <InputAdornment position="start">
                    <LocalPhoneIcon />
                  </InputAdornment>
                }
              />
            </Grid>
            <Grid
              className="responsive"
              item
              md={6}
              xs={12}
              sx={{ display: "flex", flexDirection: "column", mt: 5 }}
            >
              <FormLabel sx={{ mb: 2 }}>Room Preference</FormLabel>

              {/* <InputAdornment position='start'><AccountCircleIcon/></InputAdornment> */}

              <FormControl fullWidth>
                <Select
                  error={
                    addForm.touched.roomPreference &&
                    Boolean(addForm.errors.roomPreference)
                  }
                  helperText={
                    addForm.touched.roomPreference &&
                    addForm.errors.roomPreference
                  }
                  id="roomPreference"
                  name="roomPreference"
                  value={addForm.values.roomPreference}
                  onChange={addForm.handleChange}
                  // onChange={(e) =>
                  //   {
                  //     if (e.target.value === "double") {
                  //       setDouble(true);
                  //       setTripple(false);
                  //     }
                  //     if (e.target.value === "tripple") {
                  //       setDouble(false);
                  //       setTripple(true);
                  //     }
                  //   }
                  // }
                  variant="standard"
                  startAdornment={
                    <InputAdornment position="start">
                      <HotelIcon />
                    </InputAdornment>
                  }
                  //  value={age}
                  //  label="Age"
                  //  onChange={handleChange}
                  sx={{ width: "90%" }}
                >
                  <MenuItem value="double">Double</MenuItem>
                  <MenuItem value="tripple">Tripple</MenuItem>
                </Select>
              </FormControl>
              {/* ============= Conditional Rendering ====================== */}
              {double ? (
                <Typography sx={{ mt: 2, color: "black", fontWeight: 500 }}>
                  <span style={{ fontWeight: "bolder", color: "gray" }}>
                    Rent :
                  </span>{" "}
                  ₹7000
                </Typography>
              ) : tripple ? (
                <Typography sx={{ mt: 2, color: "black", fontWeight: 500 }}>
                  <span style={{ fontWeight: "bolder", color: "gray" }}>
                    Rent :
                  </span>{" "}
                  ₹9000
                </Typography>
              ) : null}
              {/* //=========================================================== */}
            </Grid>
          </Grid>
          <LoadingButton
            onClick={() => console.log("xxx----->", addForm.values)}
            disabled={add.isLoading}
            loading={add.isLoading}
            type="submit"
            sx={{
              backgroundColor: "#ff7f56",
              color: "white",
              width: "50%",
              // m: 2,
              m: "auto",
              mt: 5,
              borderRadius: "100px",
              p: 2,
              "&:hover": {
                color: "red",
                border: "1px solid #ff7f56",
                backgroundColor: "white",
              },
            }}
          >
            Register a user
          </LoadingButton>
        </Box>
      </form>
    </Box>
  );
}