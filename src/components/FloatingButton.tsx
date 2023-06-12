import { Add } from "@mui/icons-material";
import React from "react";
import { Fab } from "@mui/material";

function FloatingButtonComponent() {
  return (
    <Fab
      size="medium"
      color="secondary"
      aria-label="add"
      style={{ position: "absolute", bottom: 20, right: 20 }}
    >
      <Add />
    </Fab>
  );
}

export default FloatingButtonComponent;
