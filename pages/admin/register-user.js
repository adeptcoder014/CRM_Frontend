import DashboardLayout from "../../components/layout/dashboard-layout";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { getUserById } from "../../api/user";
import {
  Container,
  Box,
  Grid,
  Typography,
  TextField,
  FormLabel,
  InputAdornment,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Loading from "../../components/loading";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BedroomChildIcon from "@mui/icons-material/BedroomChild";
import BedroomParentIcon from "@mui/icons-material/BedroomParent";
import LuggageIcon from "@mui/icons-material/Luggage";
import ElectricMeterIcon from "@mui/icons-material/ElectricMeter";
import DiscountIcon from "@mui/icons-material/Discount";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import CommentIcon from "@mui/icons-material/Comment";
import { useFormik } from "formik";
import { approvalValidation } from "../../validation/approval";
import { approval } from "../../api/approval";
import { Query, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useRentController } from "../../controller/rental";
//============================================================================
export default function RegisterUser() {
  const { rentQuery } = useRentController();

  const router = useRouter();
  const query = useQuery({
    queryKey: ["userById", router.query.id],
    queryFn: () => getUserById(router.query.id),
    onSuccess: (res) =>
      patchForm.setValues(res.data),
    enabled: !!router.query.id,
  });

  const patchForm = useFormik({
    initialValues: {
      room: 0,
      meterReading: 0,
      discount: 0,
      security: 0,
      remark: "",
    },
    validationSchema: approvalValidation,
    onSubmit: (values) => {
      console.log("values---", values);

      patch.mutate({ data: values, id: router.query.id });
    },
  });
  //------------------- ADD -------------------------------------

  const patch = useMutation({
    mutationFn: approval,
    onSuccess: (res) =>
      Swal.fire("Registration Done ", "User is registered ", "success").then(
        () => router.push("/admin/home")
      ),
    onError: (err) => Swal.fire("Error !", err.response.data, "error"),
  });

  //==================================
  if (query.isLoading) {
    return <Loading />;
  }
  if (rentQuery.isLoading) {
    return <Loading />;
  }
  //============ RENTAL_STRUCTURE ================================
  const giveRemainingRent = (days) => {
    const remainingDays = 30 - days;
    const remainingRent =
      remainingDays * rentQuery.data.data.data[0].rentPerDay;
    return { remainingDays, remainingRent };
  };
  //============================================
  const dueRent = giveRemainingRent(
    query?.data?.data?.registeredDate.split("T")[0].split("-")[2]
  );
  //=====================================================
  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          mt: 5,
          backgroundColor: "#f5f5f5",
          boxShadow: "0px 3px 3px 0px #b1cdb1",
          borderRadius: "6px",
          p: 5,
        }}
      >
        <Grid container>
          <Grid item xl={1} lg={1} md={4} xs={12} sx={{ mr: 0 }}>
            <AccountCircleIcon sx={{ fontSize: "85px", color: "gray" }} />
          </Grid>
          <Grid item xl={6} lg={6} md={4} xs={12} sx={{}}>
            <Typography
              sx={{
                color: "gray",
                fontWeight: 600,
                fontFamily: "poppins",
                ml: 1,
              }}
            >
              {query?.data?.data?.name}
            </Typography>
            <Typography
              sx={{
                color: "gray",
                fontWeight: "bolder",
                fontFamily: "poppins",
                ml: 1,
              }}
            >
              {query?.data?.data?.email}
            </Typography>
            <Typography
              sx={{
                color: "gray",
                fontWeight: "bolder",
                fontFamily: "poppins",
                ml: 1,
              }}
            >
              {query?.data?.data?.phone}
            </Typography>
          </Grid>
          <Grid item xl={5} lg={5} md={4} xs={12}>
            {/* ========  Conditional Rendering ========================= */}

            {query.data.data.roomPreference === "double" ? (
              <BedroomParentIcon
                sx={{
                  backgroundColor: "gray",
                  color: "white",
                  borderRadius: "3px",
                  fontSize: 45,
                }}
              />
            ) : (
              <>
                <BedroomParentIcon
                  sx={{
                    backgroundColor: "gray",
                    color: "white",
                    borderRadius: "3px",
                    fontSize: 45,
                  }}
                />
                <BedroomChildIcon
                  sx={{
                    backgroundColor: "gray",
                    color: "white",
                    borderRadius: "3px",
                    fontSize: 45,
                  }}
                />
              </>
            )}

            <Typography
              sx={{
                color: "gray",
                fontWeight: "bolder",
                fontFamily: "poppins",
              }}
            >
              {query?.data?.data?.zodiac?.symbol}{" "}
              {query?.data?.data?.zodiac?.name}
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* ===================== FORM ================================== */}

      <Container
        maxWidth="lg"
        sx={{
          mt: 5,
          //   backgroundColor: "#f5f5f5",
          boxShadow: "0px 3px 3px 0px #b1cdb1",
          borderRadius: "6px",
          p: 5,
        }}
      >
        <form onSubmit={patchForm.handleSubmit}>
          <Box
            sx={{
              backgroundColor: "white",
              boxShadow: "0px -4px 4px 0px #b1a1a1",
              display: "flex",
              p: 5,
              flexDirection: "column",
            }}
          >
            {" "}
            <Typography variant="h4" sx={{ fontFamily: "poppins", mb: 5 }}>
              Assign User Information
            </Typography>
            <Grid
              container
              sx={{ width: "100%", mt: 5, display: "flex", p: 0 }}
            >
              <Grid
                className="responsive"
                item
                md={6}
                xs={12}
                sx={{ display: "flex", flexDirection: "column", mb: 5 }}
              >
                <FormLabel sx={{ mb: 2 }}>Room Number</FormLabel>
                <TextField
                  error={
                    patchForm.touched.room && Boolean(patchForm.errors.room)
                  }
                  helperText={patchForm.touched.room && patchForm.errors.room}
                  id="room"
                  type="number"
                  name="room"
                  value={patchForm?.values?.room}
                  onChange={patchForm.handleChange}
                  sx={{
                    width: "90%",
                    "& label.Mui-focused": {
                      color: "red",
                    },
                  }}
                  size="small"
                  variant="standard"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LuggageIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid
                className="responsive"
                item
                md={6}
                xs={12}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <FormLabel sx={{ mb: 2 }}>Electricity Meter Reading </FormLabel>
                <TextField
                  error={
                    patchForm.touched.meterReading &&
                    Boolean(patchForm.errors.meterReading)
                  }
                  helperText={
                    patchForm.touched.meterReading &&
                    patchForm.errors.meterReading
                  }
                  id="meterReading"
                  name="meterReading"
                  type="number"
                  value={patchForm?.values?.meterReading}
                  onChange={patchForm.handleChange}
                  sx={{ width: "90%" }}
                  size="small"
                  variant="standard"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ElectricMeterIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid
                className="responsive"
                item
                md={6}
                xs={12}
                sx={{ display: "flex", flexDirection: "column", mt: 5 }}
              >
                <FormLabel sx={{ mb: 2 }}>Rent Structure</FormLabel>

                {/* <TextField
                  error={
                    patchForm.touched.discount &&
                    Boolean(patchForm.errors.discount)
                  }
                  helperText={
                    patchForm.touched.discount && patchForm.errors.discount
                  }
                  id="discount"
                  name="discount"
                  type="number"
                  value={patchForm?.values?.discount}
                  onChange={patchForm.handleChange}
                  sx={{ width: "90%" }}
                  size="small"
                  variant="standard"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DiscountIcon />
                      </InputAdornment>
                    ),
                  }}
                /> */}
                <div style={{ width: "90%", marginTop: -15 }}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>Rental details</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {/* <Typography>Verify Details</Typography> */}
                      {/* ------------------------------------------- */}
                      {/* <Typography>Rent :</Typography> */}

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-around",
                          backgroundColor: "ghostwhite",
                          boxShadow: "0px 2px 2px 0px #00000070",
                          p: 2,
                          borderRadius: 1,
                          color: "gray",
                          fontFamily: "popins",
                        }}
                      >
                        <Typography>Date of joining</Typography>
                        <Typography>
                          {query?.data?.data?.registeredDate.split("T")[0]}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-around",
                          backgroundColor: "ghostwhite",
                          boxShadow: "0px 2px 2px 0px #00000070",
                          p: 2,
                          borderRadius: 1,
                          color: "gray",
                          // zoom:"78%",
                          fontSize: "10px",
                          mt: 1,
                        }}
                      >
                        <Typography>Left over days</Typography>
                        <Typography>{dueRent.remainingDays}</Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-around",
                          backgroundColor: "ghostwhite",
                          boxShadow: "0px 2px 2px 0px #00000070",
                          p: 2,
                          borderRadius: 1,
                          color: "gray",
                          // zoom:"78%",
                          fontSize: "10px",
                          mt: 1,
                        }}
                      >
                        <Typography>Due payment</Typography>
                        <Typography>{dueRent.remainingRent}</Typography>
                      </Box>
                      {/* -------------------------------------------- */}
                    </AccordionDetails>
                  </Accordion>
                </div>
              </Grid>
              <Grid
                className="responsive"
                item
                md={6}
                xs={12}
                sx={{ display: "flex", flexDirection: "column", mt: 5 }}
              >
                <FormLabel sx={{ mb: 2 }}>security</FormLabel>

                <TextField
                  error={
                    patchForm.touched.discount &&
                    Boolean(patchForm.errors.security)
                  }
                  helperText={
                    patchForm.touched.security && patchForm.errors.security
                  }
                  id="security"
                  name="security"
                  type="number"
                  defaultValue={
                    query.data.data.roomPreference == "double"
                      ? rentQuery?.data?.data?.data[0].doubble
                      : rentQuery?.data?.data?.data[0].tripple
                  }
                  onChange={patchForm.handleChange}
                  sx={{ width: "90%" }}
                  size="small"
                  variant="standard"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <GppMaybeIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid
                className="responsive"
                item
                md={6}
                xs={12}
                sx={{ display: "flex", flexDirection: "column", mt: 6 }}
              >
                <FormLabel sx={{ mb: 2 }}>Remark</FormLabel>

                <TextField
                  multiline
                  error={
                    patchForm.touched.remark && Boolean(patchForm.errors.remark)
                  }
                  helperText={
                    patchForm.touched.remark && patchForm.errors.remark
                  }
                  id="remark"
                  name="remark"
                  value={patchForm?.values?.remark}
                  onChange={patchForm.handleChange}
                  sx={{ width: "90%" }}
                  size="small"
                  variant="standard"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CommentIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <LoadingButton
              fullWidth
              // onClick={() => console.log("xxx----->", router.query.id)}
              disabled={patch.isLoading}
              loading={patch.isLoading}
              type="submit"
              sx={{
                backgroundColor: "#ff855f",
                color: "white",
                // width: "50%",
                fontSize: 16,
                m: "auto",
                mt: 5,
                borderRadius: "100px",
                p: 2,
                "&:hover": {
                  color: "#ff855f",
                  fontWeight: "bolder",
                  border: "2px solid #ff855f",
                  backgroundColor: "white",
                },
              }}
            >
              Register a user
            </LoadingButton>
          </Box>
        </form>
      </Container>
    </>
  );
}

RegisterUser.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;