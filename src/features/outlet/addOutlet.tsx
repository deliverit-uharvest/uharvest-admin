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
import { fetchStates, States } from "../../app/services/StatesService";
import { fetchCitiesByState, City } from "../../app/services/CitiesService";

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

  const [stateList, setStateList] = useState<States[]>([]);
  const [selectedState, setSelectedState] = useState("");

  const [cityList, setCityList] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState("");

  const [openingTime, setOpeningTime] = useState("09:00:00");
  const [closingTime, setClosingTime] = useState("21:00:00");
  const [lunchTime, setLunchTime] = useState("14:00:00");
  const [landMark, setLandMark] = useState("");

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
                  mobile,
                  secondary_mobile: secmobile,
                  pan_number: panNumber,
                  gst_number: gstNumber,
                  fssai_number: fssaiNumber,
                  license_registration_number: licenseRegistrationNumber,
                  shop_license: shopLicense,
                  opening_time: openingTime,
                  closing_time: closingTime,
                  shipping_addressline1:shippingAddressline1,
                  shipping_addressline2:shippingAddressline2,
                  shippingpincode: shippingPincode,
                  shippingstateid: Number(selectedState),
                  shippingcityid: Number(selectedCity),
                  land_mark: landMark,
                  lat: "21.0760",  // optional: hardcoded or use geolocation
                  long: "52.8777"  // optional: hardcoded or use geolocation
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
            Shipping State <span style={{ color: "red" }}>*</span>
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
            Shipping City <span style={{ color: "red" }}>*</span>
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

        <Box mb={3}>
        <InputLabel sx={{ fontWeight: 600, fontSize: "1rem", mb: 1 }}>
          Opening Time <span style={{ color: "red" }}>*</span>
        </InputLabel>
        <TextField
          fullWidth
          type="time"
          value={openingTime}
          onChange={(e) => setOpeningTime(e.target.value)}
          inputProps={{ step: 1 }} // allows HH:mm:ss
        />
      </Box>

      <Box mb={3}>
        <InputLabel sx={{ fontWeight: 600, fontSize: "1rem", mb: 1 }}>
          Closing Time <span style={{ color: "red" }}>*</span>
        </InputLabel>
        <TextField
          fullWidth
          type="time"
          value={closingTime}
          onChange={(e) => setClosingTime(e.target.value)}
          inputProps={{ step: 1 }} // allows HH:mm:ss
        />
      </Box>

      <Box mb={3}>
        <InputLabel sx={{ fontWeight: 600, fontSize: "1rem", mb: 1 }}>
          Lunch Time <span style={{ color: "red" }}>*</span>
        </InputLabel>
        <TextField
          fullWidth
          type="time"
          value={lunchTime}
          onChange={(e) => setLunchTime(e.target.value)}
          inputProps={{ step: 1 }} // allows HH:mm:ss
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
