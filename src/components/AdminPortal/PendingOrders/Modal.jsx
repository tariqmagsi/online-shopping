import React, { Component } from "react";
import { Container } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

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
class ModalProduct extends Component {
  state = { products: [] };
  fetchData = () => {
    fetch("/orders/myorders?isDelivered=false&&_id=" + this.props.id)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({ products: json.orders.products });
        }
      });
  };
  componentDidMount() {
    this.fetchData();
  }
  render() {
    return (
      <div>
        <Container>
          <Paper>
            <div style={{ overflowX: "auto" }}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">Product Id</StyledTableCell>
                    <StyledTableCell align="left">Name</StyledTableCell>
                    <StyledTableCell align="left">Category</StyledTableCell>
                    <StyledTableCell align="left">SubCategory</StyledTableCell>
                    <StyledTableCell align="left">Size</StyledTableCell>
                    <StyledTableCell align="left">Quantity</StyledTableCell>
                    <StyledTableCell align="left">Price</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.products.map(row => (
                    <React.Fragment key={row._id}>
                      <StyledTableRow>
                        <StyledTableCell align="left">
                          {row.product_id}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.product_name}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.category}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.subcategory}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.size}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.quantity}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.price}
                        </StyledTableCell>
                      </StyledTableRow>
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Paper>
        </Container>
      </div>
    );
  }
}

export default ModalProduct;
