import React, { Component } from "react";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import { Container, Button } from "@material-ui/core";
import validator from "validator";
import { setInStorage, getFromStorage } from "../../utils/storage";
import { withRouter } from "react-router-dom";

class Account extends Component {
  state = {
    email: "",
    password: "",
    signupName: "",
    signupEmail: "",
    signupPassword: "",
    reenterPassword: "",
    errorEmail: "",
    errorPass: "",
    errorPassEq: "",
    errorName: "",
    passMatch: "",
    requireError: "",
    token: "",
    signUpError: "",
    key: "",
    errorMsg: "",
    oldError: "",
    flag: false
  };

  errorEmail = () => {
    if (validator.isEmail(this.state.signupEmail)) {
      return true;
    }
    this.setState({ errorEmail: "Email is not valid" });
    return false;
  };
  errorName = () => {
    for (var i = 0; i < 10; i++) {
      if (this.state.signupName.includes(i)) {
        this.setState({
          errorName:
            this.state.signupName === "" ? "" : "Name can't be a number"
        });
        return false;
      } else this.setState({ errorName: "" });
    }
    return true;
  };

  errorPass = () => {
    if (this.state.signupPassword.length < 8) {
      this.setState({
        errorPass:
          this.state.signupPassword === ""
            ? ""
            : "Password must be greater than or equal to 8 characters"
      });
      return false;
    } else this.setState({ errorPass: "" });
    if (this.state.reenterPassword !== "") {
      if (this.state.signupPassword !== this.state.reenterPassword) {
        this.setState({
          errorPassEq:
            this.state.signupPassword === "" ? "" : "Passwords are not equal"
        });
        return false;
      } else
        this.setState({
          errorPassEq: "",
          passMatch:
            this.state.signupPassword === "" ? "" : "Passwords are matched"
        });
    } else this.setState({ errorPassEq: "" });
    return true;
  };
  errorRequired = () => {
    if (
      this.state.signupName.trim() === "" ||
      this.state.signupEmail.trim() === "" ||
      this.state.signupPassword.trim() === "" ||
      this.state.reenterPassword.trim() === ""
    ) {
      this.setState({ requireError: "All Fields Required" });
      return false;
    }
    return true;
  };

  whenChangeHandler = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      errorEmail: "",
      errorPass: "",
      errorPassEq: "",
      errorName: "",
      passMatch: "",
      requireError: ""
    });
  };
  whenChangeHandler1 = e => {
    this.setState({ email: e.target.name });
  };
  signupSubmitHandler = e => {
    e.preventDefault();

    this.oldPass();
    setTimeout(() => {
      const obj = getFromStorage("a");

      if (!(obj && obj.token)) {
        if (
          this.errorRequired() &&
          this.errorName() &&
          this.errorEmail() &&
          this.errorPass() &&
          this.state.flag
        ) {
          const { signupName, signupEmail, signupPassword } = this.state;
          fetch("/profiles", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              name: signupName,
              email: signupEmail,
              password: signupPassword
            })
          })
            .then(res => res.json())
            .then(json => {
              if (json.success) {
                setInStorage("a", { token: json.token });
                this.setState({
                  signUpError: json.message
                });
                this.setState({
                  signupName: "",
                  signupEmail: "",
                  signupPassword: "",
                  reenterPassword: ""
                });
                this.props.history.push("/Portal");
              } else {
                this.setState({
                  signUpError: json.message,
                  token: json.token
                });
              }
            });
        }
      }
    }, 500);
  };
  oldPass = () => {
    fetch("/key/oldKey", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        key: this.state.key
      })
    })
      .then(res => res.json())
      .then(json => {
        if (!json.success) {
          this.setState({
            oldError: "Secret Key Wrong",
            flag: false
          });
        } else {
          this.setState({ oldError: "", flag: true });
        }
      });
  };
  loginHandler = () => {
    const obj = getFromStorage("a");

    if (!(obj && obj.token)) {
      const { email, password } = this.state;

      fetch("/profiles/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            setInStorage("a", { token: json.token });
            this.setState({
              token: json.token
            });
            this.props.history.push("/Portal");
          } else {
            this.setState({ errorMsg: json.error });
          }
        });
    } else {
      this.props.history.push("/Portal");
    }
  };
  componentDidMount() {
    const obj = getFromStorage("a");
    if (obj && obj.token) {
      this.props.history.push("/Portal");
    }
  }

  render() {
    return (
      <div
        style={{
          minWidth: "410px",
          backgroundPosition: "top",
          textAlign: "center",
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
            Account
          </h1>
        </div>
        <br />
        <Breadcrumb name="Account" />
        <br />
        <br />
        <Container>
          <div
            className="pa4 shadow-4 dib"
            style={{ backgroundColor: "white" }}
          >
            <h1 style={{ textAlign: "center", textTransform: "uppercase" }}>
              Login
            </h1>
            <div style={{ color: "red" }}>{this.state.errorMsg}</div>
            <form>
              <input
                value={this.state.email}
                onChange={e =>
                  this.setState({
                    email: e.target.value,
                    errorMsg: ""
                  })
                }
                placeholder="Email*"
                type="email"
                name="password"
                style={{
                  width: "300px",
                  backgroundColor: "white",
                  height: "40px",
                  paddingLeft: "10px"
                }}
                required
              />
              <br />
              <br />
              <input
                value={this.state.password}
                onChange={e =>
                  this.setState({
                    password: e.target.value,
                    errorMsg: ""
                  })
                }
                placeholder="Password*"
                type="password"
                name="email"
                style={{
                  width: "300px",
                  backgroundColor: "white",
                  height: "40px",
                  paddingLeft: "10px"
                }}
                required
              />

              <br />
              <br />
              <Button
                onClick={this.loginHandler}
                style={{
                  width: "300px",
                  backgroundColor: "#4BB543",
                  color: "white"
                }}
              >
                Login
              </Button>
            </form>
          </div>
          <br />
          <br />
          <h3 style={{ color: "white" }}>OR</h3>
          <br />
          <br />
          <div
            className="pa4 dib shadow-4"
            style={{ backgroundColor: "white" }}
          >
            <h2 style={{ textAlign: "center", textTransform: "uppercase" }}>
              Signup
            </h2>
            <br />
            <form>
              <div style={{ color: "red" }}>{this.state.requireError}</div>
              <div style={{ color: "red" }}>{this.state.errorName}</div>
              <div style={{ color: "red" }}>{this.state.errorEmail}</div>
              <div style={{ color: "red" }}>{this.state.errorPass}</div>
              <div style={{ color: "red" }}>{this.state.errorPassEq}</div>
              <div style={{ color: "red" }}>{this.state.signUpError}</div>
              <div style={{ color: "red" }}>{this.state.oldError}</div>
              <input
                value={this.state.signupName}
                onChange={e =>
                  this.setState({
                    signupName: e.target.value,
                    errorEmail: "",
                    errorPass: "",
                    errorPassEq: "",
                    errorName: "",
                    passMatch: "",
                    requireError: "",
                    errorKey: "",
                    oldError: ""
                  })
                }
                placeholder="Name*"
                type="text"
                name="name"
                style={{
                  width: "300px",
                  backgroundColor: "white",
                  height: "40px",
                  paddingLeft: "10px"
                }}
                required
              />
              <br />
              <br />
              <input
                value={this.state.signupEmail}
                onChange={e =>
                  this.setState({
                    signupEmail: e.target.value,
                    errorEmail: "",
                    errorPass: "",
                    errorPassEq: "",
                    errorName: "",
                    passMatch: "",
                    requireError: "",
                    errorKey: "",
                    oldError: ""
                  })
                }
                placeholder="Email*"
                type="email"
                name="signup-email"
                style={{
                  width: "300px",
                  backgroundColor: "white",
                  height: "40px",
                  paddingLeft: "10px"
                }}
                required
              />
              <br />
              <br />
              <input
                value={this.state.signupPassword}
                onChange={e =>
                  this.setState({
                    signupPassword: e.target.value,
                    errorEmail: "",
                    errorPass: "",
                    errorPassEq: "",
                    errorName: "",
                    passMatch: "",
                    requireError: "",
                    errorKey: "",
                    oldError: ""
                  })
                }
                placeholder="Password*"
                type="password"
                name="signup-password"
                style={{
                  width: "300px",
                  backgroundColor: "white",
                  height: "40px",
                  paddingLeft: "10px"
                }}
                required
              />
              <br />
              <br />
              <input
                value={this.state.reenterPassword}
                onChange={e =>
                  this.setState({
                    reenterPassword: e.target.value,
                    errorEmail: "",
                    errorPass: "",
                    errorPassEq: "",
                    errorName: "",
                    passMatch: "",
                    requireError: "",
                    errorKey: "",
                    oldError: ""
                  })
                }
                placeholder="Re-Enter Password*"
                type="password"
                name="reenterpassword"
                style={{
                  width: "300px",
                  backgroundColor: "white",
                  height: "40px",
                  paddingLeft: "10px"
                }}
                required
              />
              <br />
              <br />
              <input
                value={this.state.key}
                onChange={e =>
                  this.setState({
                    key: e.target.value,
                    errorEmail: "",
                    errorPass: "",
                    errorPassEq: "",
                    errorName: "",
                    passMatch: "",
                    requireError: "",
                    errorKey: "",
                    oldError: ""
                  })
                }
                placeholder="Secret Key*"
                type="password"
                name="secretkey"
                style={{
                  width: "300px",
                  backgroundColor: "white",
                  height: "40px",
                  paddingLeft: "10px"
                }}
                required
              />
              <br />
              <br />
              <Button
                color="secondary"
                variant="contained"
                style={{
                  width: "300px",
                  color: "white"
                }}
                onClick={this.signupSubmitHandler}
              >
                Signup
              </Button>
            </form>
          </div>
          <br />
          <br />
          <br />
        </Container>
      </div>
    );
  }
}

export default withRouter(Account);
