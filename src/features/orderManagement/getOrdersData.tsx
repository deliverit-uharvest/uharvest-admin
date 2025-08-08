import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  CircularProgress,
  TextField,
} from "@mui/material";
import { getOrdersById } from "../../app/services/OrdersService";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

// ✅ Interfaces (moved to the top)
interface Order {
  id: number;
  unique_id: string;
  total_amount: string;
  created_at: string;
  user: {
    name: string;
    email: string;
    mobile: string;
  };
  statusHistory: {
    id: number;
    status: {
      id: string;
      name: string;
    };
    created_at: string;
  }[];
  items: {
    product_id: number;
    quantity: number;
    price: string;
    total: string;
    product: {
      name: string;
      sku: string;
      packaging_type: string;
      base_unit: string;
      base_mrp: string;
      quantity: string
    };
  }[];
}

const GetOrdersData: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantities, setQuantities] = useState<{ [index: number]: number }>({});

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (!id) return;
        const res = await getOrdersById(Number(id));
        if (res.status === "success") {
          setOrderData(res.data);

          // Set initial quantity state
          const qtyMap = res.data.items.reduce((acc: any, item: any, idx: number) => {
            acc[idx] = item.quantity;
            return acc;
          }, {});
          setQuantities(qtyMap);
        } else {
          toast("Failed to fetch order");
        }
      } catch (error) {
        toast("Failed to fetch order");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const handleQuantityChange = (index: number, value: string) => {
    const parsed = parseInt(value, 10);
    if (!isNaN(parsed) && parsed >= 0) {
      setQuantities({ ...quantities, [index]: parsed });
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (!orderData) return null;

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight={600} mb={2}>
        Order Details
      </Typography>

      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1"><strong>Order ID:</strong> {orderData.unique_id}</Typography>
        <Typography variant="subtitle1"><strong>Date:</strong> {new Date(orderData.created_at).toLocaleDateString()}</Typography>
        <Typography variant="subtitle1"><strong>Total Amount:</strong> ₹{orderData.total_amount}</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom>Customer Info</Typography>
        <Typography><strong>Name:</strong> {orderData.user.name}</Typography>
        <Typography><strong>Email:</strong> {orderData.user.email}</Typography>
        <Typography><strong>Mobile:</strong> {orderData.user.mobile}</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom>Status History</Typography>
        {orderData.statusHistory.map((status) => (
          <Box key={status.id} mb={1}>
            <Typography>
              <strong>{status.status.name}</strong> - {new Date(status.created_at).toLocaleString()}
            </Typography>
          </Box>
        ))}
      </Paper>

      <Typography variant="h6" mb={1}>
        Product Details
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Product Name</strong></TableCell>
              <TableCell><strong>SKU</strong></TableCell>
              <TableCell><strong>Packaging</strong></TableCell>
              <TableCell><strong>MRP</strong></TableCell>
              <TableCell><strong>Quantity</strong></TableCell>
              <TableCell><strong>Price</strong></TableCell>
              <TableCell><strong>Total</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderData.items.map((item: Order["items"][0], index: number) => {
              const quantity = quantities[index] ?? item.quantity;
              const total = (parseFloat(item.price) * quantity).toFixed(2);

              return (
                <TableRow key={index}>
                  <TableCell>{item.product.name}</TableCell>
                  <TableCell>{item.product.sku}</TableCell>
                  <TableCell>{item.product.packaging_type}</TableCell>
                  <TableCell>₹{item.product.base_mrp}</TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(index, e.target.value)}
                      size="small"
                      InputProps={{ inputProps: { min: 0 } }}
                      sx={{ width: 80 }}
                    />{" "}
                    {item.product.base_unit}
                  </TableCell>
                  <TableCell>₹{item.price}</TableCell>
                  <TableCell>₹{total}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default GetOrdersData;
