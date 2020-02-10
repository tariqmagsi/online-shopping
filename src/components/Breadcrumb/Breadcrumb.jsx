import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import GrainIcon from "@material-ui/icons/Grain";
import { NavLink } from "react-router-dom";

export default function Breadcrumb(props) {
  return (
    <div
      style={{ textAlign: "center", fontSize: 15, textTransform: "uppercase" }}
    >
      <NavLink
        to="/"
        style={{ textDecoration: "none", color: "black" }}
        className="breadcrumb-navlink"
      >
        <HomeIcon style={{ width: 15, height: 15, marginRight: "5px" }} /> Home
      </NavLink>{" "}
      /{" "}
      <GrainIcon
        style={{
          width: 15,
          height: 15,
          marginRight: "5px",
          color: "rgb(248, 70, 70)"
        }}
      />{" "}
      <span style={{ color: "rgb(248, 70, 70)" }}>{props.name}</span>
      <br />
      <br />
    </div>
  );
}
