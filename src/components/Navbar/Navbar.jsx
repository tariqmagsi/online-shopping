import React, { Component } from "react";
import { ShoppingCart } from "@material-ui/icons";
import { NavLink } from "react-router-dom";
import Drawer from "../Drawer/Drawer";
import Arrow from "../Arrow-up/Arrow";
import Radium, { StyleRoot } from "radium";
import fadeInDown from "react-animations/lib/fade-in-down";
import slideInLeft from "react-animations/lib/slide-in-left";
import { getFromStorage } from "../../utils/storage";
import pic from "../../images/1.jpg";

export default class Navbar extends Component {
  state = { position: 0, flag: false };

  componentDidMount() {
    window.addEventListener("scroll", this.listenToScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.listenToScroll);
  }
  listenToScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const scrolled = (winScroll / height) * 100;
    if (scrolled >= 8) {
      this.setState({ flag: true });
    } else {
      this.setState({ flag: false });
    }
    this.setState({
      position: scrolled
    });
  };

  render() {
    const styles = {
      fadeIn: {
        animation: "x 1s",
        animationName: Radium.keyframes(fadeInDown, "fadeIn")
      },
      zoomIn: {
        animation: "x 1s",
        animationName: Radium.keyframes(slideInLeft, "zoomIn")
      }
    };
    const sum = getFromStorage("details")
      ? getFromStorage("details").map(row => row.quantity * row.price)
      : 0;
    return (
      <div
        className="navbar-main"
        style={{ minWidth: this.props.flag1 ? "750px" : "318px" }}
        id="navbar1"
      >
        <StyleRoot style={styles.fadeIn}>
          <div
            style={{
              color: "white",
              backgroundColor: "black",
              textAlign: "right",
              paddingRight: "30px",
              width: "100%",
              paddingTop: "10px",
              paddingBottom: "10px"
            }}
          >
            <NavLink
              to="/Cart"
              style={{ color: "white", textDecoration: "none" }}
              activeStyle={{ color: "rgb(248, 70, 70)" }}
            >
              <span
                style={{ cursor: "pointer", marginLeft: "30px" }}
                className="hover-span"
              >
                Cart: PKR{" "}
                {getFromStorage("details") ? sum.reduce((a, b) => a + b, 0) : 0}
                <ShoppingCart
                  style={{
                    color: "red",
                    fontSize: "20px",
                    paddingLeft: "10px"
                  }}
                  className="trauli"
                />
              </span>
            </NavLink>
          </div>
          <div
            style={{
              marginBottom: "100px",
              paddingTop: this.props.flag ? "50px" : "0px",
              width: "100%",
              backgroundColor: "black",
              paddingBottom: this.props.flag ? "100vh" : "50px",
              marginTop: this.props.flag
                ? "0px"
                : this.state.flag
                ? "60px"
                : "-60px"
            }}
            id="navbar"
            className={this.props.flag ? "navbar-1" : ""}
          >
            <Arrow />

            <StyleRoot style={styles.zoomIn}>
              <ul
                className={this.state.flag ? "navbar-ul shadow-5" : "navbar-ul"}
                style={{
                  position: this.state.flag ? "fixed" : "initial",
                  zIndex: "200",
                  marginTop: this.state.flag
                    ? "-140px"
                    : this.props.size <= 1015
                    ? "-100px"
                    : "initial",
                  left: this.state.flag ? "0%" : "0%",

                  backgroundColor: this.state.flag ? "black" : "transparent",
                  paddingBottom: !this.state.flag ? "0px" : "20px",
                  height: !this.state.flag ? "0px" : "130px",
                  width: "100%",
                  transition: "all 0.5s ease"
                }}
              >
                <li
                  className="drawer-icon"
                  style={{ display: "none", color: "white" }}
                >
                  <Drawer flag={this.props.flag} flag1={this.state.flag} />
                </li>
                <li className="dropdown">
                  <span
                    className="navbar-span"
                    style={{
                      color:
                        this.props.flag2 === "R" ? "rgb(248, 70, 70)" : "white"
                    }}
                  >
                    READY TO WEAR{" "}
                    <span
                      style={{
                        marginLeft: "5px",
                        color:
                          this.props.flag2 === "R"
                            ? "rgb(248, 70, 70)"
                            : "white"
                      }}
                    >
                      v
                    </span>
                  </span>
                  <div className="dropdown-content">
                    <NavLink
                      to="/ReadyToWear/TwoPiece"
                      style={{ textDecoration: "none", color: "white" }}
                      activeStyle={{ color: "rgb(248, 70, 70)" }}
                    >
                      <div>
                      <img
                        src={pic}
                        alt=""
                        style={{ height: "200px", width: "200px" }}
                      />
                      TWO PIECE
                      </div>
                    </NavLink>
                    <NavLink
                      to="/ReadyToWear/ThreePiece"
                      style={{ textDecoration: "none", color: "white" }}
                      activeStyle={{ color: "rgb(248, 70, 70)" }}
                    >
                      <img
                        src={pic}
                        alt=""
                        style={{ height: "200px", width: "200px" }}
                      />
                      THREE PIECE
                    </NavLink>
                  </div>
                </li>
                <li className="dropdown">
                  <span
                    className="navbar-span"
                    style={{
                      color:
                        this.props.flag2 === "U" ? "rgb(248, 70, 70)" : "white"
                    }}
                  >
                    UNSTITCHED{" "}
                    <span
                      style={{
                        marginLeft: "5px",
                        color:
                          this.props.flag2 === "U"
                            ? "rgb(248, 70, 70)"
                            : "white"
                      }}
                    >
                      v
                    </span>
                  </span>
                  <div className="dropdown-content">
                    <NavLink
                      to="/Unstitched/TwoPiece"
                      style={{ textDecoration: "none", color: "white" }}
                      activeStyle={{ color: "rgb(248, 70, 70)" }}
                    >
                      TWO PIECE
                    </NavLink>
                    <NavLink
                      to="/Unstitched/ThreePiece"
                      style={{ textDecoration: "none", color: "white" }}
                      activeStyle={{ color: "rgb(248, 70, 70)" }}
                    >
                      THREE PIECE
                    </NavLink>
                  </div>
                </li>

                <li>
                  <NavLink
                    to="/FormalWear"
                    style={{ textDecoration: "none", color: "black" }}
                    activeStyle={{ color: "rgb(248, 70, 70)" }}
                  >
                    <span
                      className="navbar-span"
                      style={{
                        color:
                          this.props.flag2 === "F"
                            ? "rgb(248, 70, 70)"
                            : "white"
                      }}
                    >
                      FORMAL WEAR
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/TrendingNow"
                    style={{ textDecoration: "none", color: "black" }}
                    activeStyle={{ color: "rgb(248, 70, 70)" }}
                  >
                    <span
                      className="navbar-span"
                      style={{
                        color:
                          this.props.flag2 === "T"
                            ? "rgb(248, 70, 70)"
                            : "white"
                      }}
                    >
                      TRENDING NOW
                    </span>
                  </NavLink>
                </li>
              </ul>
            </StyleRoot>
          </div>
        </StyleRoot>
      </div>
    );
  }
}
