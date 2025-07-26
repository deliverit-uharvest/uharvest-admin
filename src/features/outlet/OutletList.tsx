import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  TextField,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { fetchOutlet, Outlet } from "../../app/services/OutletService";
import TableSkeleton from "../loader/TableSkeleton"; // ✅ Importing loader

const OutletList = () => {
  const navigate = useNavigate();

  interface Status {
    id: number;
    name: string;
  }

  const [categories, setCategories] = useState<Outlet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [statusList, setStatusList] = useState<Status[]>([]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<number | "">("");
  const [orderId, setOrderId] = useState("");

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "mobile", headerName: "Mobile", flex: 1 },
    { field: "pan_number", headerName: "Pan Number", flex: 1 },
    { field: "gst_number", headerName: "Gst Number", flex: 1 },
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

  const loadOrders = async () => {
    try {
      setLoading(true);
      const res = await fetchOutlet({
        startDate,
        endDate,
        statusId: selectedStatus,
        orderId,
      });
      if (res.status === "success") {
        setCategories(res.data);
      } else {
        toast(res.message);
      }
    } catch (err) {
      toast("Failed to load outlet.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
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

      {/* Filters */}
      <Box display="flex" flexWrap="wrap" gap={2} mb={2}>
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <Button variant="contained" onClick={loadOrders}>
          Apply Filters
        </Button>
      </Box>

      <Box sx={{ width: "100%" }}>
        {loading ? (
          <TableSkeleton rows={6} columns={9} /> // ✅ Applied loader here
        ) : categories.length > 0 ? (
          <DataGrid
            autoHeight
            loading={loading}
            rows={categories}
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
        ) : (
          <Typography>No data found</Typography>
        )}
      </Box>
    </Box>
  );
};

export default OutletList;
