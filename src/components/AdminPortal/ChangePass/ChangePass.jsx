import React, { Component } from "react";
import { Container, Button } from "@material-ui/core";

import { getFromStorage } from "../../../utils/storage";

class ChangePass extends Component {
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
            : "Password must be greater than or equal to 8 characters"
      });
      return false;
    } else this.setState({ errorPass: "" });
    if (this.state.reenterPassword !== "") {
      if (this.state.password !== this.state.reenterPassword) {
        this.setState({
          errorPassEq:
            this.state.password === "" ? "" : "Passwords are not equal"
        });
        return false;
      } else
        this.setState({
          errorPassEq: "",
          passMatch: this.state.password === "" ? "" : "Passwords are matched"
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
    const obj = getFromStorage("a");

    const { token } = obj;
    fetch("/profiles/myprofile", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          fetch("/profiles/checkOldPass", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email: json.profile.email,
              password: this.state.old
            })
          })
            .then(res => res.json())
            .then(json => {
              if (!json.success) {
                this.setState({
                  oldError: "Old Password Wrong",
                  flag: false
                });
              } else {
                this.setState({ oldError: "", flag: true });
              }
            });
        }
      });
  };
  signupSubmitHandler = () => {
    const obj = getFromStorage("a");

    if (obj && obj.token) {
      if (this.errorRequired() && this.state.flag && this.errorPass()) {
        const { token } = obj;
        const { password } = this.state;
        fetch("/profiles/myprofile", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            password: password
          })
        })
          .then(res => res.json())
          .then(json => {
            if (json.success) {
              this.setState({ passMatch: "Password Changed Successfully" });
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
            <form>
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
                placeholder="Old Password*"
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
                placeholder="New Password*"
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
                placeholder="Re-Enter New Password*"
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

              <Button
                color="secondary"
                variant="contained"
                style={{
                  width: "300px",
                  color: "white"
                }}
                onClick={this.signupSubmitHandler}
              >
                Change Password
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

export default ChangePass;
