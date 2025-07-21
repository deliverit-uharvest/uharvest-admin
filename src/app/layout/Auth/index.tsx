import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Paper,
  Link,
  InputAdornment,
  IconButton,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { handleLogin } from "../../services/AuthServices";
import image from "../../../../src/assets/images/users/image.jpg";
import loginImage2 from "../../../../src/assets/images/users/loginImage2.png";

import { useNavigate } from "react-router-dom";
import { useStore } from "../../stores/store";
import { observer, Observer } from "mobx-react-lite";
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const AuthLayout: React.FC = () => {
  const theme = useTheme();
  const { userStore } = useStore();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  console.log("userss", userStore.isLoggedIn);


  useEffect(() => {
    if (!userStore.loading && userStore.isLoggedIn) {
      navigate("/dashboard");
    }
  }, [userStore.loading, userStore.isLoggedIn]);

  
  if (userStore.loading) return <CircularProgress />;
  
  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      height="100vh"
      sx={{ overflow: "hidden" }}
    >
      {/* Left Image Section */}
      {!isSmallScreen && (
        <Box
          sx={{
            width: "416.23px",
            height: "100vh",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <img
            src={image}
            alt="Login visual"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>
      )}

      {/* Right Login Section */}
      <Box
        flex={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        bgcolor="#ffffff"
        p={2}
        sx={{
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* Logo */}
        <Box display="flex" justifyContent="center" mb={2}>
          <img
            src={loginImage2}
            alt="Logo"
            style={{ width: "139px", height: "120px" }}
          />
        </Box>

        {/* Title */}
        <Typography
          variant="h5"
          component="h1"
          gutterBottom
          sx={{
            fontFamily: "Source Sans 3, sans-serif",
            fontWeight: 600,
            fontSize: "24px",
            lineHeight: 1.3,
            letterSpacing: "0.15px",
            color: "#016931",
            textAlign: "center",
            mb: 1,
          }}
        >
          Login
        </Typography>

        {/* Login Form */}
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            color: "#050606",
            maxWidth: "400px",
            padding: { xs: 0, sm: 0 },
            borderRadius: "8px",
          }}
        >
          <Formik
            initialValues={{ email: "", password: "", rememberMe: false }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await handleLogin(
                  { email: values.email, password: values.password },
                  () => navigate("/dashboard")
                );
              } catch (err) {
                // Errors already handled in service
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              touched,
              errors,
              isSubmitting,
            }) => (
              <Form
                style={{ display: "flex", flexDirection: "column", gap: 3 }}
              >
                {/* Email Field */}
                <Box>
                  <Typography
                    sx={{ color: "#016931", fontSize: "14px", mb: "3px" }}
                  >
                    Email ID:{" "}
                    <span style={{ color: "#333333", fontWeight: "500" }}>
                      *
                    </span>
                  </Typography>
                  <TextField
                    name="email"
                    placeholder="Enter email address"
                    fullWidth
                    size="small"
                    variant="outlined"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Box>

                {/* Password Field */}
                <Box>
                  <Typography
                    sx={{
                      color: "#016931",
                      fontSize: "14px",
                      mb: "2px",
                      mt: "4px",
                    }}
                  >
                    Password:{" "}
                    <span style={{ color: "#333333", fontWeight: "500" }}>
                      *
                    </span>
                  </Typography>
                  <TextField
                    name="password"
                    placeholder="Enter password"
                    fullWidth
                    size="small"
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleTogglePassword} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                {/* Remember Me + Forgot Password */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="rememberMe"
                        checked={values.rememberMe}
                        onChange={handleChange}
                        sx={{
                          color: "#016931",
                          "&.Mui-checked": {
                            color: "#016931",
                          },
                        }}
                      />
                    }
                    label={
                      <Typography sx={{ fontSize: "14px", color: "#016931" }}>
                        Remember me
                      </Typography>
                    }
                  />
                  <Link
                    href="#"
                    underline="none"
                    sx={{
                      color: "#016931",
                      fontSize: "14px",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Forgot Password
                  </Link>
                </Box>

                
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    width: "100%",
                    height: "40px",
                    padding: "10px 40px",
                    borderRadius: "4px",
                    backgroundColor: "#016931",
                    color: "#ffffff",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#015627",
                    },
                  }}
                >
                  {isSubmitting ? "Please wait..." : "Login"}
                </Button>
              </Form>
            )}
          </Formik>
        </Paper>
      </Box>
    </Box>
  );
};

export default observer(AuthLayout);
