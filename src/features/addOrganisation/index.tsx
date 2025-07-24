import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputLabel,
  Paper,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { addOrganisation } from "../../app/services/OrganisationService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddOrganisation = () => {
  const [name, setName] = useState("");
  const [legalName, setLegalName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [secmobile, setSecMobile] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const navigate = useNavigate();
  // const [rank, setRank] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleReset = () => {
    setName("");
    setLegalName("");
    setEmail("");
    setMobile("");
    setSecMobile("");
    setPanNumber("");
    setGstNumber("");
    setAddress("");
    setPincode("");
    // setRank("");
    setImage(null);
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast("Name is required");
      return;
    }
    if (!legalName.trim()) {
      toast("Legal name is required");
      return;
    }
    if (!email.trim()) {
      toast("Email is required");
      return;
    }
    if (!mobile.trim()) {
      toast("Mobile is required");
      return;
    }
    if (!panNumber.trim()) {
      toast("Pan number is required");
      return;
    }
    if (!gstNumber.trim()) {
      toast("Gst number is required");
      return;
    }
    if (!address.trim()) {
      toast("Address is required");
      return;
    }
    if (!pincode.trim()) {
      toast("Pincode is required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("legalname", legalName);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("secondary_mobile", secmobile);
    formData.append("pan_number", panNumber);
    formData.append("gst_number", gstNumber);
    formData.append("address", address);
    formData.append("pin_code", pincode);
    if (image) {
      formData.append("imagename", image);
    }

    try {
      const response = await addOrganisation(formData);
      if (response.data.status === "success") {
        toast("Organisation saved successfully!");
        handleReset();
        navigate("/organisationOnboard/organisation");
      } else {
        toast(response.data.message);
      }
    } catch (error) {
      toast("Failed to save organisation.");
    }
  };

  return (
    <Box
      minHeight="20vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="#f9f9f9" // Optional background for contrast
    >
      <Paper
        elevation={3}
        sx={{
          backgroundColor: "#fff",
          borderRadius: 4,
          p: 5,
          width: "100%",
          maxWidth: 900, // Increased width
        }}
      >
        <Typography
          variant="h5"
          fontWeight={700}
          mb={4}
          color="primary"
          textAlign="center"
        >
          Add New Organisation
        </Typography>

        {/* Category Name */}
        <Box mb={3}>
          <InputLabel sx={{ fontWeight: 600, fontSize: "1rem", mb: 1 }}>
            Name <span style={{ color: "red" }}>*</span>
          </InputLabel>
          <TextField
            fullWidth
            size="medium"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>

        <Box mb={3}>
          <InputLabel sx={{ fontWeight: 600, fontSize: "1rem", mb: 1 }}>
            Legal Name <span style={{ color: "red" }}>*</span>
          </InputLabel>
          <TextField
            fullWidth
            size="medium"
            placeholder="Enter Legal name"
            value={legalName}
            onChange={(e) => setLegalName(e.target.value)}
          />
        </Box>

        <Box mb={3}>
          <InputLabel sx={{ fontWeight: 600, fontSize: "1rem", mb: 1 }}>
            Email <span style={{ color: "red" }}>*</span>
          </InputLabel>
          <TextField
            fullWidth
            size="medium"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>

        <Box mb={3}>
          <InputLabel sx={{ fontWeight: 600, fontSize: "1rem", mb: 1 }}>
            Mobile <span style={{ color: "red" }}>*</span>
          </InputLabel>
          <TextField
            fullWidth
            size="medium"
            placeholder="Enter Mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </Box>

        <Box mb={3}>
          <InputLabel sx={{ fontWeight: 600, fontSize: "1rem", mb: 1 }}>
            Secondary Mobile
          </InputLabel>
          <TextField
            fullWidth
            size="medium"
            placeholder="Enter Secondary Mobile"
            value={secmobile}
            onChange={(e) => setSecMobile(e.target.value)}
          />
        </Box>

        <Box mb={3}>
          <InputLabel sx={{ fontWeight: 600, fontSize: "1rem", mb: 1 }}>
            Pan Number <span style={{ color: "red" }}>*</span>
          </InputLabel>
          <TextField
            fullWidth
            size="medium"
            placeholder="Enter Pan Number"
            value={panNumber}
            onChange={(e) => setPanNumber(e.target.value)}
          />
        </Box>

        <Box mb={3}>
          <InputLabel sx={{ fontWeight: 600, fontSize: "1rem", mb: 1 }}>
            Gst Number <span style={{ color: "red" }}>*</span>
          </InputLabel>
          <TextField
            fullWidth
            size="medium"
            placeholder="Enter Gst Number"
            value={gstNumber}
            onChange={(e) => setGstNumber(e.target.value)}
          />
        </Box>

        <Box mb={3}>
          <InputLabel sx={{ fontWeight: 600, fontSize: "1rem", mb: 1 }}>
           Address <span style={{ color: "red" }}>*</span>
          </InputLabel>
          <TextField
            fullWidth
            size="medium"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Box>

        <Box mb={3}>
          <InputLabel sx={{ fontWeight: 600, fontSize: "1rem", mb: 1 }}>
            Pincode <span style={{ color: "red" }}>*</span>
          </InputLabel>
          <TextField
            fullWidth
            size="medium"
            placeholder="Enter Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />
        </Box>

        {/* Rank */}
        {/* <Box mb={3}>
        <InputLabel sx={{ fontWeight: 600, fontSize: "1rem", mb: 1 }}>
          Rank <span style={{ color: "red" }}>*</span>
        </InputLabel>
        <TextField
          fullWidth
          size="medium"
          placeholder="Enter rank"
          value={rank}
          onChange={(e) => setRank(e.target.value)}
        />
      </Box> */}

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
          {image && (
            <Typography variant="body1" mt={1} color="text.secondary">
              Selected: {image.name}
            </Typography>
          )}
        </Box>

        {/* Buttons */}
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
            Save
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddOrganisation;
