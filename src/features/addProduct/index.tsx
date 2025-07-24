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
import { createProduct } from "../../app/services/ProductService";
import { useNavigate } from "react-router-dom";
import { Option, UNIT_OPTIONS } from "../../app/api/unitOptions";
import { PACKAGING_OPTIONS } from "../../app/api/packagingOptions";

const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productName: "",
    sku: "",
    mrp:"",
    price:"",
    hsnCode: "",
    weight: "",
    quantity:"",
    category: "",
    unit: "",
    packaging: "",
    gst: "",
    cess: "0",
    description: "",
    keywords: "",
  });
  const [loading, setLoading] = useState(false);
  const [units, setUnits] = useState<Option[]>([]);
  const [packagingTypes, setPackagingTypes] = useState<Option[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [selectedImages, setSelectedImages] = useState<File[]>([]); // SELECTED IMAGES
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);// IMAGE PREVIEWS

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
      price:"",
      quantity:"",
      hsnCode: "",
      weight: "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.productName.trim())
      return toast.error("Product name is required");
    if (!formData.sku.trim()) return toast.error("SKU is required");
    if (!formData.mrp) return toast.error("MRP is required");
    if (!formData.hsnCode.trim()) return toast.error("HSN Code is required");
    if (!formData.weight.trim()) return toast.error("Quantity is required");
    if (!formData.category) return toast.error("Please select Category");
    if (!formData.unit) return toast.error("Please select unit");
    if (!formData.packaging) return toast.error("Please select Packaging type");
    if (!formData.gst.trim()) return toast.error("GST is required");
    if (!formData.description.trim())
      return toast.error("Description is required");

    try {
      const data = new FormData();
      data.append("name", formData.productName);
      data.append("sku", formData.sku);
      data.append("base_mrp", formData.mrp);
      data.append("base_price",formData.price);
      data.append("quantity",formData.quantity);
      data.append("hsn_code", formData.hsnCode);
      data.append("quantity", formData.weight);
      data.append("category_id", formData.category);
      data.append("unit", formData.unit);
      data.append("packaging_type", formData.packaging);
      data.append("tax", formData.gst);
      data.append("cess", formData.cess);
      data.append("description", formData.description);
      data.append("keywords", formData.keywords);

      if (selectedImages) {
        Array.from(selectedImages).forEach((file) => data.append("files", file));
      }

      setLoading(true);
      const res = await createProduct(data);
      console.log('resss product',res)

      if ((res as any).status === "success") {
        toast.success("Product created successfully");
        handleReset();
        navigate("/catalog/product");
      } else {
        toast.error("Something went wrong");
      }

      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to create product");
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
    setUnits(UNIT_OPTIONS);
    setPackagingTypes(PACKAGING_OPTIONS);
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
              label="Base MRP"
              name="mrp"
              value={formData.mrp}
              onChange={handleChange}
              fullWidth
            />
             <TextField
              required
              label="Base Price"
              name="price"
              value={formData.price}
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
              label="Weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              fullWidth
            />
          
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
             <TextField
              label="Quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              fullWidth
            />
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
          </Box>
        </Box>

        {/* Description */}
        <Box>
          <Typography fontWeight={500} mb={1}>
            Description *
          </Typography>
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
          {loading ? (
            <Typography>Uploading....</Typography>
          ) : (
            <Button variant="contained" type="submit" color="primary">
              Submit
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AddProduct;
