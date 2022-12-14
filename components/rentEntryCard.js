import {
  Grid,
  TextField,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ADMIN_URL } from "../constants/url";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import { getRent } from "../api/rental";

//==================================================

const months = ["January", "Feburary", "March"];
const years = [2021, 2022, 2023];

//=====================
export default function RentEntry() {
  //==========================
  const router = useRouter();

  const [rent, setRent] = useState(0);
  const [year, setYear] = useState(0);
  
  const [month, setMonth] = useState();
  //===========================
  useEffect(() => {
    getRent().then((res) => setRentCycle(res.data.data[0].rentCycle));
  }, []);
  const [rentCycle, setRentCycle] = useState();

  //===========================
  return (
    <>
      <Grid item xs={12} sm={2} md={2} lg={2} xl={2} sx={{}}>
        <Typography sx={{ mb: 2 }}>Rent Cycle</Typography>
        <TextField
          size="small"
          variant="standard"
          type="number"
          value={rentCycle}
          onChange={(e) => setRentCycle(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={2} md={2} lg={2} xl={2} sx={{}}>
        <Typography sx={{ mb: 2 }}>Rent</Typography>
        <TextField
          size="small"
          variant="standard"
          type="number"
          onChange={(e) => setRent(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={2} md={2} lg={2} xl={2} sx={{}}>
        <Typography sx={{ mb: 2 }}>Year</Typography>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">year</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
            onChange={(e) => setYear(e.target.value)}
          >
            {years.map((x) => (
              <MenuItem value={x}>{x}</MenuItem>
            ))}
          </Select>
        </FormControl>{" "}
      </Grid>
      <Grid item xs={12} sm={2} md={2} lg={2} xl={2} sx={{}}>
        <Typography sx={{ mb: 2 }}>Month</Typography>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">month</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Age"
            onChange={(e) => setMonth(e.target.value)}
          >
            {months.map((x) => (
              <MenuItem value={x}>{x}</MenuItem>
            ))}
          </Select>
        </FormControl>{" "}
      </Grid>
      <Grid item xs={12} sm={2} md={2} lg={2} xl={2} sx={{}}>
        <Typography sx={{ textAlign: "center", mb: 1 }}>UpdateRent</Typography>
        <Button
          onClick={() => {
            axios
              .post(`${ADMIN_URL}/user/rent/${router.query.id}`, {
                rent: Number(rent),
                year: year,
                month: month,
                rentCycle: rentCycle,
              })
              .then((res) =>
                Swal.fire("Rent updated !", "Rent updated", "success")
              )
              .catch((e) =>
                Swal.fire("Ooops !", e.response.data.message, "error")
              );
          }}
          fullWidth
          sx={{
            backgroundColor: "white",
            color: "gray",
            fontWeight: "bold",
            border: "2px solid gray ",
          }}
        >
          Update
        </Button>
      </Grid>
    </>
  );
}
