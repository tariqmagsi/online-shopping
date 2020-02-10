import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ModalProduct from "../ModalProduct/ModalProduct";
import { Fab, SvgIcon } from "@material-ui/core";
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
    <div>
      <Fab
        onClick={handleClickOpen("paper")}
        color="primary"
        aria-label="add"
        style={{ height: "40px", width: "40px", fontSize: "2px" }}
        className="myclass-button"
        title="Quick View"
      >
        <StyleRoot style={styles.fadeIn}>
          <SvgIcon>
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
          </SvgIcon>
        </StyleRoot>
      </Fab>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
      >
        <StyleRoot style={styles.fadeIn}>
          <DialogTitle id="scroll-dialog-title">PRODUCT QUICKVIEW</DialogTitle>
          <DialogContent dividers={scroll === "paper"}>
            <ModalProduct id={props.id} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </StyleRoot>
      </Dialog>
    </div>
  );
}
