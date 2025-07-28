import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputLabel,
  Paper,
  CircularProgress,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { addCategory } from "../../app/services/CategoryService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

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
    if (image) {
      formData.append("file", image);
    }

    try {
      setIsSubmitting(true);
      const response = await addCategory(formData);

      if (response.data.status === "success") {
        toast("Category saved successfully!");
        handleReset();
        navigate("/catalog/category");
      } else {
        toast(response.data.message);
      }
    } catch (error) {
      toast("Failed to save category.");
    } finally {
      setIsSubmitting(false);
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
          Add New Category
        </Typography>

        {/* Category Name */}
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

        {/* Image Upload */}
        <Box mb={3}>
          <InputLabel sx={{ fontWeight: 600, fontSize: "1rem", mb: 1 }}>
            Upload Image <span style={{ color: "red" }}>*</span>
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

          {/* Image Preview */}
          {image && (
            <Box mt={2}>
              <Typography variant="body1" color="text.secondary">
                Selected: {image.name}
              </Typography>
              <Box mt={1}>
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  style={{
                    maxHeight: "200px",
                    maxWidth: "100%",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                  }}
                />
              </Box>
            </Box>
          )}
        </Box>

        {/* Buttons */}
        <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
          <Button
            variant="outlined"
            onClick={handleReset}
            disabled={isSubmitting}
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
            disabled={isSubmitting}
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
            {isSubmitting ? (
              <>
                <CircularProgress
                  size={18}
                  sx={{ color: "#000", mr: 1 }}
                  thickness={5}
                />
                Saving...
              </>
            ) : (
              "Save"
            )}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddCategory;
