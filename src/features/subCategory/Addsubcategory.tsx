import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  fetchsubcategory,
  createSubcategory,
} from "../../app/services/subcatagoryservice";

export interface SubCategory {
  id: number;
  category_id: number;
  display_sequence_number: string;
  category?: {
    id: number;
    name: string;
  };
}

interface Category {
  id: number;
  name: string;
}

const AddSubCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetchsubcategory();
        const uniqueMap = new Map();

        res.data.forEach((item: any) => {
          if (item.category && !uniqueMap.has(item.category.id)) {
            uniqueMap.set(item.category.id, {
              id: item.category.id,
              name: item.category.name,
            });
          }
        });

        setCategories(Array.from(uniqueMap.values()));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    loadCategories();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      category: "",
      image: null as File | null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      category: Yup.string().required("Required"),
      image: Yup.mixed().required("Image is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("category_id", values.category);
      if (values.image) formData.append("file", values.image); //  CORRECT key name

      try {
        const res = await createSubcategory(formData);
        console.log("Successfully submitted:", res);
        setSuccessOpen(true);
        resetForm();
        setPreview(null);
      } catch (error) {
        console.error("Error submitting form:", error);
        setErrorOpen(true);
      }
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      formik.setFieldValue("image", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <Box p={4} bgcolor="#fff" borderRadius={2} boxShadow={1}>
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h6" mb={2}>
          Sub Category Name *
        </Typography>
        <TextField
          fullWidth
          name="name"
          placeholder="Sub Category Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          sx={{ mb: 3 }}
        />

        <Typography variant="h6" mb={2}>
          Category *
        </Typography>
        <TextField
          fullWidth
          select
          name="category"
          value={formik.values.category}
          onChange={formik.handleChange}
          error={formik.touched.category && Boolean(formik.errors.category)}
          helperText={formik.touched.category && formik.errors.category}
          sx={{ mb: 3 }}
        >
          <MenuItem value="">Select</MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id.toString()}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>

        <Typography variant="h6" mb={2}>
          Upload Image *
        </Typography>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginBottom: "16px" }}
        />
        {preview && (
          <Box mb={2}>
            <img
              src={preview}
              alt="Preview"
              width={100}
              height={100}
              style={{ borderRadius: 4 }}
            />
          </Box>
        )}
        {formik.touched.image && formik.errors.image && (
          <Typography color="error" fontSize="0.875rem">
            {formik.errors.image as string}
          </Typography>
        )}

        <Box display="flex" gap={2} mt={3}>
          <Button type="reset" variant="contained" color="warning">
            Reset
          </Button>
          <Button type="submit" variant="contained" color="warning">
            Save & Next
          </Button>
        </Box>
      </form>

      {/* Toasts */}
      <Snackbar
        open={successOpen}
        autoHideDuration={3000}
        onClose={() => setSuccessOpen(false)}
      >
        <Alert
          onClose={() => setSuccessOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Sub Category Created Successfully!
        </Alert>
      </Snackbar>

      <Snackbar
        open={errorOpen}
        autoHideDuration={3000}
        onClose={() => setErrorOpen(false)}
      >
        <Alert
          onClose={() => setErrorOpen(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Something went wrong!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddSubCategory;
