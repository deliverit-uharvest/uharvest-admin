import PropTypes from "prop-types";
import { Link, useLocation, matchPath } from "react-router-dom";

// material-ui
import useMediaQuery from "@mui/material/useMediaQuery";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// project imports
import IconButton from "../../../../../shared/common/@extended/IconButton";
import { handlerDrawerOpen, useGetMenuMaster } from "../../../../../api/menu";

// ==============================|| NAVIGATION - LIST ITEM ||============================== //

interface NavItemProps {
  item: any;
  level: number;
  isParents?: boolean;
  setSelectedID?: (id: string) => void;
}

export default function NavItem({
  item,
  level,
  isParents = false,
  setSelectedID,
}: NavItemProps) {
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster?.isDashboardDrawerOpened;
  const downLG = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  const { pathname } = useLocation();

  const itemTarget = item.target ? "_blank" : "_self";

  const isSelected = !!matchPath(
    { path: item?.link ? item.link : item.url, end: false },
    pathname
  );

  const itemHandler = () => {
    if (downLG) handlerDrawerOpen(false);
    if (isParents && setSelectedID) setSelectedID(item.id);
  };

  const Icon = item.icon;
  const itemIcon = Icon ? (
    <Icon
      style={{
        fontSize: drawerOpen ? "1rem" : "1.25rem",
        ...(isParents && { fontSize: 20, stroke: "1.5" }),
      }}
    />
  ) : null;

  const textColor = "#ffffff";
  const iconSelectedColor = "#ffffff";

  return (
    <Box sx={{ position: "relative" }}>
      <ListItemButton
        component={Link}
        to={item.url}
        target={itemTarget}
        disabled={item.disabled}
        selected={isSelected}
        onClick={itemHandler}
        sx={(theme) => ({
          zIndex: 1201,
          pl: drawerOpen ? `${level * 28}px` : 1.5,
          py: !drawerOpen && level === 1 ? 1.25 : 1,
          transition: "all 0.2s ease-in-out",

          // ✅ Hover style applied in all cases
          "&:hover": {
            bgcolor: "rgba(64, 106, 70, 0.71)", // Custom hover color
          },

          // ✅ Selected styles
          "&.Mui-selected": {
            bgcolor: "rgba(231, 227, 227, 0.08)",
            borderRight: "2px solid",
            borderColor: "primary.main",
            color: iconSelectedColor,
            "&:hover": {
              bgcolor: "rgba(64, 106, 70, 0.71)",
              color: iconSelectedColor,
            },
          },
        })}
      >
        {itemIcon && (
          <ListItemIcon
            sx={(theme) => ({
              minWidth: 3,
              color: isSelected ? iconSelectedColor : textColor,
              ...(!drawerOpen && {
                borderRadius: 1.5,
                width: 36,
                height: 36,
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
              }),
              ...(!drawerOpen &&
                isSelected && {
                  bgcolor: "primary.lighter",
                  ...theme.applyStyles?.("dark", {
                    bgcolor: "primary.900",
                  }),
                  "&:hover": {
                    bgcolor: "primary.lighter",
                    ...theme.applyStyles?.("dark", {
                      bgcolor: "primary.darker",
                    }),
                  },
                }),
            })}
          >
            {itemIcon}
          </ListItemIcon>
        )}

        {(drawerOpen || (!drawerOpen && level !== 1)) && (
          <ListItemText
            primary={
              <Typography sx={{ color: "#d6c937ff", fontWeight: 200,fontSize:"1.0rem" }}>
                {item.title}
              </Typography>
            }
          />
        )}

        {(drawerOpen || (!drawerOpen && level !== 1)) && item.chip && (
          <Chip
            color={item.chip.color}
            variant={item.chip.variant}
            size={item.chip.size}
            label={item.chip.label}
            avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
          />
        )}
      </ListItemButton>

      {(drawerOpen || (!drawerOpen && level !== 1)) &&
        item?.actions?.map((action: any, index: number) => {
          const ActionIcon = action.icon;
          const callAction = action?.function;
          return (
            <IconButton
              key={index}
              {...(action.type === "function" && {
                onClick: (event: any) => {
                  event.stopPropagation();
                  callAction();
                },
              })}
              {...(action.type === "link" && {
                component: Link,
                to: action.url,
                target: action.target ? "_blank" : "_self",
              })}
              color="secondary"
              variant="outlined"
              sx={{
                position: "absolute",
                top: 12,
                right: 20,
                zIndex: 1202,
                width: 20,
                height: 20,
                mr: -1,
                ml: 1,
                color: "secondary.dark",
                borderColor: isSelected ? "primary.light" : "secondary.light",
                "&:hover": {
                  borderColor: isSelected
                    ? "primary.main"
                    : "secondary.main",
                },
              }}
            >
              <ActionIcon style={{ fontSize: "0.625rem" }} />
            </IconButton>
          );
        })}
    </Box>
  );
}

NavItem.propTypes = {
  item: PropTypes.any,
  level: PropTypes.number,
  isParents: PropTypes.bool,
  setSelectedID: PropTypes.oneOfType([PropTypes.any, PropTypes.func]),
};
