import React, { useState } from 'react';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Radio,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { observer } from 'mobx-react-lite';

// Static placeholder icons
import storeIcon from '../../../../../assets/images/users/Vector.png';
import adminIcon from '../../../../../assets/images/users/Vector_admin.png';

// ⛳ Will replace this later with API-based data
const locations = [
  { label: 'Admin', value: 'admin', icon: adminIcon },
  { label: 'Haldiram Sec 62', value: 'Sec-62', icon: storeIcon },
  { label: 'Haldiram Sec 45', value: 'Sec-45', icon: storeIcon },
  { label: 'Haldiram Rajiv Chowk', value: 'Rajiv Chowk', icon: storeIcon },
];

const LocationDropdown: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // ✅ By default selected: Admin
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (value: string) => {
    const location = locations.find((l) => l.value === value);
    if (location) {
      setSelectedLocation(location);
    }
    handleClose();
  };

  return (
    <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }}>
      <Box sx={{ width: { xs: '100%', md: 224 } }}>
        <Button
          onClick={handleClick}
          sx={{
            bgcolor: '#f4f6f8',
            color: '#1e3a34',
            borderRadius: '30px',
            textTransform: 'none',
            px: 1.5,
            py: 0.5,
            width: '100%',
            justifyContent: 'space-between',
            border: 'none',
            boxShadow: 'none',
            fontFamily: 'Source Sans 3, sans-serif',
            '&:hover': {
              backgroundColor: '#e9ebed',
              border: 'none',
            },
          }}
          endIcon={<ArrowDropDownIcon />}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <img src={selectedLocation.icon} alt="" width={18} />
            <Typography
              variant="body2"
              noWrap
              sx={{
                fontFamily: 'Source Sans 3, sans-serif',
                fontWeight: 500,
                fontSize: '14px',
                color: '#1e3a34',
              }}
            >
              {selectedLocation.label}
            </Typography>
          </Box>
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            sx: {
              width: isSmallScreen ? '90vw' : 276,
              maxWidth: '100%',
              borderRadius: 2,
              mt: 1,
              fontFamily: 'Source Sans 3, sans-serif',
            },
          }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              px: 2,
              pt: 1,
              pb: 0.5,
              fontFamily: 'Source Sans 3, sans-serif',
              fontSize: '13px',
              fontWeight: 600,
              color: '#4e4e4e',
            }}
          >
            Switch View
          </Typography>

          {locations.map((item) => (
            <MenuItem
              key={item.value}
              onClick={() => handleSelect(item.value)}
              sx={{
                fontFamily: 'Source Sans 3, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                color: '#1e3a34',
              }}
            >
              <ListItemIcon>
                <img src={item.icon} alt="" width={20} />
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  sx: {
                    fontFamily: 'Source Sans 3, sans-serif',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#1e3a34',
                  },
                }}
              />
              <Radio
                checked={selectedLocation.value === item.value}
                sx={{
                  padding: 0,
                  color: '#016931',
                  '&.Mui-checked': {
                    color: '#016931',
                  },
                }}
              />
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Box>
  );
};

export default observer(LocationDropdown);
