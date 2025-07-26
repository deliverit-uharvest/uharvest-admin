import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputLabel,
  Paper,
  Select,
  MenuItem
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { addOutlet } from "../../app/services/OutletService";
import { fetchOrganisation, Organisation } from "../../app/services/OrganisationService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AddOutlet = () => {
  const [name, setName] = useState("");
  
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [secmobile, setSecMobile] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [shopLicense, setShopLicense] = useState("");
  const [fssaiNumber, setFssaiNumber] = useState("");
  const [licenseRegistrationNumber, setLicenseRegistrationNumber] = useState("");
  const [shippingAddressline1, setShippingAddressline1] = useState("");
  const [shippingAddressline2, setShippingAddressline2] = useState("");
  
  //const [address, setAddress] = useState("");
  const [shippingPincode, setShippingPincode] = useState("");
  const navigate = useNavigate();
  // const [rank, setRank] = useState("");
  //const [image, setImage] = useState<File | null>(null);

  const [organisationList, setOrganisationList] = useState<Organisation[]>([]);
  const [selectedOrganisation, setSelectedOrganisation] = useState("");

  const handleReset = () => {
    setName("");
    
    setEmail("");
    setMobile("");
    setSecMobile("");
    setPanNumber("");
    setGstNumber("");
    setShippingAddressline1("");
    setShippingPincode("");
    setShopLicense("");
    setFssaiNumber("");
    setLicenseRegistrationNumber("");
    // setRank("");
    //setImage(null);
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast("Name is required");
      return;
    }
    
    if (!email.trim()) {
      toast("Email is required");
      return;
    }
    // if (!mobile.trim()) {
    //   toast("Mobile is required");
    //   return;
    // }
    // if (!panNumber.trim()) {
    //   toast("Pan number is required");
    //   return;
    // }
    // if (!gstNumber.trim()) {
    //   toast("Gst number is required");
    //   return;
    // }
    // if (!shopLicense.trim()) {
    //   toast("Shop license is required");
    //   return;
    // }
    // if (!fssaiNumber.trim()) {
    //   toast("Fssai number is required");
    //   return;
    // }
    // if (!licenseRegistrationNumber.trim()) {
    //   toast("set license registration number is required");
    //   return;
    // }

    if (!shippingAddressline1.trim()) {
      toast("Address is required");
      return;
    }
    if (!shippingPincode.trim()) {
      toast("Pincode is required");
      return;
    }
    

    // const formData = new FormData();
    // formData.append("name", name);
    
    // formData.append("email", email);
    // formData.append("mobile", mobile);
    // formData.append("secondary_mobile", secmobile);
    // formData.append("pan_number", panNumber);
    // formData.append("gst_number", gstNumber);
    // formData.append("shop_license", shopLicense);
    // formData.append("fssai_number", fssaiNumber);
    // formData.append("license_registration_number", licenseRegistrationNumber);

    // formData.append("shipping_addressline1", shippingAddressline1);
    // formData.append("shippingpincode", shippingPincode);
    // if (image) {
    //   formData.append("imagename", image);
    // }

    const payload = {
                  name,
                  org_id: selectedOrganisation,
                  email,
                  //mobile,
                  // secondary_mobile: secmobile,
                  // pan_number: panNumber,
                  // gst_number: gstNumber,
                  shipping_addressline1:shippingAddressline1,
                  shipping_addressline2:shippingAddressline2,
                  //shippingPincode: shippingPincode,
                  // stateid: Number(selectedState),
                  // cityid: Number(selectedCity),
                  // land_mark: landMark,
                  //lat: "21.0760",  // optional: hardcoded or use geolocation
                  //long: "52.8777"  // optional: hardcoded or use geolocation
                };

    try {
      const response = await addOutlet(payload);
      if (response.data.status === "success") {
        toast("Outlet saved successfully!");
        handleReset();
        navigate("/organisation/outlet");
      } else {
        toast(response.data.message);
      }
    } catch (error) {
      toast("Failed to save outlet.");
    }
  };


  useEffect(() => {
    const loadOrganisation = async () => {
      try {
        const res = await fetchOrganisation();
        if (res.status === "success") {
          setOrganisationList(res.data); // Adjust if your API structure is different
        }
      } catch (err) {
        toast("Failed to load organisation");
      }
    };
  
    loadOrganisation();
  }, []);

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
          Add New Outlet
        </Typography>

        {/* Category Name */}

        <Box mb={3}>
          <InputLabel sx={{ fontWeight: 600, fontSize: "1rem", mb: 1 }}>
            Organisation <span style={{ color: "red" }}>*</span>
          </InputLabel>
          <Select
            fullWidth
            displayEmpty
            value={selectedOrganisation}
            onChange={(e) => setSelectedOrganisation(e.target.value)}
          >
            <MenuItem value="" disabled>Select a organisation</MenuItem>
            {organisationList.map((org) => (
              <MenuItem key={org.id} value={org.id}>
                {org.name}
              </MenuItem>
            ))}
          </Select>
        </Box>

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
            Shop License <span style={{ color: "red" }}>*</span>
          </InputLabel>
          <TextField
            fullWidth
            size="medium"
            placeholder="Enter Shop License"
            value={shopLicense}
            onChange={(e) => setShopLicense(e.target.value)}
          />
        </Box>

        <Box mb={3}>
          <InputLabel sx={{ fontWeight: 600, fontSize: "1rem", mb: 1 }}>
            FSSAI Number <span style={{ color: "red" }}>*</span>
          </InputLabel>
          <TextField
            fullWidth
            size="medium"
            placeholder="Enter FSSAI Number"
            value={fssaiNumber}
            onChange={(e) => setFssaiNumber(e.target.value)}
          />
        </Box>

        <Box mb={3}>
          <InputLabel sx={{ fontWeight: 600, fontSize: "1rem", mb: 1 }}>
            License Registration Number <span style={{ color: "red" }}>*</span>
          </InputLabel>
          <TextField
            fullWidth
            size="medium"
            placeholder="Enter FSSAI Number"
            value={licenseRegistrationNumber}
            onChange={(e) => setLicenseRegistrationNumber(e.target.value)}
          />
        </Box>

        <Box mb={3}>
          <InputLabel sx={{ fontWeight: 600, fontSize: "1rem", mb: 1 }}>
           Shipping Address Line1 <span style={{ color: "red" }}>*</span>
          </InputLabel>
          <TextField
            fullWidth
            size="medium"
            placeholder="Enter Address"
            value={shippingAddressline1}
            onChange={(e) => setShippingAddressline1(e.target.value)}
          />
        </Box>

        <Box mb={3}>
          <InputLabel sx={{ fontWeight: 600, fontSize: "1rem", mb: 1 }}>
           Shipping Address Line2 <span style={{ color: "red" }}>*</span>
          </InputLabel>
          <TextField
            fullWidth
            size="medium"
            placeholder="Enter Address"
            value={shippingAddressline2}
            onChange={(e) => setShippingAddressline2(e.target.value)}
          />
        </Box>

        <Box mb={3}>
          <InputLabel sx={{ fontWeight: 600, fontSize: "1rem", mb: 1 }}>
            Shipping Pincode <span style={{ color: "red" }}>*</span>
          </InputLabel>
          <TextField
            fullWidth
            size="medium"
            placeholder="Enter Pincode"
            value={shippingPincode}
            onChange={(e) => setShippingPincode(e.target.value)}
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
        {/* <Box mb={3}>
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
        </Box> */}

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

export default AddOutlet;
