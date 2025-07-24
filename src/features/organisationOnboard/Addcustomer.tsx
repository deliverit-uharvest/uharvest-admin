import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

interface StateOption {
  id: number;
  name: string;
}
interface ManagerOption {
  id: number;
  name: string;
}

const AddCustomer = () => {
  const [states, setStates] = useState<StateOption[]>([]);
  const [managers, setManagers] = useState<ManagerOption[]>([]);

  // Uncomment for real API
  // useEffect(() => {
  //   axios.get("/api/states").then((res) => setStates(res.data));
  //   axios.get("/api/account-managers").then((res) => setManagers(res.data));
  // }, []);

  const formik = useFormik({
    initialValues: {
      organizationName: "",
      legalName: "",
      email: "",
      mobileNumber: "",
      alternateMobileNumber: "",
      panNumber: "",
      gstNumber: "",
      fullAddress: "",
      latitude: "",
      longitude: "",
      landmark: "",
      state: "",
      pinCode: "",
      accountManager: "",
      isSignCashbackCredit: false,
    },
    validationSchema: Yup.object({
      organizationName: Yup.string().required("Required"),
      legalName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email"),
      mobileNumber: Yup.string().required("Required"),
      fullAddress: Yup.string().required("Required"),
      latitude: Yup.string().required("Required"),
      longitude: Yup.string().required("Required"),
      landmark: Yup.string().required("Required"),
      state: Yup.string().required("Required"),
      pinCode: Yup.string().required("Required"),
      accountManager: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post("/api/customers", values);
        alert("Customer saved successfully!");
      } catch (err) {
        alert("Failed to save customer.");
      }
    },
  });

  const { values, errors, touched, handleChange, handleSubmit, handleReset } = formik;

  return (
    <Box p={2}>
      {/* Tabs - Just UI mimic */}
     <Box
  sx={{
    bgcolor: "#FFB400",
    color: "#003300",
    borderRadius: "8px 8px 8px 8px",
    width: 140,
    marginBottom:"5px",
    height: 45,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "500",
    fontSize: 16,
  }}
>
  Organization
</Box>

      <form onSubmit={handleSubmit}>
        {/* Organization Section */}
        <Box border="1px solid green" borderRadius={2} p={2} mb={2}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            mb={1}
            border="2px solid green"
            display="inline-block"
            px={2}
            borderRadius={1}
          >
            Basic Organization Details
          </Typography>

          <Box display="grid" gridTemplateColumns={{ sm: "1fr", md: "repeat(2, 1fr)" }} gap={2}>
            <TextField
              label="Organization Name *"
              name="organizationName"
              value={values.organizationName}
              onChange={handleChange}
              error={touched.organizationName && Boolean(errors.organizationName)}
              helperText={touched.organizationName && errors.organizationName}
            />
            <TextField
              label="Legal Name *"
              name="legalName"
              value={values.legalName}
              onChange={handleChange}
              error={touched.legalName && Boolean(errors.legalName)}
              helperText={touched.legalName && errors.legalName}
            />
            <TextField
              label="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            <TextField
              label="Mobile Number *"
              name="mobileNumber"
              value={values.mobileNumber}
              onChange={handleChange}
              error={touched.mobileNumber && Boolean(errors.mobileNumber)}
              helperText={touched.mobileNumber && errors.mobileNumber}
            />
            <TextField
              label="Alternate Mobile Number"
              name="alternateMobileNumber"
              value={values.alternateMobileNumber}
              onChange={handleChange}
            />
            <TextField
              label="PAN Number"
              name="panNumber"
              value={values.panNumber}
              onChange={handleChange}
            />
            <TextField
              label="GST Number"
              name="gstNumber"
              value={values.gstNumber}
              onChange={handleChange}
            />
          </Box>
        </Box>

        {/* Address Section */}
        <Box border="1px solid green" borderRadius={2} p={2} mb={2}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            mb={1}
            border="2px solid green"
            display="inline-block"
            px={2}
            borderRadius={1}
          >
            Address Details
          </Typography>

          <TextField
            fullWidth
            multiline
            rows={3}
            label="Full Address *"
            name="fullAddress"
            value={values.fullAddress}
            onChange={handleChange}
            error={touched.fullAddress && Boolean(errors.fullAddress)}
            helperText={touched.fullAddress && errors.fullAddress}
            sx={{ mb: 2 }}
          />

          <Box display="grid" gridTemplateColumns={{ sm: "1fr", md: "repeat(3, 1fr)" }} gap={2}>
            <TextField
              label="Latitude *"
              name="latitude"
              value={values.latitude}
              onChange={handleChange}
              error={touched.latitude && Boolean(errors.latitude)}
              helperText={touched.latitude && errors.latitude}
            />
            <TextField
              label="Longitude *"
              name="longitude"
              value={values.longitude}
              onChange={handleChange}
              error={touched.longitude && Boolean(errors.longitude)}
              helperText={touched.longitude && errors.longitude}
            />
            <TextField
              label="Landmark *"
              name="landmark"
              value={values.landmark}
              onChange={handleChange}
              error={touched.landmark && Boolean(errors.landmark)}
              helperText={touched.landmark && errors.landmark}
            />
            <FormControl fullWidth error={touched.state && Boolean(errors.state)}>
              <InputLabel>State *</InputLabel>
              <Select
                name="state"
                value={values.state}
                onChange={handleChange}
                label="State *"
              >
                {states.map((state) => (
                  <MenuItem key={state.id} value={state.id}>
                    {state.name}
                  </MenuItem>
                ))}
              </Select>
              {touched.state && errors.state && (
                <Typography variant="caption" color="error">{errors.state}</Typography>
              )}
            </FormControl>
            <TextField
              label="Pin Code *"
              name="pinCode"
              value={values.pinCode}
              onChange={handleChange}
              error={touched.pinCode && Boolean(errors.pinCode)}
              helperText={touched.pinCode && errors.pinCode}
            />
          </Box>
        </Box>

        {/* Account Manager + Checkbox */}
        <Box display="flex" flexWrap="wrap" gap={2} mb={2}>
          <FormControl fullWidth error={touched.accountManager && Boolean(errors.accountManager)}>
            <InputLabel>Account Manager *</InputLabel>
            <Select
              name="accountManager"
              value={values.accountManager}
              onChange={handleChange}
              label="Account Manager *"
            >
              {managers.map((manager) => (
                <MenuItem key={manager.id} value={manager.id}>
                  {manager.name}
                </MenuItem>
              ))}
            </Select>
            {touched.accountManager && errors.accountManager && (
              <Typography variant="caption" color="error">{errors.accountManager}</Typography>
            )}
          </FormControl>

          <FormControlLabel
            control={
              <Checkbox
                name="isSignCashbackCredit"
                checked={values.isSignCashbackCredit}
                onChange={handleChange}
              />
            }
            label="Is Sign Cashback Credit?"
          />
        </Box>

        {/* Action Buttons */}
        <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
          <Button variant="outlined" onClick={handleReset}>Reset</Button>
          <Button variant="contained" color="warning" type="submit">Save & Next</Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddCustomer;
