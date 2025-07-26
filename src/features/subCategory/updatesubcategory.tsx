// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   TextField,
//   MenuItem,
//   Typography,
//   InputLabel,
// } from "@mui/material";
// import { useParams, useNavigate } from "react-router-dom";
// import { fetchCategories } from "../../app/services/CategoryService";
// import { toast } from "react-toastify";
// import agent from "../../app/api/agent";

// interface Category {
//   id: number;
//   name: string;
// }

// interface SubCategoryData {
//   id: number;
//   name: string;
//   image: string;
//   category_id: number;
// }

// const UpdateSubCategory: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const [name, setName] = useState("");
//   const [categoryId, setCategoryId] = useState<number | "">("");
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [image, setImage] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string>("");

//   useEffect(() => {
//     loadSubCategory();
//     loadCategories();
//   }, []);

//   const loadSubCategory = async () => {
//     try {
//       const response = await agent.subcategory.getById(Number(id));
//       const data = (response as { data: SubCategoryData }).data;
//       setName(data.name);
//       setCategoryId(data.category_id);
//       setPreview(data.image);
//     } catch (error) {
//       toast.error("Failed to load sub-category");
//     }
//   };

//   const loadCategories = async () => {
//     try {
//       const response = await fetchCategories();
//       if ((response as any).status === "success") {
//         setCategories((response as any).data);
//       }
//     } catch {
//       toast.error("Failed to load categories");
//     }
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setImage(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async () => {
//     if (!name || !categoryId) {
//       toast.error("Name and category are required.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("category_id", categoryId.toString());
//     if (image) formData.append("file", image);

//     try {
//       await agent.subcategory.update(Number(id), formData);
//       toast.success("Sub-category updated");
//       navigate("/catalog/subcategory/list");
//     } catch (error) {
//       toast.error("Update failed");
//     }
//   };

//   return (
//     <Box p={3} maxWidth={500}>
//       <Typography variant="h6" mb={2}>
//         Edit Sub-Category
//       </Typography>

//       <TextField
//         label="Name"
//         fullWidth
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         margin="normal"
//       />

//       <TextField
//         select
//         label="Select Category"
//         fullWidth
//         value={categoryId}
//         onChange={(e) => setCategoryId(Number(e.target.value))}
//         margin="normal"
//       >
//         {categories.map((cat) => (
//           <MenuItem key={cat.id} value={cat.id}>
//             {cat.name}
//           </MenuItem>
//         ))}
//       </TextField>

//       <Box mt={2}>
//         <InputLabel sx={{ mb: 1 }}>Upload Image</InputLabel>
//         <input type="file" accept="image/*" onChange={handleImageChange} />
//         {preview && (
//           <Box mt={2}>
//             <img
//               src={preview}
//               alt="Preview"
//               style={{ width: 120, height: 120, borderRadius: 8 }}
//             />
//           </Box>
//         )}
//       </Box>

//       <Button
//         variant="contained"
//         sx={{ mt: 3, backgroundColor: "#fcb500", color: "#000" }}
//         onClick={handleSubmit}
//       >
//         Update Sub-Category
//       </Button>
//     </Box>
//   );
// };

// export default UpdateSubCategory;

import React from 'react'

const updatesubcategory = () => {
  return (
    <div>updatesubcategory</div>
  )
}

export default updatesubcategory
