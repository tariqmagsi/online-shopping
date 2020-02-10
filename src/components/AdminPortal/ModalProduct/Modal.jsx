import React, { Component } from "react";
import {
  Container,
  Button,
  MenuItem,
  InputLabel,
  Select,
  FormControl
} from "@material-ui/core";
import { withRouter } from "react-router-dom";

class ModalProduct extends Component {
  state = {
    name: "",
    description: "",
    file: "",
    selectedFile: null,
    errorRequired: "",
    errorProduct: "",
    success: "",
    category: "",
    subcategory: "",
    errorImage: "",
    price: "",
    errorPrice: ""
  };
  typeError = () => {
    if (this.state.selectedFile === null) {
      return true;
    } else if (
      this.state.selectedFile.type === "image/png" ||
      this.state.selectedFile.type === "image/jpeg" ||
      this.state.selectedFile.type === "image/jpg"
    ) {
      return true;
    }
    this.setState({ errorImage: "Please Select .jpg/.png/.jpeg" });
    return false;
  };
  whenChangeHandler = e => {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
      errorRequired: "",
      errorProduct: "",
      errorPrice: ""
    });
  };
  whenChangeHandlerImage = e => {
    this.setState({ selectedFile: e.target.files[0] });
  };
  fetchData = () => {
    fetch("/products/myproduct/" + this.props.id)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            name: json.product.name,
            description: json.product.description,
            file: json.product.image,
            category: json.product.category,
            subcategory: json.product.subcategory,
            price: json.product.price
          });
        }
      });
  };
  submitHandler = () => {
    if (
      this.state.name.trim() !== "" &&
      this.state.category.trim() !== "" &&
      this.typeError() &&
      this.priceError()
    ) {
      if (
        (this.state.category === "READY TO WEAR" &&
          this.state.subcategory.trim() !== "") ||
        this.state.category !== "READY TO WEAR"
      ) {
        fetch("/products/myproduct/" + this.props.id, {
          method: "PATCH",
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
          .then(json => {
            if (json.success) {
              this.setState({ success: "Product Updated" });
              setTimeout(() => {
                this.setState({ success: "" });
              }, 1000);
              if (this.state.selectedFile !== null) {
                const formData = new FormData();
                formData.append(
                  "file",
                  this.state.selectedFile,
                  this.state.selectedFile.name
                );
                fetch("/products/image/" + this.state.name, {
                  method: "POST",
                  body: formData
                })
                  .then(res => res.json())
                  .then(json => {
                    if (json.success && this.state.selectedFile !== null) {
                      this.setState({
                        errorRequired: ""
                      });
                    }
                  });
              }
              setTimeout(() => this.props.history.push("/Account"), 1000);
            } else {
              this.setState({ errorProduct: "Product Already Exists" });
            }
          });
      } else {
        this.setState({ errorRequired: "Required Fields Missing" });
      }
    } else {
      this.setState({ errorRequired: "Required Fields Missing" });
    }
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
  componentDidMount() {
    this.fetchData();
  }
  render() {
    return (
      <div>
        <Container>
          <div>
            <div style={{ color: "red" }}>{this.state.errorRequired}</div>
            <div style={{ color: "red" }}>{this.state.errorProduct}</div>
            <div style={{ color: "red" }}>{this.state.errorImage}</div>
            <div style={{ color: "red" }}>{this.state.errorPrice}</div>
            <div style={{ color: "green" }}>{this.state.success}</div>
            <br />
            <form>
              <span>Name:{"   "}</span>
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
              <span>Price:{"   "}</span>
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
              {this.state.category === "READY TO WEAR" ? (
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
              <span>Description:{"   "}</span>
              <br />
              <textarea
                value={this.state.description}
                name="description"
                onChange={this.whenChangeHandler}
                placeholder="Description"
                rows={10}
                style={{
                  height: "30px",
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
                name="file"
                accept="image/png,image/jpg,image/jpeg"
                onChange={this.whenChangeHandlerImage}
              />
              <br />

              <br />

              <Button
                onClick={this.submitHandler}
                variant="contained"
                color="primary"
                style={{ width: "300px" }}
              >
                Update Product
              </Button>
            </form>
          </div>
        </Container>
      </div>
    );
  }
}

export default withRouter(ModalProduct);
