import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { SvgIcon } from "@material-ui/core";
import ScrollDialog from "./ModalProduct";

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

class DelieveredTable extends React.Component {
  state = {
    orders: [],
    search: ""
  };
  fetchOrders = () => {
    fetch("/searchorders?isDelivered=false")
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({ orders: json.orders });
        }
      });
  };
  updateOrder = e => {
    fetch("/orders/myorder/" + e.target.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        isDelivered: true
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.fetchOrders();
        }
      });
  };
  whenClickHandler = () => {
    if (this.state.search.trim() !== "") {
      fetch("/orders/myorders?isDelivered=false&&_id=" + this.state.search)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({ orders: [json.orders] });
          } else {
            this.setState({ orders: [] });
          }
        });
    } else {
      this.fetchOrders();
    }
  };
  whenChangeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  componentDidMount() {
    this.fetchOrders();
  }
  UNSAFE_componentWillReceiveProps() {
    this.fetchOrders();
  }
  render() {
    console.log(this.state.orders)
    return (
      <React.Fragment>
        <br />
        <input
          value={this.state.search}
          name="search"
          onChange={this.whenChangeHandler}
          type="text"
          placeholder="Search By Id*"
          style={{
            height: "30px",
            width: "300px",
            paddingLeft: "10px"
          }}
        />
        <button
          style={{
            height: "30px",
            width: "200px",
            marginLeft: "10px"
          }}
          onClick={this.whenClickHandler}
        >
          Search
        </button>
        <br />
        <br />
        <Paper>
          <div style={{ overflowX: "auto" }}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">Date</StyledTableCell>
                  <StyledTableCell align="left">Order Id</StyledTableCell>
                  <StyledTableCell align="left">Name</StyledTableCell>
                  <StyledTableCell align="left">Email</StyledTableCell>
                  <StyledTableCell align="left">Phone</StyledTableCell>
                  <StyledTableCell align="left">Country</StyledTableCell>
                  <StyledTableCell align="left">Address</StyledTableCell>
                  <StyledTableCell align="left">State</StyledTableCell>

                  <StyledTableCell align="left">City</StyledTableCell>
                  <StyledTableCell align="left">Total</StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.orders.map(row => (
                  <React.Fragment key={row._id}>
                    <StyledTableRow>
                      <StyledTableCell align="left">{row.Date}</StyledTableCell>
                      <StyledTableCell align="left">{row._id}</StyledTableCell>
                      <StyledTableCell align="left">{row.name}</StyledTableCell>
                      <StyledTableCell align="left">
                        {row.email}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.phone}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.country}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.address}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.state}
                      </StyledTableCell>
                      <StyledTableCell align="left">{row.city}</StyledTableCell>
                      <StyledTableCell align="left">
                        {row.total}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <SvgIcon
                          id={row._id}
                          onClick={this.updateOrder}
                          className="cart-table"
                        >
                          <path
                            id={row._id}
                            d="M21 10.12h-6.78l2.74-2.82c-2.73-2.7-7.15-2.8-9.88-.1a6.875 6.875 0 000 9.79c2.73 2.71 7.15 2.71 9.88 0C18.32 15.65 19 14.08 19 12.1h2c0 1.98-.88 4.55-2.64 6.29-3.51 3.48-9.21 3.48-12.72 0-3.5-3.47-3.53-9.11-.02-12.58 3.51-3.47 9.14-3.47 12.65 0L21 3v7.12zM12.5 8v4.25l3.5 2.08-.72 1.21L11 13V8h1.5z"
                          />
                        </SvgIcon>
                      </StyledTableCell>
                      <StyledTableCell>
                        <ScrollDialog id={row._id} />
                      </StyledTableCell>
                    </StyledTableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
        </Paper>
        <br />
        <h2 style={{ color: "red", textAlign: "center" }}>
          {this.state.orders.length !== 0 ? "" : "Orders Not Found"}
        </h2>
      </React.Fragment>
    );
  }
}
export default DelieveredTable;
