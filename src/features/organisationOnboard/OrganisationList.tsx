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

import {
  fetchOrganisation,
  fetchOrdersStatus,
  updateOrderStatus,
  Organisation,
} from "../../app/services/OrganisationService";


const OrganisationList = () => {
  const navigate = useNavigate();

  interface Status {
    id: number;
    name: string;
  }

  const [categories, setCategories] = useState<Organisation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [statusList, setStatusList] = useState<Status[]>([]);

  // Filter states
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<number | "">("");
  const [orderId, setOrderId] = useState("");

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
    // {
    //   field: "action",
    //   headerName: "Action",
    //   flex: 2,
    //   renderCell: (params) => {
    //     const orderId = params.row.unique_id;
    //     const currentStatusId = params.row.statusHistory?.[0]?.status?.id || "";

    //     const handleStatusChange = async (event: any) => {
    //       const newStatusId = event.target.value;

    //       try {
    //         const res = await updateOrderStatus(orderId, newStatusId);

    //         if (res.status === "success") {
    //           toast.success("Status updated successfully");

    //           setCategories((prev) =>
    //             prev.map((order) =>
    //               order.unique_id === orderId
    //                 ? {
    //                     ...order,
    //                     statusHistory: [
    //                       {
    //                         status: statusList.find((s) => s.id === newStatusId) || {
    //                           id: newStatusId,
    //                           name: "Unknown",
    //                         },
    //                       },
    //                     ],
    //                   }
    //                 : order
    //             )
    //           );
    //         } else {
    //           toast.error("Failed to update status");
    //         }
    //       } catch (err) {
    //         toast.error("Error while updating status");
    //         console.error(err);
    //       }
    //     };

    //     return (
    //       <Box>
    //         <FormControl fullWidth size="medium">
    //           <Select value={currentStatusId} onChange={handleStatusChange}>
    //             {statusList.map((status) => (
    //               <MenuItem key={status.id} value={status.id}>
    //                 <Box display="flex" alignItems="center" gap={1}>
    //                   <Box
    //                     sx={{
    //                       width: 10,
    //                       height: 10,
    //                       borderRadius: "50%",
    //                     }}
    //                   />
    //                   {status.name}
    //                 </Box>
    //               </MenuItem>
    //             ))}
    //           </Select>
    //         </FormControl>
    //       </Box>
    //     );
    //   },
    // },
  ];

  // const handleDelete = async (id: number) => {
  //   const confirm = window.confirm("Are you sure you want to delete this order?");
  //   if (!confirm) return;

  //   try {
  //     await deleteOrganisation(id);
  //     setCategories((prev) => prev.filter((cat) => cat.id !== id));
  //   } catch (err) {
  //     toast("Something went wrong while deleting.");
  //   }
  // };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const loadOrders = async () => {
    try {
      setLoading(true);
      const res = await fetchOrganisation({
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
      toast("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    const loadStatuses = async () => {
      try {
        const res = await fetchOrdersStatus();
        if (res.status === "success") {
          setStatusList(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch status list", error);
      }
    };

    loadStatuses();
  }, []);

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
          onClick={() => handleNavigate("/organisationOnboard/add-organisation")}
        >
          Add Organisation
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
        <TextField
          label="Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <FormControl sx={{ minWidth: 120 }}>
          <Select
            displayEmpty
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as number | "")}
          >
            <MenuItem value="">All Status</MenuItem>
            {statusList.map((status) => (
              <MenuItem key={status.id} value={status.id}>
                {status.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" onClick={loadOrders}>
          Apply Filters
        </Button>
      </Box>

      <Box sx={{ width: "100%" }}>
        {categories.length > 0 ? (
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
