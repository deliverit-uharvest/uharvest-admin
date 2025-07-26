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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import {
  fetchsubcategory,
  deleteSubCategory,
  toggleSubCategoryStatus,
} from "../../app/services/subcatagoryservice";
import TableSkeleton from "../loader/TableSkeleton";

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
  const [loading, setLoading] = useState<boolean>(true);
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetchsubcategory();
        const subcategories = response.data;
        setData(subcategories);

        const uniqueCategories: string[] = Array.from(
          new Set(
            subcategories
              .map((item: SubCategory) => item.category?.name)
              .filter(Boolean)
          )
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredData = categoryFilter
    ? data.filter((item) => item.category?.name === categoryFilter)
    : data;

  const handleToggleStatus = async (id: number) => {
    try {
      await toggleSubCategoryStatus(id);
      setData((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, is_active: !item.is_active } : item
        )
      );
    } catch {
      console.error("Error toggling status");
    }
  };

  const handleDelete = async () => {
    if (!selectedId) return;
    try {
      await deleteSubCategory(selectedId);
      setData((prev) => prev.filter((item) => item.id !== selectedId));
    } catch {
      console.error("Error deleting subcategory");
    } finally {
      setOpenDialog(false);
      setSelectedId(null);
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/catalog/subcategory/update/${id}`);
  };

  const openDeleteDialog = (id: number) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const closeDialog = () => {
    setOpenDialog(false);
    setSelectedId(null);
  };

  return (
    <Box p={3}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6">Sub-Categories</Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#fdd835", color: "#000" }}
          onClick={() => navigate("/catalog/subcategory/add")}
        >
          Add Sub-Category
        </Button>
      </Box>

      {/* Filter */}
      <Box display="flex" gap={2} mb={2}>
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

      {/* Table or Loader */}
      {loading ? (
        <TableSkeleton rows={6} columns={5} />
      ) : (
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
                      src={row.image || "/no-image.png"}
                      width="40"
                      height="40"
                      style={{ borderRadius: 4 }}
                      alt="subcategory"
                    />
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.category?.name ?? "N/A"}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={row.is_active}
                      onChange={() => handleToggleStatus(row.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(row.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => openDeleteDialog(row.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {filteredData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No sub-categories found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={closeDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this sub-category? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SubCategoryList;
