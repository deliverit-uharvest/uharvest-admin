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
  Paper,
  IconButton,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TableSkeleton from "../loader/TableSkeleton";
import {
  fetchOrganisation,
  Organisation,
  deleteOrganisation,
} from "../../app/services/OrganisationService";

const OrganisationList = () => {
  const navigate = useNavigate();

  const [organisations, setOrganisations] = useState<Organisation[]>([]);
  const [filtered, setFiltered] = useState<Organisation[]>([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrgId, setSelectedOrgId] = useState<number | null>(null);

  const rowsPerPage = 10;

  const loadOrganisations = async () => {
    try {
      setLoading(true);
      const res = await fetchOrganisation({});
      if (res.status === "success") {
        setOrganisations(res.data);
        setFiltered(res.data);
      } else {
        toast.error(res.message || "Failed to fetch organisations");
      }
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrganisations();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    const lower = value.toLowerCase();
    const filteredRows = organisations.filter((org) =>
      Object.values(org).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );
    setFiltered(filteredRows);
    setPage(1);
  };

  const handleEdit = (id: number) => {
    console.log("Edit", id);
    // navigate(`/organisation/edit/${id}`)
  };

  const handleOpenDialog = (id: number) => {
    setSelectedOrgId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedOrgId(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedOrgId) return;

    try {
      await deleteOrganisation(selectedOrgId);
      toast.success("Organisation deleted successfully");
      loadOrganisations(); // reload data
    } catch (err) {
      toast.error("Failed to delete organisation");
    } finally {
      handleCloseDialog();
    }
  };

  const paginatedData = filtered.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const headerCellStyle = { padding: "8px 14px", fontSize: 14, fontWeight: 600 };
  const cellStyle = { padding: "8px 14px", fontSize: 14 };

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight={600}>
          Organisation
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: "#fcb500",
            color: "#000",
            fontWeight: 600,
            "&:hover": { backgroundColor: "#e0a800" },
          }}
          onClick={() => navigate("/organisation/add")}
        >
          Add Organisation
        </Button>
      </Box>

      <Box mb={2}>
        <TextField
          label="Search"
          value={searchText}
          onChange={handleSearch}
          variant="outlined"
          fullWidth
        />
      </Box>

      {loading ? (
        <TableSkeleton rows={6} columns={8} />
      ) : (
        <Paper>
          <TableContainer>
            <Table size="medium">
              <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell sx={headerCellStyle}>Name</TableCell>
                  <TableCell sx={headerCellStyle}>Legal Name</TableCell>
                  <TableCell sx={headerCellStyle}>Email</TableCell>
                  <TableCell sx={headerCellStyle}>Mobile</TableCell>
                  <TableCell sx={headerCellStyle}>Address</TableCell>
                  <TableCell sx={headerCellStyle}>PIN Code</TableCell>
                  <TableCell sx={headerCellStyle}>PAN Number</TableCell>
                  <TableCell sx={{ ...headerCellStyle }} align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.map((org) => (
                  <TableRow key={org.id}>
                    <TableCell sx={cellStyle}>{org.name}</TableCell>
                    <TableCell sx={cellStyle}>{org.legalname}</TableCell>
                    <TableCell sx={cellStyle}>{org.email}</TableCell>
                    <TableCell sx={cellStyle}>{org.mobile}</TableCell>
                    <TableCell sx={cellStyle}>{org.address}</TableCell>
                    <TableCell sx={cellStyle}>{org.pin_code}</TableCell>
                    <TableCell sx={cellStyle}>{org.pan_number}</TableCell>
                    <TableCell sx={cellStyle} align="center">
                      {/* <IconButton size="small" onClick={() => handleEdit(org.id)}>
                        <EditIcon fontSize="small" color="primary" />
                      </IconButton> */}
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleNavigate(`/organisation/update/${org.id}`)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleOpenDialog(org.id)}>
                        <DeleteIcon fontSize="small" color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {paginatedData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ padding: "10px" }}>
                      No data found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {filtered.length > rowsPerPage && (
            <Box display="flex" justifyContent="center" p={2}>
              <Pagination
                count={Math.ceil(filtered.length / rowsPerPage)}
                page={page}
                onChange={(_, value) => setPage(value)}
                color="primary"
              />
            </Box>
          )}
        </Paper>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this organisation? This action cannot be undone.
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

export default OrganisationList;
