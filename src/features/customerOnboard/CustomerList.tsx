import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Checkbox,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// Top of the file
import { useNavigate } from "react-router-dom";

interface Customer {
  id: number;
  name: string;
  legalName: string;
  mobile: string;
  pan?: string;
  gst?: string;
  status: boolean;
}

const CustomerList: React.FC = () => {
  const [filters, setFilters] = useState({
    orgId: "",
    orgName: "",
    legalName: "",
    mobile: "",
    state: "",
    city: "",
    outlet: "",
  });

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [cityList, setCityList] = useState<string[]>([]);
  const [outletList, setOutletList] = useState<string[]>([]);

  // Mock APIs
  const fetchCustomers = async () => {
    const data: Customer[] = [
      {
        id: 1,
        name: "Tasty Bites",
        legalName: "Tasty Bites Pvt Ltd",
        mobile: "9163358851",
        pan: "ABCDE1234F",
        gst: "22ABCDE1234F1Z5",
        status: true,
      },
      {
        id: 2,
        name: "Anurag Store",
        legalName: "Anurag Enterprises",
        mobile: "9165715100",
        status: true,
      },
    ];
    setCustomers(data);
  };

  const fetchDropdowns = async () => {
    setCityList(["Delhi", "Mumbai", "Lucknow"]);
    setOutletList(["Outlet A", "Outlet B", "Outlet C"]);
  };

  useEffect(() => {
    fetchCustomers();
    fetchDropdowns();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Apply filters", filters);
  };

  const handleReset = () => {
    setFilters({
      orgId: "",
      orgName: "",
      legalName: "",
      mobile: "",
      state: "",
      city: "",
      outlet: "",
    });
    fetchCustomers();
  };

  const handleStatusChange = (id: number, checked: boolean) => {
    const updated = customers.map((c) =>
      c.id === id ? { ...c, status: checked } : c
    );
    setCustomers(updated);
    console.log(`Updated status of ${id} to`, checked);
  };

  const handleEdit = (id: number) => {
    console.log("Edit:", id);
  };

  const handleDelete = (id: number) => {
    setCustomers(customers.filter((c) => c.id !== id));
    console.log("Delete:", id);
  };
  const navigate = useNavigate();

  return (
    <Box p={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h6">Customer List</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/customerOnboard/addCustomer")}
        >
          Add Customer
        </Button>
      </Box>

      {/* Filters */}
      <Box display="flex" flexWrap="wrap" gap={2} mb={3}>
        <TextField
          label="Organisation Id"
          name="orgId"
          value={filters.orgId}
          onChange={handleFilterChange}
          sx={{ width: "200px" }}
        />
        <TextField
          label="Organisation Name"
          name="orgName"
          value={filters.orgName}
          onChange={handleFilterChange}
          sx={{ width: "200px" }}
        />
        <TextField
          label="Legal Name"
          name="legalName"
          value={filters.legalName}
          onChange={handleFilterChange}
          sx={{ width: "200px" }}
        />
        <TextField
          label="Mobile Number"
          name="mobile"
          value={filters.mobile}
          onChange={handleFilterChange}
          sx={{ width: "200px" }}
        />
        <TextField
          select
          label="State"
          name="state"
          value={filters.state}
          onChange={handleFilterChange}
          sx={{ width: "150px" }}
        >
          <MenuItem value="">State</MenuItem>
          <MenuItem value="Delhi">Delhi</MenuItem>
          <MenuItem value="UP">UP</MenuItem>
        </TextField>
        <TextField
          select
          label="City"
          name="city"
          value={filters.city}
          onChange={handleFilterChange}
          sx={{ width: "150px" }}
        >
          <MenuItem value="">City</MenuItem>
          {cityList.map((city) => (
            <MenuItem key={city} value={city}>
              {city}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Outlet Name"
          name="outlet"
          value={filters.outlet}
          onChange={handleFilterChange}
          sx={{ width: "200px" }}
        >
          <MenuItem value="">Outlet</MenuItem>
          {outletList.map((outlet) => (
            <MenuItem key={outlet} value={outlet}>
              {outlet}
            </MenuItem>
          ))}
        </TextField>

        <Box display="flex" alignItems="center" gap={1}>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant="outlined" onClick={handleReset}>
            Reset
          </Button>
        </Box>
      </Box>

      {/* Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>NAME</strong>
            </TableCell>
            <TableCell>
              <strong>LEGAL NAME</strong>
            </TableCell>
            <TableCell>
              <strong>MOBILE</strong>
            </TableCell>
            <TableCell>
              <strong>PAN</strong>
            </TableCell>
            <TableCell>
              <strong>GST</strong>
            </TableCell>
            <TableCell>
              <strong>STATUS</strong>
            </TableCell>
            <TableCell>
              <strong>ACTIONS</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((c) => (
            <TableRow key={c.id}>
              <TableCell>{c.name}</TableCell>
              <TableCell>{c.legalName}</TableCell>
              <TableCell>{c.mobile}</TableCell>
              <TableCell>{c.pan || "-"}</TableCell>
              <TableCell>{c.gst || "-"}</TableCell>
              <TableCell>
                <Checkbox
                  checked={c.status}
                  onChange={(e) => handleStatusChange(c.id, e.target.checked)}
                />
              </TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(c.id)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(c.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default CustomerList;
