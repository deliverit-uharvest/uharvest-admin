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
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import TableSkeleton from "../loader/TableSkeleton";
import { fetchOutletUser } from "../../app/services/OutletUserService";
import { deleteOutletUser } from "../../app/services/OutletService";

const OutletUserList = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  // const handleOpenDialog = (id: number) => {
  //   setSelectedUserId(id);
  //   setOpenDialog(true);
  // };

  // const handleCloseDialog = () => {
  //   setOpenDialog(false);
  //   setSelectedUserId(null);
  // };

  // const handleConfirmDelete = async () => {
  //   if (!selectedUserId) return;

  //   try {
  //     await deleteOutletUser(selectedUserId);
  //     setUsers((prev) => prev.filter((user) => user.id !== selectedUserId));
  //     setFilteredUsers((prev) => prev.filter((user) => user.id !== selectedUserId));
  //     toast.success("User deleted successfully.");
  //   } catch (err) {
  //     toast.error("Something went wrong while deleting.");
  //   } finally {
  //     handleCloseDialog();
  //   }
  // };

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await fetchOutletUser({});
      if (res.status === "success") {
        setUsers(res.data);
        setFilteredUsers(filterRows(res.data, searchText));
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  const filterRows = (rows: any[], query: string) => {
    if (!query) return rows;
    const lowercasedQuery = query.toLowerCase();
    return rows.filter((row) =>
      [row.user?.name, row.user?.email, row.outlet?.name].some((value) =>
        value?.toLowerCase().includes(lowercasedQuery)
      )
    );
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <Box px={1.5} py={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight={700} fontSize="18px">
          Outlet Users
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ backgroundColor: "#fcb500", color: "#000", fontWeight: 600 }}
          onClick={() => navigate("/organisation/outlet/user/add")}
        >
          Add Outlet User
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
            setFilteredUsers(filterRows(users, value));
          }}
          sx={{ minWidth: 300 }}
        />
      </Box>

      <TableContainer component={Paper}>
        {loading ? (
          <TableSkeleton rows={6} columns={4} />
        ) : filteredUsers.length > 0 ? (
          <Table size="small" sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f9f9f9" }}>
                <TableCell sx={{ fontSize: "14px", fontWeight: 700 }}>Name</TableCell>
                <TableCell sx={{ fontSize: "14px", fontWeight: 700 }}>Email</TableCell>
                <TableCell sx={{ fontSize: "14px", fontWeight: 700 }}>Outlet Name</TableCell>
                <TableCell sx={{ fontSize: "14px", fontWeight: 700 }} align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell sx={{ fontSize: "14px" }}>{row.user?.name || "—"}</TableCell>
                  <TableCell sx={{ fontSize: "14px" }}>{row.user?.email || "—"}</TableCell>
                  <TableCell sx={{ fontSize: "14px" }}>{row.outlet?.name || "—"}</TableCell>
                  <TableCell align="center">
                    <IconButton size="small" color="primary" onClick={() => console.log("Edit", row.id)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    {/* <IconButton size="small" color="error" onClick={() => handleOpenDialog(row.id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography p={2}>No data found</Typography>
        )}
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      {/* <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog> */}
    </Box>
  );
};

export default OutletUserList;
