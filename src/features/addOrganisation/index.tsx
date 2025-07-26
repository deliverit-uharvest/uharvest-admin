import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputLabel,
  Paper,
  MenuItem,
  Select,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { addOrganisation } from "../../app/services/OrganisationService";
import { fetchStates, States } from "../../app/services/StatesService";
import { fetchCitiesByState, City } from "../../app/services/CitiesService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { useEffect } from "react";



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
  const [landMark, setLandMark] = useState("");
  const navigate = useNavigate();
  // const [rank, setRank] = useState("");
  //const [image, setImage] = useState<File | null>(null);

  const [stateList, setStateList] = useState<States[]>([]);
  const [selectedState, setSelectedState] = useState("");

  const [cityList, setCityList] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState("");

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
    setLandMark("");
    // setRank("");
    //setImage(null);
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
    if (!selectedState) {
      toast("State is required");
      return;
    }
    if (!selectedCity) {
      toast("City is required");
      return;
    }
    if (!landMark) {
      toast("Lankmark is required");
      return;
    }

    // const formData = new FormData();
    // formData.append("name", name);
    // formData.append("legalname", legalName);
    // formData.append("email", email);
    // formData.append("mobile", mobile);
    // formData.append("secondary_mobile", secmobile);
    // formData.append("pan_number", panNumber);
    // formData.append("gst_number", gstNumber);
    // formData.append("address", address);
    // formData.append("pin_code", pincode);
    // formData.append("stateid", selectedState);
    // formData.append("cityid", selectedCity);
    // formData.append("land_mark", landMark);
    // if (image) {
    //   formData.append("imagename", image);
    // }

    const payload = {
                  name,
                  legalname: legalName,
                  email,
                  mobile,
                  secondary_mobile: secmobile,
                  pan_number: panNumber,
                  gst_number: gstNumber,
                  address,
                  pin_code: pincode,
                  stateid: Number(selectedState),
                  cityid: Number(selectedCity),
                  land_mark: landMark,
                  //imagename: image?.name || "", // or base64 if backend supports it
                  lat: "21.0760",  // optional: hardcoded or use geolocation
                  long: "52.8777"  // optional: hardcoded or use geolocation
                };

    try {
      const response = await addOrganisation(payload);
      if (response.data.status === "success") {
        toast("Organisation saved successfully!");
        handleReset();
        navigate("/organisation");
      } else {
        toast(response.data.message);
      }
    } catch (error) {
      toast("Failed to save organisation.");
    }
  };


  useEffect(() => {
  const loadStates = async () => {
    try {
      const res = await fetchStates();
      if (res.status === "success") {
        setStateList(res.data); // Adjust if your API structure is different
      }
    } catch (err) {
      toast("Failed to load states");
    }
  };

  loadStates();
}, []);

useEffect(() => {
  if (!selectedState) return;

  const loadCities = async () => {
    try {
      const res = await fetchCitiesByState(Number(selectedState));
      if (res?.status === "success") {
        setCityList(res.data);
      }
    } catch (err) {
      toast("Failed to load cities");
    }
  };

  loadCities();
}, [selectedState]);


// useEffect(() => {
//     const loadStatuses = async () => {
//       try {
//         const res = await fetchOrdersStatus();
//         if (res.status === "success") {
//           setStatusList(res.data);
//         }
//       } catch (error) {
//         console.error("Failed to fetch status list", error);
//       }
//     };

//     loadStatuses();
//   }, []);

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
            State <span style={{ color: "red" }}>*</span>
          </InputLabel>
          <Select
            fullWidth
            displayEmpty
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            <MenuItem value="" disabled>Select a state</MenuItem>
            {stateList.map((state) => (
              <MenuItem key={state.id} value={state.id}>
                {state.name}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box mb={3}>
          <InputLabel sx={{ fontWeight: 600, fontSize: "1rem", mb: 1 }}>
            City <span style={{ color: "red" }}>*</span>
          </InputLabel>
          <Select
            fullWidth
            displayEmpty
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            disabled={!cityList.length}
          >
            <MenuItem value="" disabled>Select a city</MenuItem>
            {cityList.map((city) => (
              <MenuItem key={city.id} value={city.id}>
                {city.name}
              </MenuItem>
            ))}
          </Select>
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

        <Box mb={3}>
          <InputLabel sx={{ fontWeight: 600, fontSize: "1rem", mb: 1 }}>
            Landmark <span style={{ color: "red" }}>*</span>
          </InputLabel>
          <TextField
            fullWidth
            size="medium"
            placeholder="Enter Land Mark"
            value={landMark}
            onChange={(e) => setLandMark(e.target.value)}
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

export default AddOrganisation;
