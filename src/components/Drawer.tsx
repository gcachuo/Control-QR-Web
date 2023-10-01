import {
  Backdrop,
  Box,
  ClickAwayListener,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  AdminPanelSettings,
  Dashboard,
  Logout,
  Menu,
  Person,
} from "@mui/icons-material";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function DrawerComponent(props: { title: string }) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { logout, user } = useAuth();
  const isLoggedIn = !!user;

  const modules = [
    { url: "/", title: "Inicio", icon: <Dashboard color={"primary"} /> },
    {
      url: "/access-log",
      title: "Autorizaciones",
      icon: <AdminPanelSettings color={"primary"} />,
    },
    {
      url: "/users",
      title: "Usuarios",
      icon: <Person color={"primary"} />,
    },
  ];

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };
  const closeDrawer = () => {
    setOpenDrawer(false);
  };

  const DrawerList = (
    <Box>
      <Box
        sx={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "60px",
        }}
      >
        <h4 style={{ paddingLeft: 16, margin: 0 }}>Demo</h4>
      </Box>
      <Divider />
      <List
        sx={{
          width: { xs: "55vw", sm: "225px" },
        }}
      >
        {modules.map((item) => (
          <ListItem
            key={item.url}
            component={RouterLink}
            to={item.url}
            style={{ color: "white" }}
          >
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem style={{ color: "white" }} onClick={logout}>
          <ListItemButton>
            <ListItemIcon>
              <Logout color={"primary"} />
            </ListItemIcon>
            <ListItemText primary={"Cerrar Sesión"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const Header = () => (
    <Box sx={{ backgroundColor: "white" }}>
      <Grid container>
        <Grid
          item
          sm={1}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          <Box sx={{ paddingTop: "10px", paddingLeft: "10px" }}>
            <IconButton onClick={toggleDrawer}>
              <Menu />
            </IconButton>
          </Box>
        </Grid>
        <Grid sm item>
          <h4 style={{ paddingLeft: 16 }}>{props.title}</h4>
        </Grid>
      </Grid>
      <Divider />
    </Box>
  );

  return isLoggedIn ? (
    <div>
      <ClickAwayListener onClickAway={closeDrawer}>
        <Box>
          <Header />
          <Box>
            <Drawer
              open={openDrawer}
              variant={"persistent"}
              anchor={"left"}
              sx={{
                display: { md: "none", sm: "block" },
              }}
              PaperProps={{
                sx: {
                  backgroundColor: "#2e3e4e",
                },
              }}
            >
              {DrawerList}
            </Drawer>
            <Drawer
              open={openDrawer}
              variant={"permanent"}
              anchor={"left"}
              sx={{
                display: { md: "block", sm: "none", xs: "none" },
              }}
              PaperProps={{
                sx: {
                  backgroundColor: "#2e3e4e",
                },
              }}
            >
              {DrawerList}
            </Drawer>
            <Backdrop open={openDrawer} onClick={closeDrawer} />
          </Box>
        </Box>
      </ClickAwayListener>
    </div>
  ) : (
    <></>
  );
}

export default DrawerComponent;
