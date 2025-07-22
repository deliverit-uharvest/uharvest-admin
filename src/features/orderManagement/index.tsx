import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
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

const OrderManagement = () => {
  const navigate = useNavigate();

  interface Status {
    id: number;
    name: string;
  }

  const [categories, setCategories] = useState<Orders[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [statusList, setStatusList] = useState<Status[]>([]);

  const columns: GridColDef[] = [
    {
      field: "created_at",
      headerName: "Date",
      flex: 1,
      sortable: false,
    },
    {
      field: "unique_id",
      headerName: "Order Id",
      flex: 2,
    },
    {
      field: "statusName",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <span>{params.row.statusHistory?.[0]?.status?.name || "No Status"}</span>
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
      field: "qty",
      headerName: "Qty",
      flex: 1,
      renderCell: (params) => (
        <span>{params.row.items?.[0]?.quantity ?? "No Data"}</span>
      ),
    },
    {
      field: "mobile",
      headerName: "Mobile",
      flex: 1,
      renderCell: (params) => (
        <span>{params.row.customer?.mobile ?? "No Data"}</span>
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
                            status: statusList.find((s) => s.id === newStatusId) || {
                              id: newStatusId,
                              name: "Unknown", // fallback if not found
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
                          //backgroundColor: "#1976d2",
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
    const confirm = window.confirm("Are you sure you want to delete this order?");
    if (!confirm) return;

    try {
      await deleteOrders(id);
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
    } catch (err) {
      toast("Something went wrong while deleting.");
    }
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const res = await fetchOrders();
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

    loadCategories();
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
          Orders
        </Typography>
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

export default OrderManagement;
