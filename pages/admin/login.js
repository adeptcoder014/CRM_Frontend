import {
  Box,
  Container,
  TextField,
  Typography,
  FormLabel,
  InputAdornment,
  Grid,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Image from "next/image";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
  //============================================
export default function Login() {
  return (
    <>
      <Container
        maxWidth="xl"
        sx={{ backgroundColor: "#ffede1" }}
      >
        <Grid
          container
          maxWidth="md"
          sx={{
            m: "auto",
            // backgroundColor:"gray",
            // mt: 5,
            display: "flex",
          }}
        >
          <Grid
            item
            xl={6}
            lg={6}
            md={6}
            sm={12}
            xs={12}
            sx={{
              // minWidth: "50%",
              boxShadow: "0px 6px 8px 0px #f3c7ab",
              backgroundColor: "white",
              p: 5,
              display: "flex",
              flexDirection: "column",
              gap: 5,
              mt: 5,
            }}
          >
            <Typography variant="h5">OFS Admin Center</Typography>
            <FormLabel sx={{ mb: -4 }}>Email</FormLabel>
            <TextField
              // error={addForm.touched.name && Boolean(addForm.errors.name)}
              // helperText={addForm.touched.name && addForm.errors.name}
              id="name"
              name="name"
              // value={addForm.values.name}
              // onChange={addForm.handleChange}
              sx={{
                width: "90%",
                backgroundColor: "#f6f8fb",
                color: "white",
              }}
              size="small"
              // variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />{" "}
            <FormLabel sx={{ mb: -4 }}>Password</FormLabel>
            <TextField
              // error={addForm.touched.name && Boolean(addForm.errors.name)}
              // helperText={addForm.touched.name && addForm.errors.name}
              id="name"
              name="name"
              // value={addForm.values.name}
              // onChange={addForm.handleChange}
              sx={{
                backgroundColor: "#f6f8fb",

                width: "90%",
                "& label.Mui-focused": {
                  color: "red",
                },
              }}
              size="small"
              // variant="standard"
              InputProps={{
                startAdornment: (
                  <>
                    <InputAdornment position="start">
                      <KeyIcon />
                    </InputAdornment>
                    {/* <InputAdornment position="end">
                      <VisibilityIcon />
                    </InputAdornment> */}
                  </>
                ),
              }}
            />{" "}
            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{
                  fontFamily: "poppins",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Forgot Password ?
              </Typography>

              <LoadingButton
                // disabled={add.isLoading}
                // loading={add.isLoading}
                type="submit"
                sx={{
                  backgroundColor: "#f76334",
                  color: "white",
                  width: "50%",
                  fontSize: 16,
                  m: "auto",
                  // mt: 1,
                  borderRadius: "100px",

                  "&:hover": {
                    color: "red",
                    border: "1px solid #ff7f56",
                    backgroundColor: "white",
                  },
                }}
              >
                Login
              </LoadingButton>
            </Box>
            {/* <LoadingButton
              // disabled={add.isLoading}
              // loading={add.isLoading}
              type="submit"
              sx={{
                color: "red",
                border: "1px solid #ff7f56",
                backgroundColor: "white",
                width: "50%",
                fontSize: 16,
                mr: 5,
                alignSelf: "end",
                // mt: 1,
                borderRadius: "100px",
              }}
            >
              Sign up
            </LoadingButton>{" "} */}
            {/* <Typography sx={{ ml: 250, mt: -30, mb: -30 }}>
              Or
            </Typography> */}
          </Grid>
          <Grid
            item
            xl={6}
            lg={6}
            md={6}
            sm={12}
            xs={12}
            sx={{
              // minWidth: "50%",
              backgroundColor: "#ffede1",
              boxShadow: "0px 6px 8px 0px #f3c7ab",

              p: 5,
              display: "flex",
              flexDirection: "column",
              mt: 5,
            }}
          >
            <Image src={"/logo.png"} height={150} width={150} />
            <Typography variant="h5" sx={{ mt: 5 }}>
              One Fine Stay
            </Typography>
            <Typography
              sx={{
                mt: 5,
                fontFamily: "poppins",
              }}
            >
              One Fine Stay is the most advance CRM system which employs
              Blockchain and run on the OFS-coin
            </Typography>
            <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
              <Box
                sx={{
                  color: "#ff9625",
                  // border: "1px solid #ff9625",
                  fontWeight: 500,
                  backgroundColor: "#ffddc7",
                  width: "35%",
                  textAlign: "center",
                  borderRadius: 1,
                  p: 0.8,
                  mt: 5,
                }}
              >
                Blockchain
              </Box>{" "}
              <Box
                sx={{
                  color: "#ff9625",
                  // border: "1px solid #ff9625",
                  fontWeight: 500,
                  backgroundColor: "#ffddc7",
                  width: "35%",
                  textAlign: "center",
                  borderRadius: 1,
                  p: 0.8,
                  mt: 5,
                }}
              >
                OFS Token
              </Box>
            </Box>
          </Grid>{" "}
        </Grid>
      </Container>
    </>
  );
}
