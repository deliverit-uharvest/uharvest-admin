import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "../../app/services/CategoryService";
import { toast } from "react-toastify";
import {
  changeStatus,
  deleteProduct,
  fetchProducts,
  productOrganisationMap,
} from "../../app/services/ProductService";
import { fetchOrganisation, Organisation } from "../../app/services/OrganisationService";
import TableSkeleton from "../loader/TableSkeleton";

interface Image {
  id: number;
  path: string;
  imagetype: string;
}

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: number;
  name: string;
  sku: string;
  category_id: string;
  is_active: boolean;
  images: Image[];
  category: Category;
}

const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
  const [organisationDialogOpen, setOrganisationDialogOpen] = useState(false);
  const [organisations, setOrganisations] = useState<Organisation[]>([]);
  const [selectedOrgIds, setSelectedOrgIds] = useState<number[]>([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const allSelected = filteredProducts.length > 0 && selectedProductIds.length === filteredProducts.length;

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || String(product.category_id) === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [categoryRes, productRes] = await Promise.all([fetchCategories(), fetchProducts()]);
      if ((categoryRes as any).status === "success") setCategories((categoryRes as any).data);
      if ((productRes as any).status === "success") {
        setProducts((productRes as any).data);
        setFilteredProducts((productRes as any).data);
      }
    } catch (err) {
      toast.error("Error loading data");
    } finally {
      setLoading(false);
    }
  };

  const handleProductCheckboxChange = (id: number) => {
    setSelectedProductIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleSelectAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const allIds = filteredProducts.map((product) => product.id);
      setSelectedProductIds(allIds);
    } else {
      setSelectedProductIds([]);
    }
  };

  const handleOrgCheckboxChange = (id: number) => {
    setSelectedOrgIds((prev) =>
      prev.includes(id) ? prev.filter((oid) => oid !== id) : [...prev, id]
    );
  };

  const handleOpenOrganisationDialog = async () => {
    if (selectedProductIds.length === 0) return toast.warn("Select at least one product");
    try {
      const res = await fetchOrganisation();
      if (res.status === "success") {
        setOrganisations(res.data);
        setSelectedOrgIds([]);
        setOrganisationDialogOpen(true);
      }
    } catch (err) {
      toast.error("Failed to load organisations");
    }
  };

  const handleAttachProductsToOrgs = async () => {
    try {
      const payload = {
        org_ids: selectedOrgIds,
        product_ids: selectedProductIds,
      };
      const res = await productOrganisationMap(payload);
      if (res.data.status === "success") {
        toast.success("Products attached to organisations successfully");
        setOrganisationDialogOpen(false);
        setSelectedProductIds([]);
      } else {
        toast.error("Failed to attach");
      }
    } catch (err) {
      toast.error("Error submitting data");
    }
  };

  const handleToggleStatus = async (productId: number) => {
    try {
      await changeStatus(productId);
      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId ? { ...p, is_active: !p.is_active } : p
        )
      );
      toast("Status changed successfully");
    } catch {
      toast.error("Error updating product status");
    }
  };

  const handleOpenDialog = (id: number) => {
    setSelectedProductId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProductId(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedProductId) return;
    try {
      await deleteProduct(selectedProductId);
      setProducts((prev) =>
        prev.filter((product) => product.id !== selectedProductId)
      );
      toast("Product Deleted");
    } catch {
      toast.error("Failed to Delete product");
    } finally {
      handleCloseDialog();
    }
  };

  const handleUpdate = (id: number) => {
    navigate(`/catalog/product/update/${id}`);
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <TextField
          variant="outlined"
          placeholder="Search by Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
          }}
          sx={{ width: 300 }}
        />

        <Button
          variant="contained"
          sx={{ backgroundColor: "#1976d2", fontWeight: 600 }}
          disabled={selectedProductIds.length === 0}
          onClick={handleOpenOrganisationDialog}
        >
          Map Organisations
        </Button>
      </Box>

      <Box display="flex" gap={2} mb={2}>
        <Box>
          <Typography fontWeight={600} mb={1}>
            Category
          </Typography>
          <Select
            displayEmpty
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            sx={{ width: 200 }}
          >
            <MenuItem value="">Select Category</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>

      {loading ? (
        <TableSkeleton rows={6} columns={7} />
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
                      selectedProductIds.length < filteredProducts.length
                    }
                    onChange={handleSelectAllChange}
                  />
                </TableCell>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>SKU</strong></TableCell>
                <TableCell><strong>Image</strong></TableCell>
                <TableCell><strong>Category</strong></TableCell>
                <TableCell><strong>Stock</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Action</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedProductIds.includes(product.id)}
                      onChange={() => handleProductCheckboxChange(product.id)}
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.sku}</TableCell>
                  <TableCell>
                    <Avatar
                      src={product.images?.[0]?.path || ""}
                      variant="rounded"
                      sx={{ width: 48, height: 48 }}
                    />
                  </TableCell>
                  <TableCell>{product.category?.name}</TableCell>
                  <TableCell>--</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={product.is_active}
                      onChange={() => handleToggleStatus(product.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton color="info" onClick={() => handleUpdate(product.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleOpenDialog(product.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={organisationDialogOpen} onClose={() => setOrganisationDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Select Organisations</DialogTitle>
        <DialogContent dividers>
          {organisations.length === 0 ? (
            <Typography>No organisations found.</Typography>
          ) : (
            <Table>
              <TableBody>
                {organisations.map((org) => (
                  <TableRow key={org.id}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedOrgIds.includes(org.id)}
                        onChange={() => handleOrgCheckboxChange(org.id)}
                      />
                    </TableCell>
                    <TableCell>{org.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOrganisationDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAttachProductsToOrgs}
            disabled={selectedOrgIds.length === 0 || selectedProductIds.length === 0}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductList;
