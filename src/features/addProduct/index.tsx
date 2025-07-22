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
import axios from "axios";

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
  const [categories, setCategories] = useState<Option[]>([]);
  const [units, setUnits] = useState<Option[]>([]);
  const [packagingTypes, setPackagingTypes] = useState<Option[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight={600} mb={3}>
        Add Product
      </Typography>

      <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={3}>
        {/* 2 Column Layout */}
        <Box display="flex" flexWrap="wrap" gap={3}>
          <Box flex={1} minWidth="300px" display="flex" flexDirection="column" gap={2}>
            <TextField required label="Product Name" name="productName" value={formData.productName} onChange={handleChange} fullWidth />
            <TextField required label="SKU" name="sku" value={formData.sku} onChange={handleChange} fullWidth />
            <TextField required label="MRP" name="mrp" value={formData.mrp} onChange={handleChange} fullWidth />
            <TextField required label="HSN Code" name="hsnCode" value={formData.hsnCode} onChange={handleChange} fullWidth />
            <TextField required label="Weight (Kg)" name="weight" value={formData.weight} onChange={handleChange} fullWidth />
            <TextField select label="Brand" name="brand" value={formData.brand} onChange={handleChange} fullWidth>
              {brands.map((b) => (
                <MenuItem key={b.id} value={b.id}>{b.name}</MenuItem>
              ))}
            </TextField>
          </Box>

          <Box flex={1} minWidth="300px" display="flex" flexDirection="column" gap={2}>
            <TextField select required label="Category" name="category" value={formData.category} onChange={handleChange} fullWidth>
              {categories.map((c) => (
                <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
              ))}
            </TextField>
            <TextField select required label="Unit of Measurement" name="unit" value={formData.unit} onChange={handleChange} fullWidth>
              {units.map((u) => (
                <MenuItem key={u.id} value={u.id}>{u.name}</MenuItem>
              ))}
            </TextField>
            <TextField select required label="Packaging Type" name="packaging" value={formData.packaging} onChange={handleChange} fullWidth>
              {packagingTypes.map((p) => (
                <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
              ))}
            </TextField>
            <TextField required label="GST" name="gst" value={formData.gst} onChange={handleChange} fullWidth />
            <TextField label="CESS" name="cess" value={formData.cess} onChange={handleChange} fullWidth />
          </Box>
        </Box>

        {/* Description */}
        <Box>
          <Typography fontWeight={500} mb={1}>Description *</Typography>
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
          <Typography fontWeight={500} mb={1}>Upload Images</Typography>
          <Button variant="outlined" component="label" startIcon={<CloudUploadIcon />}>
            Upload
            <input hidden accept="image/*" multiple type="file" />
          </Button>
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
          <Button variant="contained" color="warning" onClick={handleReset}>Reset</Button>
          <Button variant="contained" type="submit" color="primary">Submit</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddProduct;
