import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import {
  fetchsubcategory,
  subcategory,
} from "../../app/services/subcatagoryservice"; //import from subcatergory service

export interface SubCategory {
  id: number;
  name: string;
  image: string;
  is_active: boolean;
  category_id: number;
  display_sequence_number: string;
  created_at: string;
  updated_at: string;
  category?: {
    id: number;
    name: string;
  };
}

const SubCategoryList: React.FC = () => {
  const [data, setData] = useState<SubCategory[]>([]); // ✅ correct

  const [categoryFilter, setCategoryFilter] = useState<string>(""); // all list
  const [categories, setCategories] = useState<string[]>([]); // filter list

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchsubcategory();
        const subcategories = response.data;
        setData(subcategories);

        // ✅ Extract unique category names
        const uniqueCategories: string[] = Array.from(
          new Set(
            subcategories
              .map((item: SubCategory) => item.category?.name)
              .filter(Boolean)
          )
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching subcategory:", error);
      }
    };

    loadData();
  }, []);

  const filteredData = categoryFilter
    ? data.filter((item) => item.category?.name === categoryFilter)
    : data;

     const navigate = useNavigate();

  return (
    <Box p={3}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h6">Sub-Categories</Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#fdd835", color: "#000" }}
          onClick={() => navigate("/catalog/addsub")}
        >
          Add Sub-Category
        </Button>
      </Box>

      {/* Filters */}
      <Box display="flex" gap={2} mb={2}>
        {/* Warehouse dropdown removed */}
        <TextField
          select
          label="Select Category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">All</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <img
                    src={row.image ?? "/no-image.png"}
                    // alt={row.name}
                    width="40"
                    height="40"
                    style={{ borderRadius: 4 }}
                  />
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.category?.name ?? "N/A"}</TableCell>
                <TableCell>
                  <Checkbox checked={row.is_active} />
                </TableCell>
                <TableCell>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SubCategoryList;
