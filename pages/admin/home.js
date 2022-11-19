import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Button, Typography, Container } from "@mui/material";
import Image from "next/image";
import DashboardLayout from "../../components/layout/dashboard-layout";
import { useSidebarOpen } from "../../context/sidebarOpen";
import { useController } from "../../controller/user";
import Loading from "../../components/loading";
import { DataGrid, gridClasses, GridToolbar } from "@mui/x-data-grid";
import Table from "../../components/table";
import { useRouter } from "next/router";
//==========================================================
export default function Home(props) {
  const router = useRouter();
  const { sidebarOpen, setSidebarOpen } = useSidebarOpen();
  const theme = useTheme();
  const { query } = useController();

  if (query.isLoading) {
    return <Loading />;
  }

  console.log("Query ---->", query.data.data.user);
  //===================================================
  const columns = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      renderCell: (params) => (
        <p style={{ color: "black", fontWeight: 600, fontFamily: "poppins" }}>
          {params.value}
        </p>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 300,
      renderCell: (params) => (
        <p style={{ color: "black", fontWeight: 500, fontFamily: "poppins" }}>
          {params.value}
        </p>
      ),
    },
    {
      field: "phone",
      headerName: "Mobile",
      minWidth: 150,
      renderCell: (params) => (
        <p style={{ color: "black", fontFamily: "poppins" }}>{params.value}</p>
      ),
    },
    {
      field: "edit",
      headerName: "Edit",
      minWidth: 150,
      editable: true,
      renderCell: (params) => (
        <Button
          sx={{
            backgroundColor: "white",
            border: "1px solid #ff855f",
            color: "#ff855f",
          }}
          variant="outlined"
          onClick={() => {
            // console.log("------>",params.id)
            router.push(`/admin/register/?id=${params.id}`);
          }}
        >
          Register
        </Button>
      ),
      flex: 1,
    },
  ];

  //========================================================

  return (
    <Box
      sx={{
        ...(sidebarOpen && {
          width: "calc(100% + 250px)",
        }),
      }}
    >
      {/* ==========  Main_Content =========================== */}

      <Container>
        <Typography
          variant="h5"
          sx={[theme.custom.typography.h1, { mb: 5, mt: 5 }]}
        >
          Newly registered Users :
        </Typography>

        <Box sx={{ height: 400, minWidth: "100%" }}>
          <Table rows={query?.data?.data?.user} columns={columns} />
        </Box>
      </Container>
    </Box>
  );
}
Home.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
