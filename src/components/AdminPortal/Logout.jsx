import React, { Component } from "react";
import {
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell
} from "@material-ui/core";
import { getFromStorage, removeFromStorage } from "../../utils/storage";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";

class Logout extends Component {
  state = { error: "", rows: [], image: "" };
  logoutHandler = () => {
    const obj = getFromStorage("a");

    if (obj && obj.token) {
      const { token } = obj;
      fetch("/profiles/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            removeFromStorage("a");

            this.props.history.push("/Account");
          }
        });
    } else {
      this.props.history.push("/Account");
    }
  };
  fetchData = () => {
    const obj = getFromStorage("a");

    if (obj && obj.token) {
      const { token } = obj;
      fetch("/profiles/myprofile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({ rows: json.profile });
          }
        });
    }
  };

  componentDidMount() {
    this.fetchData();
  }
  render() {
    const { rows } = this.state;
    const classes = makeStyles(theme => ({
      root: {
        width: "100%"
      },
      paper: {
        marginTop: theme.spacing(3),
        width: "100%",
        overflowX: "auto",
        marginBottom: theme.spacing(2)
      },
      table: {
        minWidth: 650
      }
    }));

    return (
      <div
        className={classes.root}
        style={{ overflowX: "auto", textAlign: "center" }}
      >
        <Paper className={classes.paper}>
          <Table className={classes.table} size="small">
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Name</strong>
                </TableCell>
                <TableCell>{rows.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Email</strong>
                </TableCell>
                <TableCell>{rows.email}</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </Paper>
        <br />
        <Button
          variant="contained"
          color="secondary"
          style={{ width: "300px", textAlign: "center" }}
          onClick={this.logoutHandler}
        >
          Logout
        </Button>
      </div>
    );
  }
}

export default withRouter(Logout);
