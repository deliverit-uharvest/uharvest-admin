import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  InputLabel,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  fetchsubcategory,
  subcategory,
} from "../../app/services/subcatagoryservice"; //import from subcatergory service

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
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("category", values.category);
      if (values.image) formData.append("image", values.image);
      console.log("Submit this:", values);
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
            <MenuItem key={cat.id} value={cat.name}>
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
            <img src={preview} alt="Preview" width={100} height={100} style={{ borderRadius: 4 }} />
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
    </Box>
  );
};

export default AddSubCategory;
