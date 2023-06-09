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
  ListItemText,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

function DrawerComponent(props: { title: string }) {
  const [openDrawer, setOpenDrawer] = useState(false);

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
          width: { xs: "55vw", sm: "200px" },
        }}
      >
        <ListItem component={RouterLink} to={"/"} style={{ color: "white" }}>
          <ListItemText primary="Inicio" />
        </ListItem>
        <ListItem
          component={RouterLink}
          to={"/users"}
          style={{ color: "white" }}
        >
          <ListItemText primary="Usuarios" />
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

  return (
    <div style={{ marginLeft: -30 }}>
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
  );
}

export default DrawerComponent;
