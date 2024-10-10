// @ts-ignore
import React from "react";
import { Drawer, IconButton } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import SignInSide from "../LoginPage/SignInSide";
import { useDrawer } from "../Context/DrawerContext";

const SignInDrawer: React.FC = () => {
  const { openLoginDrawer, setOpenLoginDrawer } = useDrawer();

  const handleClose = () => {
    setOpenLoginDrawer(false);
  };

  return (
    <Drawer
      anchor="right"
      open={openLoginDrawer}
      onClose={handleClose}
      PaperProps={{
        sx: { width: 360 },
      }}
    >
      <IconButton
        onClick={handleClose}
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
        }}
      >
        <CloseIcon />
      </IconButton>
      <SignInSide />
    </Drawer>
  );
};

export default SignInDrawer;
