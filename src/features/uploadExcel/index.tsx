import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { toast } from "react-toastify";
import axios from "axios";
import { baseApiUrl } from "../../app/api/constants";


const UploadExcel: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
        "application/vnd.ms-excel.sheet.macroEnabled.12",
      ];

      if (!allowedTypes.includes(file.type)) {
        toast.error("Only XLSX, XLS, and XLSM files are allowed.");
        return;
      }

      // ✅ Replace sample with selected file
      setSelectedFile(file);

      // ✅ Prepare file to upload
      const formData = new FormData();
      formData.append("file", file);

      try {
        // ✅ API call (replace URL with actual one)
        // const response = await axios.post("/api/upload-excel", formData);
         const response = await axios.post(`${baseApiUrl}/product/upload-excel`);
        toast.success(`File "${file.name}" uploaded successfully!`);

        // ✅ On success, refresh page
        window.location.reload();
      } catch (error) {
        toast.error("Failed to upload file.");
      }
    }
  };

  return (
    <Box mt={2}>
      {/* ✅ Download Sample File Button */}
      <Button
        variant="outlined"
        startIcon={<DownloadIcon />}
        fullWidth
        href="/products_template.xlsx"
        download
        sx={{
          mb: 1,
          textTransform: "none",
          borderColor: "#00703C",
          color: "#00703C",
          "&:hover": {
            borderColor: "#005c30",
            backgroundColor: "#f0fdf4",
          },
        }}
      >
        Download Sample Excel
      </Button>

      {/* ✅ Hidden File Input */}
      <input
        accept=".xlsx,.xls,.xlsm"
        type="file"
        id="excel-upload"
        style={{ display: "none" }}
        onChange={handleFileUpload}
      />

      {/* ✅ Upload Excel Button */}
      <label htmlFor="excel-upload">
        <Button
          variant="contained"
          component="span"
          startIcon={<CloudUploadIcon />}
          fullWidth
          sx={{
            textTransform: "none",
            backgroundColor: "#00703C",
            "&:hover": {
              backgroundColor: "#005c30",
            },
          }}
        >
          Upload Excel File
        </Button>
      </label>
    </Box>
  );
};

export default UploadExcel;
