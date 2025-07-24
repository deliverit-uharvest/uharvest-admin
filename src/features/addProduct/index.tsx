import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  TextareaAutosize,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Category, fetchCategories } from "../../app/services/CategoryService";
import { toast } from "react-toastify";

interface Option {
  id: number;
  name: string;
}

const AddProduct: React.FC = () => {
  const [formData, setFormData] = useState({
    productName: "",
    sku: "",
    mrp: "",
    hsnCode: "",
    weight: "",
    brand: "",
    category: "",
    unit: "",
    packaging: "",
    gst: "",
    cess: "0",
    description: "",
    keywords: "",
  });

  const [brands, setBrands] = useState<Option[]>([]);
  const [units, setUnits] = useState<Option[]>([]);
  const [packagingTypes, setPackagingTypes] = useState<Option[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);

    // Limit to 5 total images
    const newFiles = [...selectedImages, ...fileArray].slice(0, 5);
    const newPreviews = newFiles.map((file) =>
      URL.createObjectURL(file)
    );

    if (newFiles.length > 5) {
      toast.warn("You can upload a maximum of 5 images.");
    }

    setSelectedImages(newFiles);
    setImagePreviews(newPreviews);
  };

  const handleReset = () => {
    setFormData({
      productName: "",
      sku: "",
      mrp: "",
      hsnCode: "",
      weight: "",
      brand: "",
      category: "",
      unit: "",
      packaging: "",
      gst: "",
      cess: "0",
      description: "",
      keywords: "",
    });
    setSelectedImages([]);
    setImagePreviews([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    console.log("Selected Images:", selectedImages);
    toast.info("Check console for image upload data.");
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight={600} mb={3}>
        Add Product
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        gap={3}
      >
        <Box display="flex" flexWrap="wrap" gap={3}>
          <Box
            flex={1}
            minWidth="300px"
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <TextField
              required
              label="Product Name"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              required
              label="SKU"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              required
              label="MRP"
              name="mrp"
              value={formData.mrp}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              required
              label="HSN Code"
              name="hsnCode"
              value={formData.hsnCode}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              required
              label="Weight (Kg)"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              select
              label="Brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              fullWidth
            >
              {brands.map((b) => (
                <MenuItem key={b.id} value={b.id}>
                  {b.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <Box
            flex={1}
            minWidth="300px"
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <TextField
              select
              required
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              fullWidth
            >
              {categories.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              required
              label="Unit of Measurement"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              fullWidth
            >
              {units.map((u) => (
                <MenuItem key={u.id} value={u.id}>
                  {u.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              required
              label="Packaging Type"
              name="packaging"
              value={formData.packaging}
              onChange={handleChange}
              fullWidth
            >
              {packagingTypes.map((p) => (
                <MenuItem key={p.id} value={p.id}>
                  {p.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              required
              label="GST"
              name="gst"
              value={formData.gst}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="CESS"
              name="cess"
              value={formData.cess}
              onChange={handleChange}
              fullWidth
            />
          </Box>
        </Box>

        {/* Description */}
        <Box>
          <Typography fontWeight={500} mb={1}>
            Description *
          </Typography>
          <TextareaAutosize
            minRows={4}
            name="description"
            placeholder="Description"
            style={{ width: "100%", padding: 10, fontFamily: "inherit" }}
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Box>

        {/* Upload Images */}
        <Box>
          <Typography fontWeight={500} mb={1}>
            Upload Images (Max 5)
          </Typography>
          <Button
            variant="outlined"
            component="label"
            startIcon={<CloudUploadIcon />}
          >
            Upload
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={handleImageChange}
            />
          </Button>

          {/* Previews */}
          {imagePreviews.length > 0 && (
            <Box mt={2} display="flex" gap={2} flexWrap="wrap">
              {imagePreviews.map((src, index) => (
                <Box
                  key={index}
                  width={100}
                  height={100}
                  borderRadius={2}
                  overflow="hidden"
                  border="1px solid #ccc"
                >
                  <img
                    src={src}
                    alt={`preview-${index}`}
                    width="100%"
                    height="100%"
                    style={{ objectFit: "cover" }}
                  />
                </Box>
              ))}
            </Box>
          )}
        </Box>

        {/* Keywords */}
        <TextField
          label="Keywords"
          name="keywords"
          value={formData.keywords}
          onChange={handleChange}
          placeholder="Type something and press enter..."
          fullWidth
        />

        {/* Buttons */}
        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" color="warning" onClick={handleReset}>
            Reset
          </Button>
          <Button variant="contained" type="submit" color="primary">
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddProduct;
