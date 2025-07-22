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
import axios from "axios";

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
}

interface Category {
  id: string;
  name: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  //  Fetch products
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:5001/products"); // Replace with actual product API
  //       setProducts(res.data.data);
  //       setFilteredProducts(res.data.data);
  //     } catch (error) {
  //       console.error("Failed to fetch products", error);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  //  Fetch categories api call
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5001/category"); //  Replace with actual category API
        setCategories(res.data.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchCategories();
  }, []);

  //  Filter by search and category
  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        !selectedCategory || product.category_id === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  return (
    <Box p={3}>
      {/*  Search + Add Product Button */}
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
          startIcon={<AddIcon />}
          sx={{ backgroundColor: "#fcb500", color: "#000", fontWeight: 600 }}
          // onClick={() => navigate("/add-product")} // <-- Optional
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
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>SKU</strong></TableCell>
              <TableCell><strong>Image</strong></TableCell>
              <TableCell><strong>Category</strong></TableCell>
              <TableCell><strong>Stock</strong></TableCell> {/* Placeholder */}
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
                <TableCell>{product.category_id}</TableCell>
                <TableCell>--</TableCell> {/* Replace with actual stock from backend if available */}
                <TableCell>
                  <Checkbox checked={product.is_active} />
                </TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton color="info">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error">
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

