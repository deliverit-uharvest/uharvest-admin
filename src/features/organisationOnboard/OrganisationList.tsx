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
} from "../../app/services/OrganisationService";

const OrganisationList = () => {
  const navigate = useNavigate();

  const [organisations, setOrganisations] = useState<Organisation[]>([]);
  const [filtered, setFiltered] = useState<Organisation[]>([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(1);
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
    setPage(1); // reset to page 1 on search
  };

  const handleEdit = (id: number) => {
    console.log("Edit", id);
    // navigate(`/organisation/edit/${id}`) // if you want
  };

  const handleDelete = (id: number) => {
    console.log("Delete", id);
    // implement delete api later
  };

  const paginatedData = filtered.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

   const headerCellStyle = { padding: "8px 14px", fontSize: 14, fontWeight: 600 }; // Table style variable
   const cellStyle = { padding: "8px 14px", fontSize: 14 };


  return (
    <Box p={2}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
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

      {/* Search */}
      <Box mb={2}>
        <TextField
          label="Search"
          value={searchText}
          onChange={handleSearch}
          variant="outlined"
          fullWidth
        />
      </Box>

      {/* Table */}

     


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
                    <TableCell sx={ cellStyle}>
                      {org.name}
                    </TableCell>
                    <TableCell sx={ cellStyle}>
                      {org.legalname}
                    </TableCell>
                    <TableCell sx={ cellStyle}>
                      {org.email}
                    </TableCell>
                    <TableCell sx={ cellStyle}>
                      {org.mobile}
                    </TableCell>
                    <TableCell sx={ cellStyle}>
                      {org.address}
                    </TableCell>
                    <TableCell sx={ cellStyle}>
                      {org.pin_code}
                    </TableCell>
                    <TableCell sx={ cellStyle}>
                      {org.pan_number}
                    </TableCell>
                    <TableCell sx={ cellStyle} align="center">
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(org.id)}
                      >
                        <EditIcon fontSize="small" color="primary" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(org.id)}
                      >
                        <DeleteIcon fontSize="small" color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {paginatedData.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      align="center"
                      sx={{ padding: "10px" }}
                    >
                      No data found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
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
    </Box>
  );
};

export default OrganisationList;
