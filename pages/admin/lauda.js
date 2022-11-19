import { Box } from "@mui/material";
import DashboardLayout from "../../components/layout/dashboard-layout";

export default function Lauda() {
  return (
    <Box
      container
      sx={{
        backgroundColor: "pink",
      }}
    >
      <h3>Another one ....</h3>
    </Box>
  );
}

Lauda.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
