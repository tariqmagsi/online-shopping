import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: "black",
          color: "white",
          textAlign: "center",
          paddingTop: "50px",
          paddingBottom: "50px",
          minWidth: this.props.flag ? "750px" : "318px"
        }}
      >
        All Rights Reserved
      </div>
    );
  }
}
