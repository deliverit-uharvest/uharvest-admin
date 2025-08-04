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
import { addOutletUser } from "../../app/services/OutletUserService";
import { fetchOrganisation, Organisation } from "../../app/services/OrganisationService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchStates, States } from "../../app/services/StatesService";
import { fetchCitiesByState, City } from "../../app/services/CitiesService";
import { fetchOutletByOrganisation, Outlet } from "../../app/services/OutletService";
import { fetchUserRole } from "../../app/services/OutletUserService";

const AddOutlet = () => {
  const [name, setName] = useState("");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [mobile, setMobile] = useState("");
  // const [secmobile, setSecMobile] = useState("");
  // const [panNumber, setPanNumber] = useState("");
  // const [gstNumber, setGstNumber] = useState("");
  // const [shopLicense, setShopLicense] = useState("");
  // const [fssaiNumber, setFssaiNumber] = useState("");
  // const [licenseRegistrationNumber, setLicenseRegistrationNumber] = useState("");
  // const [shippingAddressline1, setShippingAddressline1] = useState("");
  // const [shippingAddressline2, setShippingAddressline2] = useState("");
  
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

  const [outletList, setOutletList] = useState<Outlet[]>([]);
  const [selectedOutlet, setSelectedOutlet] = useState("");

  const [roleList, setRoleList] = useState<{ id: number; name: string }[]>([]);
  //const [selectedRole, setSelectedRole] = useState("");
  const [selectedRole, setSelectedRole] = useState<{ id: number; name: string } | null>(null);

  const [openingTime, setOpeningTime] = useState("09:00:00");
  const [closingTime, setClosingTime] = useState("21:00:00");
  const [lunchTime, setLunchTime] = useState("14:00:00");
  const [landMark, setLandMark] = useState("");

  const handleReset = () => {
    setName("");
    
    setEmail("");
    //setMobile("");
    
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
                  outlet_id: selectedRole?.name === "User" ? selectedOutlet : null,
                  email,
                  password,
                  role_id: selectedRole?.id,
                  
                };

    try {
      const response = await addOutletUser(payload);
      if (response.data.status === "success") {
        toast("User saved successfully!");
        handleReset();
        navigate("/organisation/outlet/user");
      } else {
        toast(response.data.message);
      }
    } catch (error) {
      toast("Failed to save User.");
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


  useEffect(() => {
    if (!selectedOrganisation) return;
  
    const loadOrganisation = async () => {
      try {
        const res = await fetchOutletByOrganisation(Number(selectedOrganisation));
        if (res?.status === "success") {
          setOutletList(res.data);
        }
      } catch (err) {
        toast("Failed to load outlet");
      }
    };
  
    loadOrganisation();
  }, [selectedOrganisation]);

  useEffect(() => {
  const loadRoles = async () => {
    try {
      const res = await fetchUserRole({});
      if (res?.status === "success") {
        setRoleList(res.data);
      }
    } catch (err) {
      toast("Failed to load user roles");
    }
  };

  loadRoles();
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
          Add New Outlet User
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
            User Role <span style={{ color: "red" }}>*</span>
          </InputLabel>
          <Select
            fullWidth
            displayEmpty
            value={selectedRole?.id || ""}
            onChange={(e) => {
              const selected = roleList.find((role) => role.id === e.target.value);
              setSelectedRole(selected || null);
            }}
          >
            <MenuItem value="" disabled>Select a role</MenuItem>
            {roleList
              .filter((role) => role.name.toLowerCase() !== "super admin")
              .map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.name}
                </MenuItem>
            ))}
          </Select>
        </Box>

        {selectedRole?.name === "User" && (
          <Box mb={3}>
            <InputLabel sx={{ fontWeight: 600, fontSize: "1rem", mb: 1 }}>
              Outlet <span style={{ color: "red" }}>*</span>
            </InputLabel>
            <Select
              fullWidth
              displayEmpty
              value={selectedOutlet}
              onChange={(e) => setSelectedOutlet(e.target.value)}
              disabled={!outletList.length}
            >
              <MenuItem value="" disabled>Select an outlet</MenuItem>
              {outletList.map((out) => (
                <MenuItem key={out.id} value={out.id}>
                  {out.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
        )}

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
            Password <span style={{ color: "red" }}>*</span>
          </InputLabel>
          <TextField
            fullWidth
            size="medium"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
