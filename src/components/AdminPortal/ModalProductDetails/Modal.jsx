import React, { Component } from "react";
import {
  Container,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import { withRouter } from "react-router-dom";

class ModalProductDetails extends Component {
  state = {
    size: "",
    price: "",
    quantity: "",
    errorRequired: "",

    success: "",
    errorQuantity: "",
    errorPrice: "",
    errorExist: ""
  };
  requiredError = () => {
    if (this.state.size.trim() === "") {
      this.setState({ errorRequired: "Fields Missing" });
      return false;
    }
    return true;
  };
  whenChangeHandler = e => {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
      errorRequired: "",
      errorQuantity: "",
      errorPrice: "",
      errorExist: ""
    });
  };
  quantityError = () => {
    if (parseInt(this.state.quantity) < 0) {
      this.setState({
        errorQuantity: "Quantity must be greater than or equals to 0"
      });
      return false;
    }
    return true;
  };

  fetchDetails = () => {
    fetch("/products_details/myproduct/" + this.props.id)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            size: json.product.size,
            quantity: json.product.quantity
          });
        }
      });
  };
  submitHandler = () => {
    if (this.requiredError() && this.quantityError()) {
      fetch("/products_details/myproduct/" + this.props.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          quantity: this.state.quantity,
          size: this.state.size
        })
      })
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              success: "Updated Successfully"
            });

            setTimeout(() => {
              this.setState({ success: "" });
              this.props.history.push("/Account");
            }, 1000);
          } else {
            this.setState({ errorExist: json.message });
          }
        });
    }
  };
  componentDidMount() {
    this.fetchDetails();
  }
  render() {
    return (
      <div>
        <Container>
          <div>
            <div style={{ color: "red" }}>{this.state.errorRequired}</div>
            <div style={{ color: "red" }}>{this.state.errorQuantity}</div>
            <div style={{ color: "red" }}>{this.state.errorExist}</div>
            <div style={{ color: "green" }}>{this.state.success}</div>
            <br />
            <form>
              <span>Quantity:{"   "}</span>
              <br />
              <input
                value={this.state.quantity}
                name="quantity"
                onChange={this.whenChangeHandler}
                type="number"
                placeholder="Quantity*"
                style={{
                  height: "30px",
                  width: "300px",
                  paddingLeft: "10px"
                }}
              />
              <br />
              <br />
              <span>Size:{"   "}</span>
              <br />
              <FormControl>
                <InputLabel htmlFor="outlined-size-simple">Size*</InputLabel>
                <Select
                  value={this.state.size}
                  onChange={this.whenChangeHandler}
                  inputProps={{
                    name: "size",
                    id: "outlined-size-simple"
                  }}
                  style={{ width: "300px" }}
                  required
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>

                  <MenuItem value="S">S</MenuItem>
                  <MenuItem value="M">M</MenuItem>
                  <MenuItem value="L">L</MenuItem>
                  <MenuItem value="XL">XL</MenuItem>
                  <MenuItem value="XXL">XXL</MenuItem>
                </Select>
              </FormControl>
              <br />

              <br />

              <Button
                onClick={this.submitHandler}
                variant="contained"
                color="primary"
                style={{ width: "300px" }}
              >
                Update Product Details
              </Button>
            </form>
          </div>
        </Container>
      </div>
    );
  }
}

export default withRouter(ModalProductDetails);
