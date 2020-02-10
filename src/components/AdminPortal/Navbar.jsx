import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Grid } from "@material-ui/core";

class Navbar extends Component {
  render() {
    const useStyles = makeStyles(theme => ({
      root: {
        flexGrow: 1
      },
      menuButton: {
        marginRight: theme.spacing(2)
      }
    }));
    return (
      <div className={useStyles.root}>
        <AppBar position="fixed">
          <Toolbar>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
            >
              <div style={{ fontSize: "25px" }}>Clothing</div>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
export default Navbar;
