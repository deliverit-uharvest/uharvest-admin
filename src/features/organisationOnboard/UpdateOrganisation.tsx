import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Paper,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Organisation, updateOrganisation } from "../../app/services/OrganisationService";
import agent from "../../app/api/agent"; // agent.Organisation.get for single org

const UpdateOrganisation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [organisation, setOrganisation] = useState<Organisation | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState<any>({
    name: "",
    legalname: "",
    email: "",
    mobile: "",
    pan_number: "",
    address: "",
    pin_code: "",
  });

  useEffect(() => {
    const fetchOrganisation = async () => {
      try {
        const res = await agent.Organisation.get({ params: { id } });
        const org = res.data.find((o: Organisation) => o.id === Number(id));
        if (!org) throw new Error("Organisation not found");
        setOrganisation(org);
        setFormData({
          name: org.name,
          legalname: org.legalname,
          email: org.email,
          mobile: org.mobile,
          pan_number: org.pan_number,
          address: org.address,
          pin_code: org.pin_code,
        });
      } catch (err) {
        toast.error("Failed to load organisation");
      } finally {
        setLoading(false);
      }
    };
    fetchOrganisation();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const dataToSend = {
        ...formData,
        id: Number(id),
      };
      const form = new FormData();
      Object.entries(dataToSend).forEach(([key, value]) => {
        form.append(key, value as string);
      });
      await updateOrganisation(form);
      toast.success("Organisation updated successfully");
      navigate("/organisation"); // or wherever you go back
    } catch (err) {
      toast.error("Failed to update organisation");
    }
  };

  if (loading) return <CircularProgress sx={{ m: 2 }} />;

  return (
    <Box p={3} maxWidth={600} mx="auto" component={Paper}>
      <Typography variant="h6" mb={2}>
        Edit Organisation
      </Typography>
      {Object.entries(formData).map(([field, value]) => (
        <TextField
          key={field}
          label={field.replace("_", " ").toUpperCase()}
          name={field}
          value={value}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      ))}
      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{ mt: 2, backgroundColor: "#fcb500", color: "#000", "&:hover": { backgroundColor: "#e0a800" } }}
      >
        Update
      </Button>
    </Box>
  );
};

export default UpdateOrganisation;
