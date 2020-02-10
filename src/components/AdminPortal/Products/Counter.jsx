import React, { Component } from "react";
import { ArrowRight, ArrowLeft } from "@material-ui/icons";
import { Fab, Button } from "@material-ui/core";

class Counter extends Component {
  render() {
    return (
      <React.Fragment>
        <Fab
          color="secondary"
          aria-label="add"
          style={{ height: "40px", width: "40px", fontSize: "2px" }}
        >
          <ArrowLeft />
        </Fab>
        <Button
          color="primary"
          variant="contained"
          style={{ marginLeft: "10px" }}
        >
          1
        </Button>
        <Fab
          color="secondary"
          aria-label="add"
          style={{
            height: "40px",
            width: "40px",
            fontSize: "2px",
            marginLeft: "10px"
          }}
        >
          <ArrowRight />
        </Fab>
      </React.Fragment>
    );
  }
}
export default Counter;
