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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
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

interface Image {
  id: number;
  path: string;
  imagetype: string;
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

interface Category {
  id: string;
  name: string;
}

const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const getCategories = async () => {
    try {
      const res = await fetchCategories();
      if ((res as any).status === "success") {
        setCategories((res as any).data);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to fetch categories");
    }
  };

  const getProducts = async () => {
    try {
      const res = await fetchProducts();
      if ((res as any).status === "success") {
        setProducts((res as any).data);
      } else {
        toast.error((res as any).data?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong?");
    }
  };
  useEffect(() => {
    getCategories();
    getProducts();
  }, []);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        !selectedCategory ||
        Number(product.category_id) === Number(selectedCategory);

      return matchesSearch && matchesCategory;
    });

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  const handleToggleStatus = async (productId: number) => {
    try {
      await changeStatus(productId);

      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId ? { ...p, is_active: !p.is_active } : p
        )
      );
      toast("Status changed successfully");
    } catch (error) {
      toast.error("Error updating product status");
    }
  };

  const handleDeleteProduct = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((product) => product.id !== id));
      toast("Product Deleted");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "Failed to Delete product");
      } else {
        toast.error("Failed to Delete product");
      }
    }
  };

  const handleUpdate = async (id: number) => {
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

      {/*  Category Filter */}
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

      {/* 📋 Product Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>SKU</strong>
              </TableCell>
              <TableCell>
                <strong>Image</strong>
              </TableCell>
              <TableCell>
                <strong>Category</strong>
              </TableCell>
              <TableCell>
                <strong>Stock</strong>
              </TableCell>{" "}
              {/* Placeholder */}
              <TableCell>
                <strong>Status</strong>
              </TableCell>
              <TableCell>
                <strong>Action</strong>
              </TableCell>
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
                <TableCell>--</TableCell>{" "}
                {/* Replace with actual stock from backend if available */}
                <TableCell>
                  <Checkbox
                    checked={product.is_active}
                    onChange={() => handleToggleStatus(product.id)}
                  />
                </TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton
                    color="info"
                    onClick={() => handleUpdate(product.id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteProduct(product.id)}
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
    </Box>
  );
};

export default ProductList;
