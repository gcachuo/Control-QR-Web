import {
  Box,
  ClickAwayListener,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
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

  return (
    <ClickAwayListener onClickAway={closeDrawer}>
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <Box>
          <IconButton onClick={toggleDrawer}>
            <Menu />
          </IconButton>
        </Box>
        <Box>
          <Drawer open={openDrawer} variant="persistent">
            <List>
              <ListItem button component={RouterLink} to={"/"}>
                <ListItemText primary="Inicio" />
              </ListItem>
              <ListItem button component={RouterLink} to={"/users"}>
                <ListItemText primary="Usuarios" />
              </ListItem>
            </List>
          </Drawer>
        </Box>
      </Box>
    </ClickAwayListener>
  );
}

export default DrawerComponent;
