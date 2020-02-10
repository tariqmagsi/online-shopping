import React, { Component } from "react";
import Navbar from "./Navbar";
import Tabs from "./Tabs";
import { getFromStorage } from "../../utils/storage";
import { withRouter } from "react-router-dom";

class Portal extends Component {
  componentDidMount() {
    const obj = getFromStorage("a");
    if (!(obj && obj.token)) {
      this.props.history.push("/Account");
    }
  }
  render() {
    return (
      <div style={{ minWidth: "540px" }}>
        <Navbar />
        <br />
        <br />
        <br />
        <br />
        <Tabs />
      </div>
    );
  }
}
export default withRouter(Portal);
