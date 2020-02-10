import React from "react";
import Fab from "@material-ui/core/Fab";
import { ArrowUpward } from "@material-ui/icons";
import { Link } from "react-scroll";

export default class Arrow extends React.Component {
  state = { position: 0, flag: false };

  componentDidMount() {
    window.addEventListener("scroll", this.listenToScroll);
    if (this.state.position >= 0) {
      this.setState({ flag: true });
    }
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

    this.setState({
      position: scrolled
    });
  };

  render() {
    return (
      <Link
        activeClass="active"
        to="navbar1"
        spy={true}
        smooth={true}
        effect={0}
        duration={1000}
      >
        <div
          style={{
            height: this.state.position < 10 ? "0px" : "40px",
            visibility: this.state.position < 10 ? "hidden" : "initial",
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: "1",
            transition: "all 0.5s ease"
          }}
        >
          <Fab
            color="primary"
            aria-label="add"
            style={{ height: "40px", width: "40px", fontSize: "2px" }}
          >
            <ArrowUpward />
          </Fab>
        </div>
      </Link>
    );
  }
}
