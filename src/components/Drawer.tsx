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

function DrawerComponent() {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };
  const closeDrawer = () => {
    setOpenDrawer(false);
  };

  const DrawerList = (
    <Box>
      <h4 style={{ paddingLeft: 16 }}>Demo</h4>
      <Divider />
      <List sx={{ width: { xs: "55vw", sm: "200px" } }}>
        <ListItem component={RouterLink} to={"/"}>
          <ListItemText primary="Inicio" />
        </ListItem>
        <ListItem component={RouterLink} to={"/users"}>
          <ListItemText primary="Usuarios" />
        </ListItem>
      </List>
    </Box>
  );

  const Header = () => (
    <Box>
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
          <h4 style={{ paddingLeft: 16 }}>Demo</h4>
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
            >
              {DrawerList}
            </Drawer>
            <Drawer
              open={openDrawer}
              variant={"permanent"}
              anchor={"left"}
              sx={{
                display: { md: "block", sm: "none" },
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
