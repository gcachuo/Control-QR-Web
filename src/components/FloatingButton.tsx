import { Add } from "@mui/icons-material";
import React from "react";
import { Fab } from "@mui/material";

function FloatingButtonComponent(props: {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) {
  return (
    <Fab
      size="medium"
      color="secondary"
      aria-label="add"
      style={{ position: "absolute", bottom: 20, right: 20 }}
      onClick={props.onClick}
    >
      <Add />
    </Fab>
  );
}

export default FloatingButtonComponent;
