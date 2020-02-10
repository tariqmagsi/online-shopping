import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ModalProduct from "./Modal";
import { SvgIcon } from "@material-ui/core";

import { zoomIn } from "react-animations";
import Radium, { StyleRoot } from "radium";

export default function ScrollDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const handleClickOpen = scrollType => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const styles = {
    fadeIn: {
      animation: "x 1s",
      animationName: Radium.keyframes(zoomIn, "fadeIn")
    }
  };

  return (
    <React.Fragment>
      <SvgIcon onClick={handleClickOpen("paper")} className="cart-table">
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
      </SvgIcon>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
      >
        <StyleRoot style={styles.fadeIn}>
          <DialogTitle id="scroll-dialog-title">Order Detail</DialogTitle>
          <DialogContent dividers={scroll === "paper"}>
            <ModalProduct id={props.id} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </StyleRoot>
      </Dialog>
    </React.Fragment>
  );
}
