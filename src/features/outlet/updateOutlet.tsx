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
import { getOutletById, updateOutlet } from "../../app/services/OutletService";
import { fetchStates, States } from "../../app/services/StatesService";
import { fetchCitiesByState, City } from "../../app/services/CitiesService";
import { fetchOrganisation, Organisation } from "../../app/services/OrganisationService";
import { toast } from "react-toastify";

const UpdateOutlet = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [secmobile, setSecMobile] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [pincode, setPincode] = useState("");
  const [landMark, setLandMark] = useState("");

  const [stateList, setStateList] = useState<States[]>([]);
  const [selectedState, setSelectedState] = useState("");
  const [cityList, setCityList] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState("");

  const [organisationList, setOrganisationList] = useState<Organisation[]>([]);
  const [selectedOrganisation, setSelectedOrganisation] = useState("");

  const [shopLicenseNumber, setShopLicenseNumber] = useState("");
  const [fssaiNumber, setFssaiNumber] = useState("");
  const [licenseRegistrationNumber, setLicenseRegistrationNumber] = useState("");
  const [openingTime, setOpeningTime] = useState("09:00:00");
  const [closingTime, setClosingTime] = useState("21:00:00");
  const [lunchTime, setLunchTime] = useState("14:00:00");

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
        const res = await getOutletById(Number(id));
        if (res.status === "success") {
          const data = res.data;
          setSelectedOrganisation(data.org_id);
          setName(data.name);
          setMobile(data.mobile);
          setSecMobile(data.secondary_mobile);
          setPanNumber(data.pan_number);
          setGstNumber(data.gst_number);
          setFssaiNumber(data.fssai_number);
          setLicenseRegistrationNumber(data.fssai_number);
          setShopLicenseNumber(data.shop_license);
          setAddress1(data.shipping_addressline1);
          setAddress2(data.shipping_addressline2);
          setPincode(data.shippingpincode);
          setLandMark(data.land_mark);
          setSelectedOrganisation(String(data.org_id));
          const stateId = String(data.shippingState?.id || "");
          const cityId = String(data.shippingCity?.id || "");
          setSelectedState(stateId);
          setOpeningTime(data.opening_time);
          setClosingTime(data.closing_time);
          setLunchTime(data.lunch_time);

          const cityRes = await fetchCitiesByState(Number(stateId));
          if (cityRes.status === "success") {
            setCityList(cityRes.data);
            setSelectedCity(cityId);
          }
        }
      } catch (error) {
        toast("Failed to fetch outlet");
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
      //org_id: selectedOrganisation,
      name,
      mobile,
      secondary_mobile: secmobile,
      //pan_number: panNumber,
      //gst_number: gstNumber,
      shop_license: shopLicenseNumber,
      fssai_number: fssaiNumber,
      license_registration_number: licenseRegistrationNumber,
      shipping_addressline1: address1,
      shipping_addressline2: address2,
      shippingpincode: pincode,
      shippingstateid: Number(selectedState),
      shippingcityid: Number(selectedCity),
      land_mark: landMark,
      opening_time: openingTime,
      closing_time: closingTime,
      lunch_time: lunchTime,
      lat: "21.0760",
      long: "52.8777",
    };

    try {
      const response = await updateOutlet(payload, Number(id));
      if (response.status === "success") {
        toast("Outlet updated successfully!");
        navigate("/organisation/outlet");
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
          Update Outlet
        </Typography>
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

        <Box mb={3}><InputLabel>Name</InputLabel><TextField fullWidth value={name} onChange={(e) => setName(e.target.value)} /></Box>
        <Box mb={3}><InputLabel>Mobile</InputLabel><TextField fullWidth value={mobile} onChange={(e) => setMobile(e.target.value)} /></Box>
        <Box mb={3}><InputLabel>Secondary Mobile</InputLabel><TextField fullWidth value={secmobile} onChange={(e) => setSecMobile(e.target.value)} /></Box>
        <Box mb={3}><InputLabel>PAN Number</InputLabel><TextField fullWidth value={panNumber} onChange={(e) => setPanNumber(e.target.value)} /></Box>
        <Box mb={3}><InputLabel>GST Number</InputLabel><TextField fullWidth value={gstNumber} onChange={(e) => setGstNumber(e.target.value)} /></Box>
        <Box mb={3}><InputLabel>Shop License </InputLabel><TextField fullWidth value={shopLicenseNumber} onChange={(e) => setShopLicenseNumber(e.target.value)} /></Box>
        <Box mb={3}><InputLabel>FSSAI Number </InputLabel><TextField fullWidth value={fssaiNumber} onChange={(e) => setFssaiNumber(e.target.value)} /></Box>
        <Box mb={3}><InputLabel>License Registration Number </InputLabel><TextField fullWidth value={licenseRegistrationNumber} onChange={(e) => setLicenseRegistrationNumber(e.target.value)} /></Box>
        <Box mb={3}><InputLabel>Shipping Address Line1 </InputLabel><TextField fullWidth value={address1} onChange={(e) => setAddress1(e.target.value)} /></Box>
        <Box mb={3}><InputLabel>Shipping Address Line2 </InputLabel><TextField fullWidth value={address2} onChange={(e) => setAddress2(e.target.value)} /></Box>

        <Box mb={3}>
          <InputLabel>Shipping State</InputLabel>
          <Select fullWidth displayEmpty value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
            <MenuItem value="" disabled>Select a state</MenuItem>
            {stateList.map((state) => (
              <MenuItem key={state.id} value={state.id}>{state.name}</MenuItem>
            ))}
          </Select>
        </Box>

        <Box mb={3}>
          <InputLabel>Shipping City</InputLabel>
          <Select fullWidth displayEmpty value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} disabled={!cityList.length}>
            <MenuItem value="" disabled>Select a city</MenuItem>
            {cityList.map((city) => (
              <MenuItem key={city.id} value={city.id}>{city.name}</MenuItem>
            ))}
          </Select>
        </Box>

        <Box mb={3}><InputLabel>Shipping pincode </InputLabel><TextField fullWidth value={pincode} onChange={(e) => setPincode(e.target.value)} /></Box>
        <Box mb={3}><InputLabel>Landmark</InputLabel><TextField fullWidth value={landMark} onChange={(e) => setLandMark(e.target.value)} /></Box>
        
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
        <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" onClick={handleSubmit} sx={{ px: 4, py: 1.2, backgroundColor: "#fcb500", color: "#000", fontWeight: 600, "&:hover": { backgroundColor: "#fbc02d" } }}>
            Update
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default UpdateOutlet;
