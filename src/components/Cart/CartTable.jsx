import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { Button, SvgIcon } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import {
  getFromStorage,
  removeFromStorage,
  setInStorage,
  generateId
} from "../../utils/storage";

class CartTable extends React.Component {
  state = { products: [], flag: false };
  whenClickHandler = e => {
    const remainings = getFromStorage("products").filter(
      item => item._id.toString() !== e.target.id.toString()
    );
    const detail = getFromStorage("details").filter(
      item => item._id.toString() !== e.target.id.toString()
    );
    removeFromStorage("products");
    removeFromStorage("details");
    setInStorage("products", remainings);
    setInStorage("details", detail);
    this.setState({ products: detail, flag: true });
  };
  whenSubmitHandler = e => {
    if (getFromStorage("products")) {
      if (getFromStorage("products").length !== 0) {
        setInStorage(
          "token",
          generateId() +
            "." +
            generateId() +
            "." +
            generateId() +
            "." +
            generateId()
        );
      }
    } else {
      removeFromStorage("token");
    }
  };
  UNSAFE_componentWillReceiveProps() {
    this.setState({
      products: getFromStorage("details") ? getFromStorage("details") : []
    });
  }
  render() {
    const StyledTableCell = withStyles(theme => ({
      head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
      },
      body: {
        fontSize: 14
      }
    }))(TableCell);

    const StyledTableRow = withStyles(theme => ({
      root: {
        "&:nth-of-type(odd)": {
          backgroundColor: theme.palette.background.default
        }
      }
    }))(TableRow);

    const useStyles = makeStyles(theme => ({
      root: {
        width: "100%",
        marginTop: theme.spacing(3),
        overflowX: "auto"
      },
      table: {
        minWidth: 700
      }
    }));

    const sum = getFromStorage("details")
      ? getFromStorage("details").map(row => row.quantity * row.price)
      : 0;

    return (
      <div>
        <Paper className={useStyles.root}>
          <div style={{ overflowX: "auto" }}>
            <Table className={useStyles.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell alight="left">Code</StyledTableCell>
                  <StyledTableCell align="left">Name</StyledTableCell>
                  <StyledTableCell align="left">Quantity</StyledTableCell>
                  <StyledTableCell align="left">Size</StyledTableCell>
                  <StyledTableCell align="left">Rate</StyledTableCell>
                  <StyledTableCell align="left">Total</StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!this.state.flag
                  ? this.props.arr.map(row => (
                      <StyledTableRow key={row._id}>
                        <StyledTableCell>{row._id}</StyledTableCell>
                        <StyledTableCell align="left">
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.quantity}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.size}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.price}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.price * row.quantity}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <SvgIcon
                            className="cart-table"
                            id={row._id}
                            onClick={this.whenClickHandler}
                          >
                            <path
                              id={row._id}
                              d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
                            />
                          </SvgIcon>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))
                  : this.state.products.map(row => (
                      <StyledTableRow key={row._id}>
                        <StyledTableCell>{row._id}</StyledTableCell>
                        <StyledTableCell align="left">
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.quantity}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.size}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.price}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.price * row.quantity}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <SvgIcon
                            className="cart-table"
                            id={row._id}
                            onClick={this.whenClickHandler}
                          >
                            <path
                              id={row._id}
                              d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
                            />
                          </SvgIcon>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                <StyledTableRow>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell
                    align="left"
                    style={{ fontSize: "20px", fontWeight: "bold" }}
                  >
                    SUB TOTAL:{" "}
                  </StyledTableCell>
                  <StyledTableCell align="left" style={{ fontSize: "15px" }}>
                    PKR.{" "}
                    {getFromStorage("details")
                      ? sum.reduce((a, b) => a + b, 0)
                      : 0}
                  </StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </div>
        </Paper>
        <br />
        <br />
        <NavLink
          to="/BillingInformation"
          style={{ color: "white", textDecoration: "none" }}
        >
          <Button
            color="secondary"
            variant="contained"
            onClick={this.whenSubmitHandler}
          >
            Proceed For Billing
          </Button>
        </NavLink>
      </div>
    );
  }
}
export default CartTable;
