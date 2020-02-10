import React, { Component } from "react";
import {
  Button,
  Select,
  InputLabel,
  MenuItem,
  FormControl
} from "@material-ui/core";
import Table from "./Table";
import { withRouter } from "react-router-dom";

class Product extends Component {
  state = {
    name: "",
    size: ["S", "M", "L", "XL", "XXL"],
    description: "",
    file: null,
    success: "",
    errorRequired: "",
    errorProduct: "",
    errorQuantity: "",
    errorImage: "",
    category: "",
    subcategory: "",
    count: 1,
    skip: 0,
    price: "",
    errorPrice: ""
  };
  typeError = () => {
    if (this.state.file.type !== null) {
      if (
        this.state.file.type === "image/png" ||
        this.state.file.type === "image/jpeg" ||
        this.state.file.type === "image/jpg"
      ) {
        return true;
      }
    }
    this.setState({ errorImage: "Please Select .jpg/.png/.jpeg" });
    return false;
  };
  requireError = () => {
    if (
      this.state.price.trim() === "" ||
      this.state.name.trim() === "" ||
      this.state.category.trim() === "" ||
      this.state.file === null ||
      (this.state.category === "READY TO WEAR" &&
        this.state.subcategory.trim() === "") ||
      (this.state.category === "UNSTITCHED" &&
        this.state.subcategory.trim() === "")
    ) {
      this.setState({ errorRequired: "All Fields Required" });
      return false;
    }
    return true;
  };

  whenChangeHandler = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      errorRequired: "",
      errorProduct: "",
      errorQuantity: "",
      errorPrice: ""
    });
  };
  whenChangeHandlerImage = e => {
    e.preventDefault();
    this.setState({ file: e.target.files[0], errorImage: "", errorPrice: "" });
  };
  addProductDetails = id => {
    this.state.size.forEach(item =>
      fetch("/products_details/" + id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          quantity: 0,
          size: item
        })
      })
        .then(res => res.json())
        .then(json => {})
    );
  };
  priceError = () => {
    if (parseInt(this.state.price) <= 0) {
      this.setState({
        errorPrice: "Price must be greater than 0"
      });
      return false;
    }
    return true;
  };
  submitHandler = () => {
    if (this.requireError() && this.priceError() && this.typeError()) {
      fetch("/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: this.state.name,
          description: this.state.description,
          category: this.state.category,
          subcategory: this.state.subcategory,
          price: this.state.price
        })
      })
        .then(res => res.json())
        .then(json1 => {
          if (json1.success) {
            const formData = new FormData();
            formData.append("file", this.state.file, this.state.file.name);
            fetch("/products/image/" + json1.product._id, {
              method: "POST",
              body: formData
            })
              .then(res => res.json())
              .then(json => {
                if (json.success) {
                  this.setState({
                    success: "Added Successfully",
                    name: "",
                    description: "",
                    file: "",
                    errorRequired: "",
                    errorProduct: "",
                    errorQuantity: "",
                    category: "",
                    subcategory: "",
                    errorPrice: ""
                  });
                  this.addProductDetails(json1.product._id);
                  setTimeout(() => {
                    this.setState({ success: "" });
                    this.props.history.push("/Account");
                  }, 500);
                }
              });
          } else {
            this.setState({ errorProduct: "Product Already Exists" });
          }
        });
    }
  };

  render() {
    return (
      <div style={{ textAlign: "center", minWidth: "460px" }}>
        <div>
          <div style={{ color: "red" }}>{this.state.errorRequired}</div>
          <div style={{ color: "red" }}>{this.state.errorProduct}</div>
          <div style={{ color: "red" }}>{this.state.errorImage}</div>
          <div style={{ color: "red" }}>{this.state.errorPrice}</div>
          <br />
          <form>
            <span style={{ marginLeft: "-255px" }}>Name:{"   "}</span>
            <br />
            <input
              value={this.state.name}
              name="name"
              onChange={this.whenChangeHandler}
              type="text"
              placeholder="Name*"
              style={{
                height: "30px",
                width: "300px",
                paddingLeft: "10px"
              }}
            />
            <br />
            <br />
            <span style={{ marginLeft: "-255px" }}>Price:{"   "}</span>
            <br />
            <input
              value={this.state.price}
              name="price"
              onChange={this.whenChangeHandler}
              type="number"
              placeholder="Price*"
              style={{
                height: "30px",
                width: "300px",
                paddingLeft: "10px"
              }}
            />
            <br />
            <br />
            <FormControl>
              <InputLabel htmlFor="outlined-category-simple">
                Category*
              </InputLabel>
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
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>

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

            <span style={{ marginLeft: "-220px" }}>Description:{"   "}</span>
            <br />
            <textarea
              value={this.state.description}
              name="description"
              onChange={this.whenChangeHandler}
              placeholder="Description"
              rows={5}
              style={{
                width: "300px",
                paddingLeft: "10px"
              }}
            />
            <br />
            <br />
            <strong>Choose an Image:</strong>
            <br />
            <br />
            <input
              type="file"
              files={this.state.file}
              name="file"
              accept="image/png,image/jpg,image/jpeg"
              onChange={this.whenChangeHandlerImage}
            />
            <br />
            <div style={{ color: "green" }}>{this.state.success}</div>
            <br />
            <Button
              onClick={this.submitHandler}
              variant="contained"
              color="secondary"
              style={{ width: "300px" }}
            >
              Add Product
            </Button>
          </form>
        </div>
        <br />
        <div>
          <Table />
        </div>
        <br />
      </div>
    );
  }
}
export default withRouter(Product);
