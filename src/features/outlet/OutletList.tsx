import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { fetchOutlet, Outlet, deleteOutlet } from "../../app/services/OutletService";
import TableSkeleton from "../loader/TableSkeleton";

const OutletList = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Outlet[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Outlet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOutletId, setSelectedOutletId] = useState<number | null>(null);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const loadOutlets = async () => {
    try {
      setLoading(true);
      const res = await fetchOutlet({});
      if (res.status === "success") {
        setCategories(res.data);
        setFilteredCategories(filterRows(res.data, searchText));
      } else {
        toast(res.message);
      }
    } catch (err) {
      toast("Failed to load outlet.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (id: number) => {
    setSelectedOutletId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedOutletId(null);
    setOpenDialog(false);
  };

  const handleConfirmDelete = async () => {
    if (!selectedOutletId) return;
    try {
      await deleteOutlet(selectedOutletId);
      setCategories(prev => prev.filter(outlet => outlet.id !== selectedOutletId));
      setFilteredCategories(prev => prev.filter(outlet => outlet.id !== selectedOutletId));
      toast.success("Outlet deleted successfully.");
    } catch (err) {
      toast.error("Something went wrong while deleting.");
    } finally {
      handleCloseDialog();
    }
  };

  const filterRows = (rows: Outlet[], query: string) => {
    if (!query) return rows;
    const lowercasedQuery = query.toLowerCase();
    return rows.filter((row) =>
      Object.values(row).some((value) =>
        typeof value === "object"
          ? JSON.stringify(value).toLowerCase().includes(lowercasedQuery)
          : value?.toString().toLowerCase().includes(lowercasedQuery)
      )
    );
  };

  useEffect(() => {
    loadOutlets();
  }, []);

  return (
    <Box px={1.5} py={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight={600} fontSize="15px">
          Outlet
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ backgroundColor: "#fcb500", color: "#000", fontWeight: 600 }}
          onClick={() => handleNavigate("/organisation/outlet/add")}
        >
          Add Outlet
        </Button>
      </Box>

      <Box display="flex" justifyContent="flex-start" mb={2}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchText}
          onChange={(e) => {
            const value = e.target.value;
            setSearchText(value);
            setFilteredCategories(filterRows(categories, value));
          }}
          sx={{ minWidth: 300 }}
        />
      </Box>

      <TableContainer component={Paper}>
        {loading ? (
          <TableSkeleton rows={6} columns={9} />
        ) : filteredCategories.length > 0 ? (
          <Table size="small" sx={{ minWidth: 1100 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f9f9f9" }}>
                {["Name", "Email", "Mobile", "PAN", "GST", "Address", "Pincode", "City", "State", "Actions"].map(
                  (head) => (
                    <TableCell key={head} sx={{ fontSize: "14px", fontWeight: 600 }}>
                      {head}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCategories.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell sx={{ fontSize: "14px" }}>{row.name || "—"}</TableCell>
                  <TableCell sx={{ fontSize: "14px" }}>{row.email || "—"}</TableCell>
                  <TableCell sx={{ fontSize: "14px" }}>{row.mobile || "—"}</TableCell>
                  <TableCell sx={{ fontSize: "14px" }}>{row.pan_number || "—"}</TableCell>
                  <TableCell sx={{ fontSize: "14px" }}>{row.gst_number || "—"}</TableCell>
                  <TableCell sx={{ fontSize: "14px" }}>{row.shipping_addressline1 || "—"}</TableCell>
                  <TableCell sx={{ fontSize: "14px" }}>{row.shippingpincode || "—"}</TableCell>
                  <TableCell sx={{ fontSize: "14px" }}>{row.shippingCity?.name || "—"}</TableCell>
                  <TableCell sx={{ fontSize: "14px" }}>{row.shippingState?.name || "—"}</TableCell>
                  <TableCell align="center">
                    <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleNavigate(`/organisation/outlet/update/${row.id}`)}
                      >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleOpenDialog(row.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography p={2}>No data found</Typography>
        )}
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this outlet? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OutletList;
