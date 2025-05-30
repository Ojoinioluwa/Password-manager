import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LockIcon from '@mui/icons-material/Lock';
import GroupIcon from '@mui/icons-material/Group';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { IoLogoPlaystation } from 'react-icons/io';
import { Typography } from '@mui/material';

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const [focused, setFocused] = React.useState("groups");

  const handleChange = (value: string) => {
    setFocused(value);
    navigate(`/dashboard/${value}`);
  };

  const sideBar = [
    { name: "groups", link: "groups",icon: <GroupIcon /> },
    { name: "vault", link: "vault", icon: <LockIcon /> },
    { name: "authorized", link: "authorized", icon: <VerifiedUserIcon /> },
    { name: "Authorized passwords", link: "authorizedPasswords", icon: <AssessmentIcon /> },
    { name: "Generate & Test Passwords", link: "test", icon: <AutoAwesomeIcon /> },
  ];

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {sideBar.map((value) => (
          <ListItem key={value.name} disablePadding>
            <ListItemButton onClick={() => handleChange(value.link)}>
              <ListItemIcon>{value.icon}</ListItemIcon>
              <ListItemText primary={value.name.charAt(0).toUpperCase() + value.name.slice(1)} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)} sx={{ fontSize: 50 }}>
        <FaBars />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ padding: 2, display: 'flex', alignItems: 'center' }}>
          <IoLogoPlaystation
            style={{ fontSize: "28px", color: "#172554", marginRight: "10px" }}
          />
          <Typography variant="h6" component="h1" sx={{ color: "#172554", fontSize: "30px" }}>
            Vaulter
          </Typography>
        </Box>
        {DrawerList}
      </Drawer>
    </div>
  );
}
