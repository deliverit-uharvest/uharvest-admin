import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Checkbox,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";

import { fetchOrganisation, Organisation } from "../../app/services/OrganisationService";
import {
  fetchProducts,
  updateProductMapper,
  productOrganisationUnMap,
} from "../../app/services/ProductService";

interface Product {
  id: number;
  name: string;
  status: string;
  quantity: number;
  sku: string;
  is_active: boolean;
  base_price?: string;
  category?: {
    id: number;
    name: string;
  };
  product_mappers?: {
    id: number;
    custom_price?: number;
    start_date?: string;
    end_date?: string;
  }[];
}

const CustomProduct = () => {
  const [organisations, setOrganisations] = useState<Organisation[]>([]);
  const [orgId, setOrgId] = useState<number | "">("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
  const [openUnmapDialog, setOpenUnmapDialog] = useState(false);
  const [selectedOrgIds, setSelectedOrgIds] = useState<number[]>([]);

  const [openEdit, setOpenEdit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [customPrice, setCustomPrice] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const allSelected = products.length > 0 && selectedProductIds.length === products.length;

  useEffect(() => {
    const loadOrganisations = async () => {
      try {
        const res = await fetchOrganisation();
        if (res?.status === "success") {
          setOrganisations(res.data);
        } else {
          toast.error("Failed to load organisations");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load organisations");
      }
    };
    loadOrganisations();
  }, []);

  useEffect(() => {
    if (orgId) getProducts(orgId);
  }, [orgId]);

  const getProducts = async (orgId: number) => {
    try {
      setLoading(true);
      const res = await fetchProducts({ org_id: orgId });
      if (res?.status === "success" && Array.isArray(res.data)) {
        setProducts(res.data);
      } else {
        toast.error("Failed to load products");
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Something went wrong while fetching products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (product: Product) => {
    const mapper = product.product_mappers?.[0];
    setSelectedProduct(product);
    setCustomPrice(mapper?.custom_price?.toString() ?? "");
    setStartDate(mapper?.start_date ?? "");
    setEndDate(mapper?.end_date ?? "");
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelectedProduct(null);
  };

  const handleSubmitEdit = async () => {
    const mapperId = selectedProduct?.product_mappers?.[0]?.id;
    if (!mapperId) {
      toast.error("Missing product mapper ID");
      return;
    }

    try {
      const payload = {
        custom_price: Number(customPrice),
        start_date: startDate,
        end_date: endDate,
      };

      const res = await updateProductMapper(mapperId, payload);
      if (res?.data.status === "success") {
        toast.success("Product mapping updated successfully");
        handleCloseEdit();
        getProducts(Number(orgId));
      } else {
        toast.error("Failed to update mapping");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error submitting data");
    }
  };

  const getDisplayPrice = (product: Product): string => {
      const mapper = product.product_mappers?.[0];

      const today = new Date();
      today.setHours(0, 0, 0, 0); // Clear time

      const start = mapper?.start_date ? new Date(mapper.start_date) : null;
      const end = mapper?.end_date ? new Date(mapper.end_date) : null;

      if (start) start.setHours(0, 0, 0, 0);
      if (end) end.setHours(0, 0, 0, 0);

      const isActive =
        mapper?.custom_price &&
        start &&
        today >= start &&
        (!end || today <= end);

      return isActive
        ? mapper.custom_price?.toString() ?? "-"
        : product.base_price?.toString() ?? "-";
    };

  const toggleProductSelection = (id: number) => {
    setSelectedProductIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleSelectAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const allIds = products.map((p) => p.id);
      setSelectedProductIds(allIds);
    } else {
      setSelectedProductIds([]);
    }
  };

  const toggleOrgSelection = (id: number) => {
    setSelectedOrgIds((prev) =>
      prev.includes(id) ? prev.filter((oid) => oid !== id) : [...prev, id]
    );
  };

  const handleOpenUnmapDialog = () => {
    if (selectedProductIds.length === 0) return toast.warn("Select products to unmap");
    setOpenUnmapDialog(true);
  };

  const handleConfirmUnmap = async () => {
    try {
      const res = await productOrganisationUnMap({
        org_ids: selectedOrgIds,
        product_ids: selectedProductIds,
      });
      if (res?.data.status === "success") {
        toast.success("Unmapped successfully");
        setOpenUnmapDialog(false);
        setSelectedProductIds([]);
        setSelectedOrgIds([]);
        if (orgId) getProducts(orgId);
      } else {
        toast.error("Failed to unmap");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error during unmapping");
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h5" mb={2}>
        Products by Organisation
      </Typography>

      <FormControl sx={{ minWidth: 300, mb: 3 }}>
        <InputLabel>Select Organisation</InputLabel>
        <Select
          value={orgId}
          onChange={(e) => setOrgId(Number(e.target.value))}
          label="Select Organisation"
        >
          <MenuItem value="">-- Select Organisation --</MenuItem>
          {organisations.map((org) => (
            <MenuItem key={org.id} value={org.id}>
              {org.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box mb={2}>
        <Button
          variant="contained"
          color="error"
          disabled={selectedProductIds.length === 0}
          onClick={handleOpenUnmapDialog}
        >
          Unmap Organisation
        </Button>
      </Box>

      {loading ? (
        <Box mt={2}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={allSelected}
                    indeterminate={
                      selectedProductIds.length > 0 &&
                      selectedProductIds.length < products.length
                    }
                    onChange={handleSelectAllChange}
                  />
                </TableCell>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>SKU</strong></TableCell>
                <TableCell><strong>Quantity</strong></TableCell>
                <TableCell><strong>Category</strong></TableCell>
                <TableCell><strong>Price</strong></TableCell>
                <TableCell><strong>Action</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7}>No products available</TableCell>
                </TableRow>
              ) : (
                products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedProductIds.includes(product.id)}
                        onChange={() => toggleProductSelection(product.id)}
                      />
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.sku}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>{product.category?.name}</TableCell>
                    <TableCell>{getDisplayPrice(product)}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEditClick(product)} size="small">
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Edit Dialog */}
      <Dialog open={openEdit} onClose={handleCloseEdit} fullWidth maxWidth="sm">
        <DialogTitle>Update Product Info</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Custom Price"
            value={customPrice}
            onChange={(e) => setCustomPrice(e.target.value)}
            type="number"
            fullWidth
          />
          <TextField
            label="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} color="secondary">
            Close
          </Button>
          <Button onClick={handleSubmitEdit} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Unmap Dialog */}
      <Dialog open={openUnmapDialog} onClose={() => setOpenUnmapDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>Unmap Organisations</DialogTitle>
        <DialogContent>
          <Typography>Select organisations to unmap:</Typography>
          <Box mt={2}>
            {organisations.map((org) => (
              <Box key={org.id}>
                <Checkbox
                  checked={selectedOrgIds.includes(org.id)}
                  onChange={() => toggleOrgSelection(org.id)}
                />
                {org.name}
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUnmapDialog(false)}>Cancel</Button>
          <Button
            onClick={handleConfirmUnmap}
            disabled={selectedOrgIds.length === 0 || selectedProductIds.length === 0}
            variant="contained"
            color="error"
          >
            Unmap
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CustomProduct;
