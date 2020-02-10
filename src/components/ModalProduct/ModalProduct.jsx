import React, { Component } from "react";
import {
  Container,
  Button,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  CircularProgress
} from "@material-ui/core";
import Radium, { StyleRoot } from "radium";
import { zoomIn } from "react-animations";
import lightSpeedIn from "react-animations/lib/light-speed-in";
import { withRouter, NavLink } from "react-router-dom";
import { setInStorage, getFromStorage } from "../../utils/storage";

class Product extends Component {
  state = {
    size: "",
    product: null,
    quantity: "",
    requireError: "",
    quantityError: "",
    productArray: [],
    found: false,
    quant: 0,
    id: ""
  };
  handleChange = e => {
    const { value, name } = e.target;

    this.setState(
      { [name]: value, requireError: "", quantityError: "" },
      () => {
        if (name === "size") {
          const quant = this.state.product.productDetail.find(row =>
            row.size === this.state.size ? row.quantity : 0
          );
          this.setState({
            quant: quant ? quant.quantity : 0,
            id: quant ? quant._id : ""
          });
        }
      }
    );
  };
  requireError = () => {
    if (this.state.size.trim() === "" || this.state.quantity.trim() === "") {
      this.setState({ requireError: "All Fields Required" });
      return false;
    }
    return true;
  };
  quantityError = () => {
    if (
      parseInt(this.state.quantity) <= 0 ||
      parseInt(this.state.quant) - parseInt(this.state.quantity) < 0 ||
      this.state.quantity.toString().includes(".") === true
    ) {
      this.setState({
        quantityError:
          "Quantity must be greater than 0 and fixed number or not out of stock"
      });
      return false;
    }
    return true;
  };
  submitHandler = () => {
    if (this.requireError() && this.quantityError()) {
      this.setState(
        {
          productArray: this.state.productArray.concat({
            _id: this.state.product._id,
            quantity: this.state.quantity,
            size: this.state.size,
            product_id: this.state.id
          })
        },
        () => {
          setInStorage("products", this.state.productArray);
          this.setState({ size: 0, quantity: "" });
          this.findInLocal();
        }
      );
    }
  };
  fetchProduct = () => {
    fetch("/products/myproduct/" + this.props.id)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({ product: json.product });
        }
      });
  };
  findInLocal = () => {
    if (
      this.state.productArray.find(
        item => item._id.toString() === this.props.id.toString()
      )
    ) {
      this.setState({ found: true });
    }
    return this.state.found;
  };
  componentDidMount() {
    this.setState(
      {
        productArray: getFromStorage("products")
          ? this.state.productArray.concat(getFromStorage("products"))
          : []
      },
      () => {
        this.findInLocal();
        this.fetchProduct();
      }
    );
  }
  render() {
    const styles = {
      fadeIn: {
        animation: "x 1s",
        animationName: Radium.keyframes(zoomIn, "fadeIn")
      },
      newAnim: {
        animation: "x 1s",
        animationName: Radium.keyframes(lightSpeedIn, "fadeIn")
      }
    };
    if (this.state.product !== null)
      return (
        <div style={{ overflowX: "auto" }}>
          <Container>
            <div className="dib ma2 pa2 shadow-4 grow">
              <StyleRoot style={styles.fadeIn}>
                <img
                  alt=""
                  src={"data:image/png;base64," + this.state.product.image}
                  style={{ width: "300px", height: "300px", minWidth: "300px" }}
                />
              </StyleRoot>
            </div>

            <div className="dib ma2 pa2" style={{ textTransform: "uppercase" }}>
              <StyleRoot style={styles.newAnim}>
                <div
                  style={{ fontSize: "20px" }}
                  className="product-description"
                >
                  <strong>Product Description</strong>
                  <span style={{ fontSize: "16px" }}>
                    -------------------------------
                  </span>
                </div>
                <br />
                <div style={{ fontSize: "16px" }}>
                  {this.state.product.name}
                </div>
                <h1>PKR. {this.state.product.price}</h1>
                <br />
                {this.state.quant !== 0 ? (
                  <p>{this.state.quant} in stock</p>
                ) : (
                  ""
                )}
                <p style={{ color: "red" }}>{this.state.requireError}</p>
                <p style={{ color: "red" }}>{this.state.quantityError}</p>
                <br />
                <hr />
                <br />
                <FormControl variant="outlined">
                  <InputLabel htmlFor="outlined-age-simple">
                    Select Size
                  </InputLabel>
                  <Select
                    value={this.state.size}
                    style={{ width: "150px" }}
                    inputProps={{
                      name: "size",
                      id: "outlined-age-simple"
                    }}
                    onChange={this.handleChange}
                  >
                    <MenuItem value={0}>
                      <em>None</em>
                    </MenuItem>
                    {this.state.product.productDetail.map(item =>
                      item.quantity !== 0 ? (
                        <MenuItem value={item.size} key={item._id}>
                          {item.size}
                        </MenuItem>
                      ) : (
                        ""
                      )
                    )}
                  </Select>
                </FormControl>
                <br />
                <br />
                <input
                  value={this.state.quantity}
                  onChange={this.handleChange}
                  type="number"
                  name="quantity"
                  placeholder="Quantity*"
                  style={{
                    height: "35px",
                    width: "100px",
                    paddingLeft: "10px"
                  }}
                />
                {!this.state.found ? (
                  <Button
                    color="primary"
                    variant="contained"
                    style={{ marginLeft: "20px" }}
                    id="mycart-add-product"
                    onClick={this.submitHandler}
                  >
                    Add To Cart
                  </Button>
                ) : (
                  <NavLink
                    to="/Cart"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    <Button
                      color="secondary"
                      variant="contained"
                      style={{ marginLeft: "20px" }}
                    >
                      Checkout Cart
                    </Button>
                  </NavLink>
                )}
                <br />
                <br />
                <hr style={{ marginBottom: "310px" }} />
                <br />
              </StyleRoot>
            </div>
          </Container>
        </div>
      );
    else
      return (
        <div style={{ textAlign: "center", height: "100vh" }}>
          <CircularProgress variant="indeterminate" />
        </div>
      );
  }
}

export default withRouter(Product);
