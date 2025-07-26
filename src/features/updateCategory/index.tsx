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
import {
  getCategoryById,
  updateCategory,
} from "../../app/services/CategoryService";

const UpdateCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string>("");

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await getCategoryById(Number(id));
        setCategoryName(res.data.name || "");
        setExistingImageUrl(res.data.image || ""); // assumes backend sends 'image'
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
      formData.append("file", image);
    }

    try {
      const response = await updateCategory(formData);
      console.log("Full Response:", response);

      const status = response?.data?.status?.toLowerCase();
         console.log("Status:", response?.data?.status);
      const message = response?.data?.message;
   

      if (status == "success") {
        toast(message || "Category updated successfully!");

        //  Redirect only after successful update
        setTimeout(() => {
          navigate("/catalog/category");
        }, 1500);
      } else {
        toast(message || "Failed to update category.");
      }
    } catch (error: any) {
      toast(error?.response?.data?.message || "Failed to update category.");
    }
  };

  // Image preview (either new or existing)
  const previewImageUrl = image ? URL.createObjectURL(image) : existingImageUrl;

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

        {/* Category Name Input */}
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

        {/* Upload Image */}
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

        {/* Image Preview */}
        {previewImageUrl && (
          <Box mt={2}>
            <Typography variant="subtitle1" fontWeight={600}>
              Image Preview:
            </Typography>
            <img
              src={previewImageUrl}
              alt="Preview"
              style={{ marginTop: 10, maxWidth: 200, borderRadius: 8 }}
            />
          </Box>
        )}

        {/* Action Buttons */}
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
