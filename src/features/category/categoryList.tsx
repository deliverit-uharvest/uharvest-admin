import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Checkbox,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {
  Category,
  changeStatus,
  deleteCategory,
  fetchCategories,
} from "../../app/services/CategoryService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// 👇 Importing TableSkeleton
import TableSkeleton from "../loader/TableSkeleton";

const CategoryPage = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

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
      await deleteCategory(selectedCategoryId);
      setCategories((prev) =>
        prev.filter((cat) => cat.id !== selectedCategoryId)
      );
      toast.success("Category deleted successfully.");
    } catch (err) {
      toast.error("Something went wrong while deleting.");
    } finally {
      handleCloseDialog();
    }
  };

  const columns: GridColDef[] = [
    {
      field: "image",
      headerName: "Image",
      flex: 1,
      sortable: false,
      renderCell: (params) => <Avatar src={params.value} />,
    },
    { field: "name", headerName: "Name", flex: 2 },
    {
      field: "is_active",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Checkbox
          checked={params.row.is_active}
          color="success"
          onClick={() => handleToggleStatus(params.row.id)}
        />
      ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <IconButton
            size="small"
            color="primary"
            onClick={() => handleNavigate(`/catalog/category/${params.row.id}`)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => handleOpenDialog(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const res = await fetchCategories();
        if (res.status === "success") {
          setCategories(res.data);
        } else {
          toast.error(res.message);
        }
      } catch (err) {
        toast.error("Failed to load categories.");
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleToggleStatus = async (id: number) => {
    try {
      await changeStatus(id);

      setCategories((prev) =>
        prev.map((p) => (p.id === id ? { ...p, is_active: !p.is_active } : p))
      );
      toast("Status changed successfully");
    } catch (error) {
      toast.error("Error updating product status");
    }
  };

  return (
    <Box p={2}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6" fontWeight={600}>
          Categories
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleNavigate("/catalog/category/add")}
          sx={{ backgroundColor: "#fcb500", color: "#000", fontWeight: 600 }}
        >
          Add Category
        </Button>
      </Box>

      {loading ? (
        // 👇 Table Skeleton Loader
        <TableSkeleton rows={6} columns={4} />
      ) : categories.length > 0 ? (
        <DataGrid
          autoHeight
          rows={categories}
          columns={columns}
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
      ) : (
        <Typography>No categories found.</Typography>
      )}

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

export default CategoryPage;
