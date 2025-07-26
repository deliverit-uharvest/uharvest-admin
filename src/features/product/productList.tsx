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
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "../../app/services/CategoryService";
import { toast } from "react-toastify";
import {
  changeStatus,
  deleteProduct,
  fetchProducts,
} from "../../app/services/ProductService";
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

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

  const loadData = async () => {
    setLoading(true);
    try {
      const [categoryRes, productRes] = await Promise.all([
        fetchCategories(),
        fetchProducts(),
      ]);

      if ((categoryRes as any).status === "success") {
        setCategories((categoryRes as any).data);
      } else {
        toast.error("Failed to load categories");
      }

      if ((productRes as any).status === "success") {
        const data = (productRes as any).data;
        setProducts(data);
        setFilteredProducts(data);
      } else {
        toast.error((productRes as any).data?.message || "Failed to load products");
      }
    } catch (error) {
      toast.error("Something went wrong while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        !selectedCategory ||
        String(product.category_id) === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  const handleNavigate = (path: string) => navigate(path);

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
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
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
          startIcon={<AddIcon />}
          sx={{ backgroundColor: "#fcb500", color: "#000", fontWeight: 600 }}
          onClick={() => handleNavigate("/catalog/product/add")}
        >
          Add Product
        </Button>
      </Box>

      {/* Category Filter */}
      <Box display="flex" gap={2} mb={3}>
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

      {/* Table or Skeleton Loader */}
      {loading ? (
        <TableSkeleton rows={6} columns={7} />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
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
                    <IconButton
                      color="info"
                      onClick={() => handleUpdate(product.id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleOpenDialog(product.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {filteredProducts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No products found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Delete Confirmation Dialog */}
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
