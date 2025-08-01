import React, { useEffect, useState } from "react";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Category, fetchCategories } from "../../app/services/CategoryService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createSubcategory } from "../../app/services/subcatagoryservice";

const AddSubCategory: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    getCategories();
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
      if (values.image) formData.append("file", values.image);
      try {
        setLoading(true);
        await createSubcategory(formData);
        toast("Sub Category Added successfully!");
        resetForm();
        setPreview(null);
        setLoading(false);
        navigate("/catalog/subcategory");
      } catch (error) {
        toast.error("Something went wrong!");
        setLoading(false);
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
            cat.is_active?<MenuItem key={cat.id} value={cat.id.toString()}>
              {cat.name}
            </MenuItem>:""
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
          {loading ? (
            <Typography>Submitting...</Typography>
          ) : (
            <Button type="submit" variant="contained" color="warning">
              Save & Next
            </Button>
          )}
        </Box>
      </form>
    </Box>
  );
};

export default AddSubCategory;
