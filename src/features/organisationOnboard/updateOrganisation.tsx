import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getOrganisationById, updateOrganisation } from "../../app/services/OrganisationService";
import { fetchStates, States } from "../../app/services/StatesService";
import { fetchCitiesByState, City } from "../../app/services/CitiesService";
import { toast } from "react-toastify";

const UpdateOrganisation = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [legalName, setLegalName] = useState("");
  //const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [secmobile, setSecMobile] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [landMark, setLandMark] = useState("");

  const [stateList, setStateList] = useState<States[]>([]);
  const [selectedState, setSelectedState] = useState("");
  const [cityList, setCityList] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const loadStates = async () => {
      try {
        const res = await fetchStates();
        if (res.status === "success") {
          setStateList(res.data);
        }
      } catch (err) {
        toast("Failed to load states");
      }
    };
    loadStates();
  }, []);

  useEffect(() => {
    const fetchOrganisation = async () => {
      try {
        if (!id) return;
        const res = await getOrganisationById(Number(id));
        if (res.status === "success") {
          const data = res.data;
          setName(data.name);
          setLegalName(data.legalname);
          //setEmail(data.email);
          setMobile(data.mobile);
          setSecMobile(data.secondary_mobile);
          setPanNumber(data.pan_number);
          setGstNumber(data.gst_number);
          setAddress(data.address);
          setPincode(data.pin_code);
          setLandMark(data.land_mark);

          const stateId = String(data.stateid);
          const cityId = String(data.cityid);
          setSelectedState(stateId);

          // Load city list then set city
          const cityRes = await fetchCitiesByState(Number(stateId));
          if (cityRes.status === "success") {
            setCityList(cityRes.data);
            setSelectedCity(cityId);
          }
        }
      } catch (error) {
        toast("Failed to fetch organisation");
      }
    };

    fetchOrganisation();
  }, [id]);

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

  const handleSubmit = async () => {
    const payload = {
      //id: Number(id),
      name,
      legalname: legalName,
      //email,
      mobile,
      secondary_mobile: secmobile,
      pan_number: panNumber,
      gst_number: gstNumber,
      address,
      pin_code: pincode,
      stateid: Number(selectedState),
      cityid: Number(selectedCity),
      land_mark: landMark,
      lat: "21.0760",
      long: "52.8777",
    };

    try {
      const response = await updateOrganisation(payload, Number(id));
      if (response.status === "success") {
        toast("Organisation updated successfully!");
        navigate("/organisation");
      } else {
        toast(response.data.message);
      }
    } catch (error) {
      toast("Failed to update organisation.");
    }
  };

  return (
    <Box minHeight="20vh" display="flex" justifyContent="center" alignItems="center" bgcolor="#f9f9f9">
      <Paper elevation={3} sx={{ backgroundColor: "#fff", borderRadius: 4, p: 5, width: "100%", maxWidth: 900 }}>
        <Typography variant="h5" fontWeight={700} mb={4} color="primary" textAlign="center">
          Update Organisation
        </Typography>

        <Box mb={3}><InputLabel>Name</InputLabel><TextField fullWidth value={name} onChange={(e) => setName(e.target.value)} /></Box>
        <Box mb={3}><InputLabel>Legal Name</InputLabel><TextField fullWidth value={legalName} onChange={(e) => setLegalName(e.target.value)} /></Box>
        {/* <Box mb={3}><InputLabel>Email</InputLabel><TextField fullWidth value={email} onChange={(e) => setEmail(e.target.value)} /></Box> */}
        <Box mb={3}><InputLabel>Mobile</InputLabel><TextField fullWidth value={mobile} onChange={(e) => setMobile(e.target.value)} /></Box>
        <Box mb={3}><InputLabel>Secondary Mobile</InputLabel><TextField fullWidth value={secmobile} onChange={(e) => setSecMobile(e.target.value)} /></Box>
        <Box mb={3}><InputLabel>PAN Number</InputLabel><TextField fullWidth value={panNumber} onChange={(e) => setPanNumber(e.target.value)} /></Box>
        <Box mb={3}><InputLabel>GST Number</InputLabel><TextField fullWidth value={gstNumber} onChange={(e) => setGstNumber(e.target.value)} /></Box>
        <Box mb={3}><InputLabel>Address</InputLabel><TextField fullWidth value={address} onChange={(e) => setAddress(e.target.value)} /></Box>

        <Box mb={3}>
          <InputLabel>State</InputLabel>
          <Select fullWidth displayEmpty value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
            <MenuItem value="" disabled>Select a state</MenuItem>
            {stateList.map((state) => (
              <MenuItem key={state.id} value={state.id}>{state.name}</MenuItem>
            ))}
          </Select>
        </Box>

        <Box mb={3}>
          <InputLabel>City</InputLabel>
          <Select fullWidth displayEmpty value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} disabled={!cityList.length}>
            <MenuItem value="" disabled>Select a city</MenuItem>
            {cityList.map((city) => (
              <MenuItem key={city.id} value={city.id}>{city.name}</MenuItem>
            ))}
          </Select>
        </Box>

        <Box mb={3}><InputLabel>Pincode</InputLabel><TextField fullWidth value={pincode} onChange={(e) => setPincode(e.target.value)} /></Box>
        <Box mb={3}><InputLabel>Landmark</InputLabel><TextField fullWidth value={landMark} onChange={(e) => setLandMark(e.target.value)} /></Box>

        <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" onClick={handleSubmit} sx={{ px: 4, py: 1.2, backgroundColor: "#fcb500", color: "#000", fontWeight: 600, "&:hover": { backgroundColor: "#fbc02d" } }}>
            Update
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default UpdateOrganisation;
