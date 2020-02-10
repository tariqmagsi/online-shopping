import React, { Component } from "react";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import { Container, Button } from "@material-ui/core";
import validator from "validator";
import { withRouter } from "react-router-dom";
import {
  getFromStorage,
  removeFromStorage,
  setInStorage
} from "../../utils/storage";

class Billing extends Component {
  state = {
    name: "",
    email: "",
    country: "",
    address: "",
    state: "",
    city: "",
    phone: "",
    errorName: "",
    requireError: "",
    errorPhone: "",
    errorEmail: "",
    products: [],
    flag: false,
    sum: 0,
    flag1: false,
    products_db: []
  };

  errorEmail = () => {
    if (validator.isEmail(this.state.email)) {
      return true;
    }
    this.setState({ errorEmail: "Email is not valid" });
    return false;
  };
  errorName = () => {
    for (var i = 0; i < 10; i++) {
      if (this.state.name.includes(i)) {
        this.setState({
          errorName: this.state.name === "" ? "" : "Name can't be a number"
        });
        return false;
      } else this.setState({ errorName: "" });
    }
    return true;
  };

  errorRequired = () => {
    if (
      this.state.name.trim() === "" ||
      this.state.email.trim() === "" ||
      this.state.country.trim() === "" ||
      this.state.address.trim() === "" ||
      this.state.state.trim() === "" ||
      this.state.city.trim() === "" ||
      this.state.phone.trim() === ""
    ) {
      this.setState({ requireError: "All Fields Required" });
      return false;
    }
    return true;
  };
  errorPhone = () => {
    for (let i = 0; i < this.state.phone.length; i++) {
      if (
        (this.state.phone.charCodeAt(i) < 48 &&
          this.state.phone[i] !== "+" &&
          this.state.phone[i] !== "-") ||
        (this.state.phone.charCodeAt(i) > 57 &&
          this.state.phone[i] !== "-" &&
          this.state.phone[i] !== "-")
      ) {
        this.setState({ errorPhone: "Phone is not valid" });
        return false;
      }
    }
    return true;
  };
  whenChangeHandler = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      errorEmail: "",
      errorName: "",
      passMatch: "",
      requireError: ""
    });
  };
  whenChangeHandler1 = e => {
    this.setState({ email: e.target.name });
  };

  whenSubmitHandler = () => {
    if (
      this.errorRequired() &&
      this.errorName() &&
      this.errorEmail() &&
      this.errorPhone()
    ) {
      fetch("/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          country: this.state.country,
          address: this.state.address,
          state: this.state.state,
          city: this.state.city,
          phone: this.state.phone,
          total: this.state.sum,
          products: this.state.products_db
        })
      })
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.state.products.map(item =>
              this.updateQuantity(
                item.product_id,
                parseInt(item.quantity),
                item.size
              )
            );
            removeFromStorage("token");
            setInStorage("details", []);
            setInStorage("products", []);
            setInStorage("mongo_products", []);
            this.props.history.push("/Thankyou");
          }
        });
    }
  };
  updateQuantity = (id, quantity, size) => {
    fetch("/products_details/myproduct/" + id)
      .then(res => res.json())
      .then(json1 => {
        if (json1.success) {
          fetch("/products_details/myproduct/" + id, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              quantity: json1.product.quantity - quantity,
              size: size
            })
          })
            .then(res => res.json())
            .then(json => {
              if (json.success) {
              }
            });
        }
      });
  };
  componentDidMount() {
    if (getFromStorage("details") && getFromStorage("mongo_products")) {
      if (
        getFromStorage("details").length !== 0 &&
        getFromStorage("mongo_products").length !== 0
      ) {
        this.setState({
          products: getFromStorage("details") ? getFromStorage("details") : [],
          sum: getFromStorage("details")
            ? getFromStorage("details")
                .map(row => row.quantity * row.price)
                .reduce((a, b) => a + b, 0)
            : 0,
          flag: true,
          products_db: getFromStorage("mongo_products")
            ? getFromStorage("mongo_products")
            : []
        });
      }
    }
  }

  render() {
    if (this.state.flag)
      return (
        <div
          style={{
            minWidth: "750px",
            backgroundPosition: "top",

            marginTop: "-100px"
          }}
          className="account"
        >
          <br />
          <div style={{ textAlign: "center" }}>
            <h1
              style={{
                textAlign: "center",
                textTransform: "uppercase",
                color: "white"
              }}
              className="home"
            >
              Billing Information
            </h1>
          </div>
          <br />
          <Breadcrumb name="Billing Information" />
          <br />
          <br />

          <Container>
            <div className="pa4 shadow-4" style={{ backgroundColor: "white" }}>
              <div className="ma4 pa4 dib">
                <h3 style={{ textTransform: "uppercase" }}>Billing Details</h3>
                <br />
                <form>
                  <div style={{ color: "red" }}>{this.state.requireError}</div>
                  <div style={{ color: "red" }}>{this.state.errorName}</div>
                  <div style={{ color: "red" }}>{this.state.errorEmail}</div>
                  <div style={{ color: "red" }}>{this.state.errorPhone}</div>
                  <br />
                  <div>
                    Name:<span style={{ color: "red" }}>*</span>
                  </div>
                  <input
                    value={this.state.name}
                    onChange={e =>
                      this.setState({
                        name: e.target.value,
                        errorName: "",
                        errorEmail: "",
                        requireError: "",
                        errorPhone: ""
                      })
                    }
                    placeholder="Name*"
                    type="text"
                    name="name"
                    style={{
                      width: "500px",
                      backgroundColor: "white",
                      height: "40px",
                      paddingLeft: "10px"
                    }}
                    required
                  />
                  <br />
                  <br />
                  <div>
                    Email:<span style={{ color: "red" }}>*</span>
                  </div>
                  <input
                    value={this.state.email}
                    onChange={e =>
                      this.setState({
                        email: e.target.value,
                        errorName: "",
                        errorEmail: "",
                        requireError: "",
                        errorPhone: ""
                      })
                    }
                    placeholder="Email*"
                    type="email"
                    name="email"
                    style={{
                      width: "500px",
                      backgroundColor: "white",
                      height: "40px",
                      paddingLeft: "10px"
                    }}
                    required
                  />
                  <br />
                  <br />
                  <div>
                    Country:<span style={{ color: "red" }}>*</span>
                  </div>
                  <input
                    value={this.state.country}
                    onChange={e =>
                      this.setState({
                        country: e.target.value,
                        errorName: "",
                        errorEmail: "",
                        requireError: "",
                        errorPhone: ""
                      })
                    }
                    placeholder="Country*"
                    type="text"
                    name="country"
                    style={{
                      width: "500px",
                      backgroundColor: "white",
                      height: "40px",
                      paddingLeft: "10px"
                    }}
                    required
                  />
                  <br />
                  <br />
                  <div>
                    Street Address:<span style={{ color: "red" }}>*</span>
                  </div>
                  <input
                    value={this.state.address}
                    onChange={e =>
                      this.setState({
                        address: e.target.value,
                        errorName: "",
                        errorEmail: "",
                        requireError: "",
                        errorPhone: ""
                      })
                    }
                    placeholder="Street Address*"
                    type="text"
                    name="address"
                    style={{
                      width: "500px",
                      backgroundColor: "white",
                      height: "40px",
                      paddingLeft: "10px"
                    }}
                    required
                  />
                  <br />
                  <br />
                  <div>
                    Sate/Province:<span style={{ color: "red" }}>*</span>
                  </div>
                  <input
                    value={this.state.state}
                    onChange={e =>
                      this.setState({
                        state: e.target.value,
                        errorName: "",
                        errorEmail: "",
                        requireError: "",
                        errorPhone: ""
                      })
                    }
                    placeholder="State/Province*"
                    type="text"
                    name="state"
                    style={{
                      width: "500px",
                      backgroundColor: "white",
                      height: "40px",
                      paddingLeft: "10px"
                    }}
                    required
                  />
                  <br />
                  <br />
                  <div>
                    City:<span style={{ color: "red" }}>*</span>
                  </div>
                  <input
                    value={this.state.city}
                    onChange={e =>
                      this.setState({
                        city: e.target.value,
                        errorName: "",
                        errorEmail: "",
                        requireError: "",
                        errorPhone: ""
                      })
                    }
                    placeholder="City*"
                    type="text"
                    name="city"
                    style={{
                      width: "500px",
                      backgroundColor: "white",
                      height: "40px",
                      paddingLeft: "10px",
                      errorPhone: ""
                    }}
                    required
                  />
                  <br />
                  <br />
                  <div>
                    Phone:<span style={{ color: "red" }}>*</span>
                  </div>
                  <input
                    value={this.state.phone}
                    onChange={e =>
                      this.setState({
                        phone: e.target.value,
                        errorName: "",
                        errorEmail: "",
                        requireError: "",
                        errorPhone: ""
                      })
                    }
                    placeholder="Phone*"
                    type="text"
                    name="phone"
                    style={{
                      width: "500px",
                      backgroundColor: "white",
                      height: "40px",
                      paddingLeft: "10px"
                    }}
                    required
                  />
                  <br />
                  <br />
                </form>
              </div>
              <div className="ma4 pa4 dib">
                <h3 style={{ textTransform: "uppercase" }}>Your order</h3>
                <br />
                <div style={{ overflowX: "auto" }}>
                  <table
                    cellPadding="0"
                    cellSpacing="0"
                    style={{
                      textTransform: "uppercase",
                      paddingBottom: "180px"
                    }}
                  >
                    <thead>
                      <tr style={{ borderBottom: "1px solid black" }}>
                        <th
                          style={{
                            paddingRight: "200px",
                            paddingTop: "20px",
                            borderBottom: "thin solid gray",
                            paddingBottom: "20px"
                          }}
                        >
                          Product
                        </th>
                        <th
                          style={{
                            paddingTop: "20px",
                            borderBottom: "thin solid gray",
                            paddingBottom: "20px"
                          }}
                        >
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.products.map(item => (
                        <tr key={item._id}>
                          <td
                            style={{
                              paddingTop: "20px",
                              borderBottom: "thin solid gray",
                              paddingBottom: "20px"
                            }}
                          >
                            {item.name}{" "}
                            <strong style={{ textTransform: "lowercase" }}>
                              x
                            </strong>{" "}
                            {item.quantity}
                          </td>
                          <td
                            style={{
                              paddingTop: "20px",
                              borderBottom: "thin solid gray",
                              paddingBottom: "20px"
                            }}
                          >
                            PKR. {item.price * item.quantity}
                          </td>
                        </tr>
                      ))}

                      <tr>
                        <td
                          style={{
                            paddingTop: "20px",
                            borderBottom: "thin solid black",
                            borderTop: "thin solid black",
                            paddingBottom: "20px"
                          }}
                        >
                          <strong>Total</strong>
                        </td>
                        <td
                          style={{
                            paddingTop: "20px",
                            borderBottom: "thin solid black",
                            borderTop: "thin solid black",
                            paddingBottom: "20px"
                          }}
                        >
                          <strong>PKR. {this.state.sum}</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <br />
                  <br />
                  <Button
                    style={{
                      width: "350px",
                      backgroundColor: "#4BB543",
                      color: "white",
                      marginTop: "-360px"
                    }}
                    onClick={this.whenSubmitHandler}
                  >
                    Proceed order
                  </Button>
                </div>
              </div>
            </div>
            <br />
            <br />
          </Container>
        </div>
      );
    else
      return (
        <div style={{ height: "100vh", textAlign: "center" }}>
          <h1 style={{ textTransform: "uppercase" }}>
            You have no products in your cart
          </h1>
        </div>
      );
  }
}
export default withRouter(Billing);
