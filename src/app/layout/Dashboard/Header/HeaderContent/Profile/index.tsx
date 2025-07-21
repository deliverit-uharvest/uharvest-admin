import PropTypes from "prop-types";
import { useRef, useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import ButtonBase from "@mui/material/ButtonBase";
import CardContent from "@mui/material/CardContent";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// project imports
import ProfileTab from "./ProfileTab";
import SettingTab from "./SettingTab";
import MainCard from "../../../../../shared/common/MainCard";
import Transitions from "../../../../../shared/common/@extended/Transitions";
import IconButton from "../../../../../shared/common/@extended/IconButton";

// assets
import LogoutOutlined from "@ant-design/icons/LogoutOutlined";
import SettingOutlined from "@ant-design/icons/SettingOutlined";
import UserOutlined from "@ant-design/icons/UserOutlined";
// import avatar1 from "../../../../../../assets/images/users/profile_vector.png";
import avatarimage from "../../../../../../assets/images/users/profile_vector.png";
import { useStore } from "../../../../../stores/store";
import { observer } from "mobx-react-lite";
import { Navigate, useNavigate } from "react-router-dom";

// tab panel wrapper
function TabPanel({ children, value, index, ...other }: any) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `profile-tab-${index}`,
    "aria-controls": `profile-tabpanel-${index}`,
  };
}

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { userStore } = useStore();
  const { user } = userStore;
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  if (!user) return <Navigate to="/login" replace />;

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: any) => {
    //@ts-ignore
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };


  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const handleLogout = () => {
    userStore.logout(); // only clears state + token
    navigate("/login"); // handle side effect separately
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 0.85 }}>
      <ButtonBase
        sx={(theme) => ({
          p: 0.25,
          bgcolor: open ? "grey.100" : "transparent",
          borderRadius: 1,
          "&:hover": { bgcolor: "secondary.lighter" },
          "&:focus-visible": {
            outline: `2px solid ${theme.palette.secondary.dark}`,
            outlineOffset: 2,
          },
          ...theme.applyStyles("dark", {
            bgcolor: open ? "background.default" : "transparent",
            "&:hover": { bgcolor: "secondary.light" },
          }),
        })}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? "profile-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Stack direction="row" sx={{ gap: 1.25, alignItems: "center", p: 0.5 }}>
          <Typography variant="subtitle1" sx={{ textTransform: "capitalize" }}>
            {user.name || "Default"}
          </Typography>
          <Box
            component="img"
            src={avatarimage}
            alt="Custom"
            sx={{ width: 10, height: 5, borderRadius: "50%" }} // Adjust size/style if needed
          />
        </Stack>
      </ButtonBase>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 9],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          //@ts-ignore
          <Transitions
            type="grow"
            position="top-right"
            in={open}
            {...TransitionProps}
          >
            {/* @ts-ignore */}
            <Paper
              sx={(theme) => ({
                boxShadow: theme.shadows[1], // or [3], [4] depending on elevation

                width: 290,
                minWidth: 240,
                maxWidth: { xs: 250, md: 290 },
              })}
            >
              <ClickAwayListener onClickAway={handleClose}>
                {/* @ts-ignore */}
                <MainCard elevation={0} border={false} content={false}>
                  <CardContent sx={{ px: 2.5, pt: 3 }}>
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid>
                        <Stack
                          direction="row"
                          sx={{ gap: 1.25, alignItems: "center" }}
                        >
                          {/* @ts-ignore */}
                          {/* <Avatar
                            alt="profile user"
                            // src={avatar1}
                            sx={{ width: 32, height: 32 }}
                          /> */}
                          <Stack>
                            <Typography variant="h6">
                              {user.name ? user.name : "Default"}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              UI/UX Designer
                            </Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                      <Grid>
                        <Tooltip title="Logout">
                          <IconButton
                            size="large"
                            sx={{ color: "text.primary" }}
                            onClick={handleLogout}
                          >
                            <LogoutOutlined />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </CardContent>

                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                      variant="fullWidth"
                      value={value}
                      onChange={handleChange}
                      aria-label="profile tabs"
                    >
                      <Tab
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          textTransform: "capitalize",
                          gap: 1.25,
                          "& .MuiTab-icon": {
                            marginBottom: 0,
                          },
                        }}
                        icon={<UserOutlined />}
                        label="Profile"
                        {...a11yProps(0)}
                      />
                      <Tab
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          textTransform: "capitalize",
                          gap: 1.25,
                          "& .MuiTab-icon": {
                            marginBottom: 0,
                          },
                        }}
                        icon={<SettingOutlined />}
                        label="Setting"
                        {...a11yProps(1)}
                      />
                    </Tabs>
                  </Box>
                  <TabPanel value={value} index={0} dir={theme.direction}>
                    <ProfileTab />
                  </TabPanel>
                  <TabPanel value={value} index={1} dir={theme.direction}>
                    <SettingTab />
                  </TabPanel>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number,
  index: PropTypes.number,
  other: PropTypes.any,
};

export default observer(Profile);
