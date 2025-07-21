import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Checkbox,
  IconButton,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {
  Category,
  deleteCategory,
  fetchCategories,
} from "../../app/services/CategoryService";
import { toast } from "react-toastify";
// category/
const CategoryPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
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
        <Checkbox checked={params.value} color="primary" />
      ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <IconButton size="small" color="primary">
            <EditIcon />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  const handleDelete = async (id: number) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirm) return;

    try {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
    } catch (err) {
      toast("Something went wrong while deleting.");
    }
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const res = await fetchCategories();
        if (res.status == "success") {
          setCategories(res.data);
        } else {
          toast(res.message);
        }
        setLoading(false);
      } catch (err) {
        toast("Failed to load categories.");
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

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
          sx={{ backgroundColor: "#fcb500", color: "#000", fontWeight: 600 }}
        >
          Add Category
        </Button>
      </Box>

      {categories.length > 0 ? (
        <DataGrid
          autoHeight
          loading={loading}
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
      ) : loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Typography>No data founddd</Typography>
      )}
    </Box>
  );
};

export default CategoryPage;
