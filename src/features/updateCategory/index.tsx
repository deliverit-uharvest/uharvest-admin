import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputLabel,
  Paper,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import agent from "../../app/api/agent";
import {
  getCategoryById,
  updateCategory,
} from "../../app/services/CategoryService";

const UpdateCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await getCategoryById(Number(id));
        setCategoryName(res.data.name || "");
      } catch (error) {
        toast("Failed to fetch category");
        navigate("/catalog/category");
      }
    };

    if (id) fetchCategory();
  }, [id, navigate]);

  const handleReset = () => {
    setCategoryName("");
    setImage(null);
  };

  const handleSubmit = async () => {
    if (!categoryName.trim()) {
      toast("Category name is required");
      return;
    }

    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("category_id", String(id));
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await updateCategory(formData);

      if (response.data.status === "success") {
        toast("Category updated successfully!");
        navigate("/catalog/category");
      } else {
        toast(response.data.message || "Failed to update category");
      }
    } catch (error: any) {
      toast(error?.response?.data?.message || "Failed to update category.");
    }
  };

  return (
    <Box
      minHeight="20vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="#f9f9f9"
    >
      <Paper
        elevation={3}
        sx={{
          backgroundColor: "#fff",
          borderRadius: 4,
          p: 5,
          width: "100%",
          maxWidth: 900,
        }}
      >
        <Typography
          variant="h5"
          fontWeight={700}
          mb={4}
          color="primary"
          textAlign="center"
        >
          Update Category
        </Typography>

        <Box mb={3}>
          <InputLabel sx={{ fontWeight: 600, fontSize: "1rem", mb: 1 }}>
            Category Name <span style={{ color: "red" }}>*</span>
          </InputLabel>
          <TextField
            fullWidth
            size="medium"
            placeholder="Enter category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </Box>

        <Box mb={3}>
          <InputLabel sx={{ fontWeight: 600, fontSize: "1rem", mb: 1 }}>
            Upload Image
          </InputLabel>
          <Button
            component="label"
            variant="outlined"
            size="large"
            startIcon={<UploadFileIcon />}
            sx={{ px: 3, py: 1.5 }}
          >
            Choose File
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) =>
                setImage(e.target.files ? e.target.files[0] : null)
              }
            />
          </Button>
          {image && (
            <Typography variant="body1" mt={1} color="text.secondary">
              Selected: {image.name}
            </Typography>
          )}
        </Box>

        <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
          <Button
            variant="outlined"
            onClick={handleReset}
            sx={{
              px: 4,
              py: 1.2,
              fontWeight: 600,
              borderColor: "#fcb500",
              color: "#fcb500",
              "&:hover": {
                backgroundColor: "#fff8e1",
                borderColor: "#fcb500",
              },
            }}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              px: 4,
              py: 1.2,
              backgroundColor: "#fcb500",
              color: "#000",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#fbc02d",
              },
            }}
          >
            Update
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default UpdateCategory;
