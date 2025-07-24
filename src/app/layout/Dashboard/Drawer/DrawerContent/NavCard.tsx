import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../../../stores/store" // adjust this path if needed

const LogoutButton = () => {
  const navigate = useNavigate();
  const { userStore } = useStore();

  const handleLogout = () => {
    userStore.logout(); // Clear user state/token
    navigate("/login"); // Redirect to login
  };

  return (
    <Button
  variant="contained"
  onClick={handleLogout}
  sx={{
    width: "250px",           
    height: "40px",            
    backgroundColor: "#FFD700", 
    color: "#000",             
    fontSize: "14px",          
    textTransform: "uppercase", 
    fontWeight: "bold",
    borderRadius: "20px",    
    padding: "10px 20px",
    marginLeft:"5px",
    marginBottom:"10px",
    boxShadow: 2,
    '&:hover': {
      backgroundColor: "#FFC107", 
    },
  }}
>
  Logout
</Button>

  );
};

export default LogoutButton;
