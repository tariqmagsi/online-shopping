import React, { Component } from "react";
import { Container } from "@material-ui/core";

import { getFromStorage } from "../../../utils/storage";

class Key extends Component {
  state = {
    password: "",
    reenterPassword: "",
    errorPass: "",
    errorPassEq: "",
    passMatch: "",
    requireError: "",
    old: "",
    errorMsg: "",
    oldError: "",
    flag: false
  };

  errorPass = () => {
    if (this.state.password.length < 8) {
      this.setState({
        errorPass:
          this.state.password === ""
            ? ""
            : "Key must be greater than or equal to 8 characters"
      });
      return false;
    } else this.setState({ errorPass: "" });
    if (this.state.reenterPassword !== "") {
      if (this.state.password !== this.state.reenterPassword) {
        this.setState({
          errorPassEq: this.state.password === "" ? "" : "Keys are not equal"
        });
        return false;
      } else
        this.setState({
          errorPassEq: "",
          passMatch: this.state.password === "" ? "" : "Keys are matched"
        });
    } else this.setState({ errorPassEq: "" });
    return true;
  };
  errorRequired = () => {
    if (
      this.state.password.trim() === "" ||
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
      errorPass: "",
      errorPassEq: "",
      passMatch: "",
      requireError: ""
    });
  };
  oldPass = () => {
    fetch("/key/oldKey", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        key: this.state.old
      })
    })
      .then(res => res.json())
      .then(json => {
        if (!json.success) {
          this.setState({
            oldError: "Old Key Wrong",
            flag: false
          });
        } else {
          this.setState({ oldError: "", flag: true });
        }
      });
  };

  signupSubmitHandler = event => {
    event.preventDefault();

    const obj = getFromStorage("a");

    if (obj && obj.token) {
      if (this.errorPass() && this.state.flag) {
        const { password } = this.state;
        fetch("/key", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            key: password
          })
        })
          .then(res => res.json())
          .then(json => {
            if (json.success) {
              this.setState({ passMatch: "Key Changed Successfully" });
              setTimeout(() => {
                this.setState({
                  passMatch: "",
                  password: "",
                  reenterPassword: "",
                  oldPass: "",
                  old: ""
                });
              }, 1000);
            }
          });
      }
    }
  };

  render() {
    return (
      <div
        style={{
          textAlign: "center"
        }}
      >
        <br />
        <br />
        <Container>
          <div>
            <form onSubmit={this.signupSubmitHandler}>
              <div style={{ color: "red" }}>{this.state.requireError}</div>
              <div style={{ color: "red" }}>{this.state.errorPass}</div>
              <div style={{ color: "red" }}>{this.state.errorPassEq}</div>
              <div style={{ color: "red" }}>{this.state.oldError}</div>
              <div style={{ color: "green" }}>{this.state.passMatch}</div>
              <input
                value={this.state.old}
                onChange={e => {
                  this.setState(
                    {
                      old: e.target.value,
                      errorPass: "",
                      errorPassEq: "",
                      passMatch: "",
                      requireError: "",
                      oldError: ""
                    },
                    () => {
                      this.oldPass();
                    }
                  );
                }}
                placeholder="Old Secret Key*"
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
                value={this.state.password}
                onChange={e =>
                  this.setState({
                    password: e.target.value,
                    errorPass: "",
                    errorPassEq: "",
                    passMatch: "",
                    requireError: "",
                    oldError: ""
                  })
                }
                placeholder="New Secret Key*"
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
                    errorPass: "",
                    errorPassEq: "",
                    passMatch: "",
                    requireError: "",
                    oldError: ""
                  })
                }
                placeholder="Re-Enter New Secret Key*"
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

              <button
                className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedSecondary"
                style={{
                  width: "300px",
                  color: "white"
                }}
              >
                Change Secret Key
              </button>
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

export default Key;
