import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {
  fetchOutlet,
  Outlet,
} from "../../app/services/OutletService";
import TableSkeleton from "../loader/TableSkeleton"; // ✅ Importing loader

const OutletList = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Outlet[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Outlet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState("");

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1, sortable: false },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "mobile", headerName: "Mobile", flex: 1 },
    { field: "pan_number", headerName: "Pan Number", flex: 1 },
    { field: "gst_number", headerName: "GST Number", flex: 1 },
    { field: "shipping_addressline1", headerName: "Address", flex: 1 },
    { field: "shippingpincode", headerName: "Pincode", flex: 1 },
    {
      field: "shippingCity",
      headerName: "City",
      flex: 1,
      renderCell: (params) => (
        <span>{params.row.shippingCity?.name ?? "No Data"}</span>
      ),
    },
    {
      field: "shippingState",
      headerName: "State",
      flex: 1,
      renderCell: (params) => (
        <span>{params.row.shippingState?.name ?? "No Data"}</span>
      ),
    },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const loadOutlets = async () => {
    try {
      setLoading(true);
      const res = await fetchOutlet({});
      if (res.status === "success") {
        setCategories(res.data);
        setFilteredCategories(filterRows(res.data, searchText));
      } else {
        toast(res.message);
      }
    } catch (err) {
      toast("Failed to load outlet.");
    } finally {
      setLoading(false);
    }
  };

  const filterRows = (rows: Outlet[], query: string) => {
    if (!query) return rows;
    const lowercasedQuery = query.toLowerCase();
    return rows.filter((row) =>
      Object.values(row).some((value) =>
        typeof value === "object"
          ? JSON.stringify(value).toLowerCase().includes(lowercasedQuery)
          : value?.toString().toLowerCase().includes(lowercasedQuery)
      )
    );
  };

  useEffect(() => {
    loadOutlets();
  }, []);

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight={600}>
          Outlet
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ backgroundColor: "#fcb500", color: "#000", fontWeight: 600 }}
          onClick={() => handleNavigate("/organisation/outlet/add")}
        >
          Add Outlet
        </Button>
      </Box>

      {/* Search Bar */}
      <Box display="flex" justifyContent="flex-start" mb={2}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchText}
          onChange={(e) => {
            const value = e.target.value;
            setSearchText(value);
            setFilteredCategories(filterRows(categories, value));
          }}
          sx={{ minWidth: 300 }}
        />
      </Box>

      <Box sx={{ width: "100%" }}>
        {loading ? (
          <TableSkeleton rows={6} columns={9} /> // ✅ Applied loader here
        ) : categories.length > 0 ? (
          <DataGrid
            autoHeight
            loading={loading}
            rows={filteredCategories}
            columns={columns}
            getRowId={(row) => row.id}
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
        ) : loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <Typography>No data found</Typography>
        )}
      </Box>
    </Box>
  );
};

export default OutletList;
