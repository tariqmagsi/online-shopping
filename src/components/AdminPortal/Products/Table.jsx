import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ModalProductDetails from "../ModalProductDetails/ModalProductDetails";
import {
  SvgIcon,
  Button,
  Fab,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from "@material-ui/core";
import ModalProduct from "../ModalProduct/ModalProduct";
import { ArrowLeft, ArrowRight } from "@material-ui/icons";

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

class ProductTable extends React.Component {
  state = {
    rows: [],
    image: [],
    products: [],
    flag: false,
    product_details: [],
    count: 1,
    skip: 0,
    category: "",
    subcategory: "",
    search: ""
  };
  whenChangeHandler = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };
  fetchImage = skip => {
    fetch(
      "/products?limit=10&&skip=" +
        skip +
        "&&category=" +
        this.state.category +
        "&&subcategory=" +
        this.state.subcategory +
        "&&search=" +
        this.state.search
    )
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({ products: json.products }, () =>
            this.fetchProductDetails()
          );
        }
      });
  };
  deleteProduct = e => {
    fetch("/products/myproduct/" + e.target.id, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.fetchImage();
        }
      });
  };
  fetchProductDetails = () => {
    this.setState({ product_details: [] }, () => {
      this.state.products.forEach(row =>
        fetch("/products_details/product/" + row._id)
          .then(res => res.json())
          .then(json => {
            if (json.success) {
              this.setState({
                product_details: this.state.product_details.concat([
                  json.product
                ])
              });
            }
          })
      );
    });
  };

  componentDidMount() {
    this.fetchImage(0);
  }

  previousClick = () => {
    if (this.state.count !== 1) {
      let skip = this.state.skip;
      this.setState({
        count: this.state.count - 1,
        skip: skip - 10
      });
      this.fetchImage(skip - 10);
    }
  };
  nextClick = () => {
    if (this.state.products.length !== 0) {
      let skip = this.state.skip;
      this.setState({ count: this.state.count + 1, skip: skip + 10 });
      this.fetchImage(skip + 10);
    }
  };
  whenSearch = () => {
    if (this.state.category !== "READY TO WEAR") {
      this.setState(
        {
          subcategory: "",
          skip: 0,
          count: 1,
          product_details: []
        },
        () => this.fetchImage(this.state.skip)
      );
    } else {
      this.setState(
        {
          skip: 0,
          count: 1,
          product_details: []
        },
        () => this.fetchImage(this.state.skip)
      );
    }
  };
  render() {
    return (
      <React.Fragment>
        <br />
        <FormControl>
          <InputLabel htmlFor="outlined-category-simple">Category*</InputLabel>
          <Select
            value={this.state.category}
            onChange={this.whenChangeHandler}
            inputProps={{
              name: "category",
              id: "outlined-category-simple"
            }}
            style={{ width: "300px" }}
            required
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="READY TO WEAR">READY TO WEAR</MenuItem>
            <MenuItem value="UNSTITCHED">UNSTITCHED</MenuItem>
            <MenuItem value="FORMAL WEAR">FORMAL WEAR</MenuItem>
            <MenuItem value="TRENDING NOW">TRENDING NOW</MenuItem>
          </Select>
        </FormControl>
        <br />
        <br />
        {this.state.category === "READY TO WEAR" ||
        this.state.category === "UNSTITCHED" ? (
          <React.Fragment>
            <FormControl>
              <InputLabel htmlFor="outlined-subcategory-simple">
                Sub Category*
              </InputLabel>
              <Select
                value={this.state.subcategory}
                onChange={this.whenChangeHandler}
                inputProps={{
                  name: "subcategory",
                  id: "outlined-subcategory-simple"
                }}
                style={{ width: "300px" }}
                required
              >
                <MenuItem value="">All</MenuItem>

                <MenuItem value="TWO PIECE">TWO PIECE</MenuItem>
                <MenuItem value="THREE PIECE">THREE PIECE</MenuItem>
              </Select>
            </FormControl>
            <br />
            <br />
          </React.Fragment>
        ) : (
          <span></span>
        )}
        <br />
        <input
          value={this.state.search}
          name="search"
          onChange={this.whenChangeHandler}
          type="text"
          placeholder="Search By Name*"
          style={{
            height: "30px",
            width: "300px",
            paddingLeft: "10px"
          }}
        />
        <br />
        <br />
        <button
          style={{
            height: "30px",
            width: "200px",
            marginLeft: "10px"
          }}
          onClick={this.whenSearch}
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
                  <StyledTableCell align="left">Product ID</StyledTableCell>
                  <StyledTableCell align="left">Image</StyledTableCell>
                  <StyledTableCell align="left">Name</StyledTableCell>
                  <StyledTableCell align="left">Category</StyledTableCell>
                  <StyledTableCell align="left">Price</StyledTableCell>
                  <StyledTableCell align="left">Description</StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>

                  <StyledTableCell align="left">Size</StyledTableCell>
                  <StyledTableCell align="left">Quantity</StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.products.map((row, i) => (
                  <React.Fragment key={row._id}>
                    <StyledTableRow>
                      <StyledTableCell align="left" rowSpan={6}>
                        {row._id}
                      </StyledTableCell>
                      <StyledTableCell align="left" rowSpan={6}>
                        <img
                          src={"data:image/png;base64," + row.image}
                          alt=""
                          style={{
                            width: "100px",
                            minHeight: "100px",
                            maxHeight: "auto",
                            minWidth: "100px"
                          }}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="left" rowSpan={6}>
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="left" rowSpan={6}>
                        {row.category}
                        {row.category === "READY TO WEAR" ||
                        row.category === "UNSTITCHED"
                          ? `(${row.subcategory})`
                          : ""}
                      </StyledTableCell>
                      <StyledTableCell align="left" rowSpan={6}>
                        {row.price}
                      </StyledTableCell>
                      <StyledTableCell align="left" rowSpan={6}>
                        {row.description}
                      </StyledTableCell>

                      <StyledTableCell align="left" rowSpan={6}>
                        <SvgIcon
                          id={row._id}
                          className="cart-table"
                          onClick={this.deleteProduct}
                        >
                          <path
                            id={row._id}
                            d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                          />
                        </SvgIcon>
                      </StyledTableCell>
                      <StyledTableCell rowSpan={6}>
                        <ModalProduct id={row._id} />
                      </StyledTableCell>
                    </StyledTableRow>

                    {this.state.product_details.map(items =>
                      items.map(item =>
                        row._id === item.product ? (
                          <StyledTableRow key={item._id}>
                            <StyledTableCell align="left">
                              {item.size}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              {item.quantity}
                            </StyledTableCell>

                            <StyledTableCell align="left">
                              <ModalProductDetails id={item._id} />
                            </StyledTableCell>
                          </StyledTableRow>
                        ) : (
                          <React.Fragment key={item._id}></React.Fragment>
                        )
                      )
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
        </Paper>
        <br />
        <h2 style={{ color: "red" }}>
          {this.state.products.length !== 0 ? "" : "Products Not Found"}
        </h2>
        <br />
        <Fab
          color="secondary"
          aria-label="add"
          style={{ height: "40px", width: "40px", fontSize: "2px" }}
          onClick={this.previousClick}
        >
          <ArrowLeft />
        </Fab>
        <Button
          color="primary"
          variant="contained"
          style={{ marginLeft: "10px" }}
        >
          {this.state.count}
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
          onClick={this.nextClick}
        >
          <ArrowRight />
        </Fab>
      </React.Fragment>
    );
  }
}
export default ProductTable;
