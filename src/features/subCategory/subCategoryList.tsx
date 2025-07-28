import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Paper,
  Typography,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Category, fetchCategories } from "../../app/services/CategoryService";
import {
  changeStatus,
  deleteSubCategory,
  fetchSubCategory,
} from "../../app/services/subcatagoryservice";

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
  const [data, setData] = useState<SubCategory[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

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

  const handleOpenDialog = (id: number) => {
    setSelectedCategoryId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCategoryId(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedCategoryId) return;

    try {
      await deleteSubCategory(selectedCategoryId);
      setData((prev) => prev.filter((cat) => cat.id !== selectedCategoryId));
      toast.success("Sub Category deleted successfully.");
    } catch (err) {
      toast.error("Something went wrong while deleting.");
    } finally {
      handleCloseDialog();
    }
  };

  const loadData = async () => {
    try {
      const response = await fetchSubCategory();
      const subcategories = response.data;
      setData(subcategories);
    } catch (error) {
      toast.error("Error fetching subcategory");
    }
  };

  const handleToggleStatus = async (id: number) => {
    try {
      await changeStatus(id);

      setData((prev) =>
        prev.map((p) => (p.id === id ? { ...p, is_active: !p.is_active } : p))
      );
      toast("Status changed successfully");
    } catch (error) {
      toast.error("Error updating product status");
    }
  };

  useEffect(() => {
    getCategories();
    loadData();
  }, []);

  const filteredData = categoryFilter
    ? data.filter((item) => item.category_id === Number(categoryFilter))
    : data;

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
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
          onClick={() => navigate("/catalog/subcategory/add")}
        >
          Add Sub-Category
        </Button>
      </Box>

      {/* Filters */}
      <Box display="flex" gap={2} mb={2}>
        <TextField
          select
          label="Select Category"
          value={categoryFilter}
          onChange={(e) => {
            setCategoryFilter(e.target.value);
            setCurrentPage(1); // reset to first page when filter changes
          }}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">All</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
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
            {paginatedData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <img
                    src={row?.image ?? "/no-image.png"}
                    width="40"
                    height="40"
                    style={{ borderRadius: 4 }}
                  />
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.category?.name ?? "N/A"}</TableCell>
                <TableCell>
                  <Checkbox
                    checked={row.is_active}
                    onClick={() => handleToggleStatus(row.id)}
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      navigate(`/catalog/subcategory/update/${row.id}`);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error">
                    <DeleteIcon onClick={() => handleOpenDialog(row.id)} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Buttons */}
      <Box mt={2} display="flex" justifyContent="center" gap={1}>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index + 1}
            variant={currentPage === index + 1 ? "contained" : "outlined"}
            sx={{ minWidth: 36 }}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this category? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SubCategoryList;
