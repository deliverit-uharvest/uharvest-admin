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
  fetchOrganisation,
  Organisation,
} from "../../app/services/OrganisationService";

const OrganisationList = () => {
  const navigate = useNavigate();

  interface Status {
    id: number;
    name: string;
  }

  const [categories, setCategories] = useState<Organisation[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Organisation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState("");

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      sortable: false,
    },
    {
      field: "legalname",
      headerName: "Legal Name",
      flex: 2,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "mobile",
      headerName: "Mobile",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "pin_code",
      headerName: "Pincode",
      flex: 1,
    },
    {
      field: "pan_number",
      headerName: "Pan Number",
      flex: 1,
    },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const loadOrders = async () => {
    try {
      setLoading(true);
      const res = await fetchOrganisation({});
      if (res.status === "success") {
        setCategories(res.data);
        setFilteredCategories(filterRows(res.data, searchText));
      } else {
        toast(res.message);
      }
    } catch (err) {
      toast("Failed to load organisations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const filterRows = (rows: Organisation[], query: string) => {
    if (!query) return rows;

    const lowercasedQuery = query.toLowerCase();

    return rows.filter((row) =>
      Object.values(row).some((value) =>
        value?.toString().toLowerCase().includes(lowercasedQuery)
      )
    );
  };

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight={600}>
          Organisation
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ backgroundColor: "#fcb500", color: "#000", fontWeight: 600 }}
          onClick={() => handleNavigate("/organisation/add")}
        >
          Add Organisation
        </Button>
      </Box>

      {/* Search Field */}
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
        {categories.length > 0 ? (
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

export default OrganisationList;
