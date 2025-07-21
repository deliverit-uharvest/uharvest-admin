import PropTypes from "prop-types";
import { useState } from "react";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import NavItem from "./NavItem";

export default function NavCollapse({ menu, level }: any) {
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(!open);

  return (
    <>
      <ListItemButton
        onClick={handleClick}
        sx={(theme) => ({
          pl: level * 2,
          py: 1.25,
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            bgcolor: "rgba(64, 106, 70, 0.71)", // 👈 hover color
          },
          "&.Mui-selected": {
            bgcolor: "rgba(231, 227, 227, 0.08)",
            borderRight: "2px solid",
            borderColor: "primary.main",
            "&:hover": {
              bgcolor: "rgba(64, 106, 70, 0.71)",
            },
          },
        })}
      >
        {menu.icon && (
          <ListItemIcon
            sx={{
              color: "#ffffff",
              minWidth: 36,
            }}
          >
            {menu.icon}
          </ListItemIcon>
        )}
        <ListItemText
          primary={menu.title}
          primaryTypographyProps={{
            sx: {
              color: "#ffffff",
              fontWeight: 100, 
              fontSize: "0.90rem", 
            },
          }}
        />

        {open ? (
          <ExpandLess sx={{ color: "#ffffff" }} />
        ) : (
          <ExpandMore sx={{ color: "#ffffff" }} />
        )}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {menu.children?.map((child: any) =>
            child.type === "item" ? (
              <NavItem key={child.id} item={child} level={level + 1} />
            ) : null
          )}
        </List>
      </Collapse>
    </>
  );
}

NavCollapse.propTypes = {
  menu: PropTypes.object,
  level: PropTypes.number,
};
