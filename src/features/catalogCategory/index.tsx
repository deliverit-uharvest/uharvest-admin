import React from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Checkbox,
  IconButton,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
// category/
const CategoryPage = () => {
  const rows = [
    {
      id: 1,
      name: "Kitchen Equipment's",
      rank: 0,
      status: true,
      image:
        "https://img.freepik.com/free-photo/abstract-digital-grid-black-background_53876-97647.jpg",
    },
    {
      id: 2,
      name: "Beverage & Cooler",
      rank: 0,
      status: true,
      image:
        "https://img.freepik.com/free-photo/abstract-digital-grid-black-background_53876-97647.jpg",
    },
    {
      id: 3,
      name: "Edible Oil",
      rank: 1,
      status: false,
      image:
        "https://img.freepik.com/free-photo/abstract-digital-grid-black-background_53876-97647.jpg",
    },
    // Add more rows as needed
  ];

  const columns: GridColDef[] = [
    {
      field: "image",
      headerName: "Image",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Avatar src={params.value} alt={params.row.name} />
      ),
    },
    { field: "name", headerName: "Name", flex: 2 },
    { field: "rank", headerName: "Rank", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Checkbox checked={params.value} color="primary" />
      ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      sortable: false,
      renderCell: () => (
        <Box display="flex" gap={1}>
          <IconButton size="small" color="primary">
            <EditIcon />
          </IconButton>
          <IconButton size="small" color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight={600}>
          Categories
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ backgroundColor: "#fcb500", color: "#000", fontWeight: 600 }}
        >
          Add Category
        </Button>
      </Box>

      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 20, page: 0 },
          },
        }}
        pageSizeOptions={[20, 50, 100]}
        checkboxSelection={false}
        disableRowSelectionOnClick

        sx={{
          backgroundColor: "#fff",
          borderRadius: 2,
          p: 2,
        }}
      />
    </Box>
  );
};

export default CategoryPage;
