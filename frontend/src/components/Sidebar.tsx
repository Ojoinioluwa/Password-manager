import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LockIcon from "@mui/icons-material/Lock";
import GroupIcon from "@mui/icons-material/Group";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { IoLogoPlaystation } from "react-icons/io";
import { Typography } from "@mui/material";

interface SidebarItem {
  name: string;
  link: string;
  icon: React.ReactNode;
}

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const [focusedItem, setFocusedItem] = React.useState<string>("groups");
  const navigate = useNavigate();

  const toggleDrawer = (openState: boolean) => () => {
    setOpen(openState);
  };

  const handleNavigation = (link: string) => {
    setFocusedItem(link);
    navigate(`/dashboard/${link}`);
    setOpen(false); // close drawer after navigation
  };

  const sidebarItems: SidebarItem[] = [
    { name: "Groups", link: "groups", icon: <GroupIcon /> },
    { name: "Vault", link: "vault", icon: <LockIcon /> },
    { name: "Authorized", link: "authorized", icon: <VerifiedUserIcon /> },
    {
      name: "Authorized Passwords",
      link: "authorizedPasswords",
      icon: <AssessmentIcon />,
    },
    {
      name: "Generate & Test Passwords",
      link: "test",
      icon: <AutoAwesomeIcon />,
    },
  ];

  return (
    <>
      <Button
        aria-label="open drawer"
        onClick={toggleDrawer(true)}
        sx={{ fontSize: 32, minWidth: 0, padding: 1 }}
      >
        <FaBars />
      </Button>

      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 260,
            padding: 2,
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
          role="presentation"
        >
          <IoLogoPlaystation
            style={{ fontSize: 28, color: "#172554", marginRight: 12 }}
            aria-hidden="true"
          />
          <Typography
            variant="h6"
            component="h1"
            sx={{ color: "#172554", fontWeight: "bold" }}
          >
            Vaulter
          </Typography>
        </Box>

        <List>
          {sidebarItems.map(({ name, link, icon }) => (
            <ListItem key={link} disablePadding>
              <ListItemButton
                selected={focusedItem === link}
                onClick={() => handleNavigation(link)}
                sx={{
                  "&.Mui-selected": {
                    bgcolor: "primary.light",
                    color: "primary.main",
                    "& svg": { color: "primary.main" },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: focusedItem === link ? "primary.main" : "inherit",
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
