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
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {
  Orders,
  deleteOrders,
  fetchOrders,
  fetchOrdersStatus,
  updateOrderStatus,
} from "../../app/services/OrdersService";

import TableSkeleton from "../loader/TableSkeleton";

const OrderManagement = () => {
  const navigate = useNavigate();

  interface Status {
    id: number;
    name: string;
  }

  const [categories, setCategories] = useState<Orders[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [statusList, setStatusList] = useState<Status[]>([]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [orderId, setOrderId] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<number | "">("");

  const columns: GridColDef[] = [
    {
      field: "created_at",
      headerName: "Date",
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        const dateStr = params.value;
        const formattedDate = new Date(dateStr).toISOString().split("T")[0];
        return <span>{formattedDate}</span>;
      },
    },
    {
      field: "unique_id",
      headerName: "Order Id",
      flex: 2,
      renderCell: (params) => {
        const id = params.value;
        return (
          <span
            style={{ color: "#1976d2", cursor: "pointer", textDecoration: "underline" }}
            onClick={() => navigate(`/orders/${id}`)}
          >
            {id}
          </span>
        );
      },
    },
    {
      field: "statusName",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <span>
          {params.row.statusHistory?.[0]?.status?.name || "No Status"}
        </span>
      ),
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
      renderCell: (params) => (
        <span>{params.row.items?.[0]?.price ?? "No Data"}</span>
      ),
    },
    {
      field: "item",
      headerName: "Item",
      flex: 1,
      renderCell: (params) => (
        <span>{params.row.items?.length ?? "No Data"}</span>
      ),
    },
    {
      field: "qty",
      headerName: "Qty",
      flex: 1,
      renderCell: (params) => {
        const totalQty = params.row.items?.reduce(
          (sum: number, item: any) => sum + (item.quantity || 0),
          0
        );
        return <span>{totalQty ?? "No Data"}</span>;
      },
    },
    {
      field: "mobile",
      headerName: "Mobile",
      flex: 1,
      renderCell: (params) => (
        <span>{params.row.user?.mobile ?? "No Data"}</span>
      ),
    },
    {
      field: "total_amount",
      headerName: "Total Amount",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 2,
      renderCell: (params) => {
        const orderId = params.row.unique_id;
        const currentStatusId = params.row.statusHistory?.[0]?.status?.id || "";

        const handleStatusChange = async (event: any) => {
          const newStatusId = event.target.value;

          try {
            const res = await updateOrderStatus(orderId, newStatusId);

            if (res.status === "success") {
              toast.success("Status updated successfully");
              setCategories((prev) =>
                prev.map((order) =>
                  order.unique_id === orderId
                    ? {
                        ...order,
                        statusHistory: [
                          {
                            status: statusList.find(
                              (s) => s.id === newStatusId
                            ) || {
                              id: newStatusId,
                              name: "Unknown",
                            },
                          },
                        ],
                      }
                    : order
                )
              );
            } else {
              toast.error("Failed to update status");
            }
          } catch (err) {
            toast.error("Error while updating status");
            console.error(err);
          }
        };

        return (
          <Box>
            <FormControl fullWidth size="medium">
              <Select value={currentStatusId} onChange={handleStatusChange}>
                {statusList.map((status) => (
                  <MenuItem key={status.id} value={status.id}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                        }}
                      />
                      {status.name}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        );
      },
    },
  ];

  const handleDelete = async (id: number) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this order?"
    );
    if (!confirm) return;

    try {
      await deleteOrders(id);
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
    } catch (err) {
      toast("Something went wrong while deleting.");
    }
  };

  const loadOrders = async () => {
    try {
      setLoading(true);
      const res = await fetchOrders({
        startDate,
        endDate,
        statusId: selectedStatus === "" ? null : selectedStatus,
        orderId,
      });

      console.log("Order response:", res);

      if (res?.status === "success") {
        const sortedData = res.data.sort(
          (a: Orders, b: Orders) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setCategories(sortedData);
      } else {
        toast(res?.message || "Unknown error");
      }
    } catch (err) {
      console.error("Fetch orders failed", err);
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
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6" fontWeight={600}>
          Orders
        </Typography>
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
          <Select<number | "">
            displayEmpty
            value={selectedStatus}
            onChange={(e) => {
              const value = e.target.value;
              setSelectedStatus(value === "" ? "" : Number(value));
            }}
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
        {loading ? (
          <TableSkeleton rows={8} columns={8} />
        ) : categories.length > 0 ? (
          <DataGrid
            autoHeight
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

export default OrderManagement;
