import React, { Component } from "react";
import "tachyons";
import { Container, Button, Fab } from "@material-ui/core";
import Radium, { StyleRoot } from "radium";
import { ArrowLeft, ArrowRight } from "@material-ui/icons";
import "tachyons";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import { NavLink } from "react-router-dom";
import TransitionsModal from "../Modal/Modal";
import { zoomIn } from "react-animations";

export default class UnstitchedTwo extends Component {
  state = {
    rows: [],
    image: [],
    products: [],
    flag: false,
    product_details: [],
    count: 1,
    skip: 0,
    category: "",
    subcategory: "",
    search: ""
  };
  fetchImage = skip => {
    fetch(
      "/products?limit=10&&skip=" +
        skip +
        "&&category=UNSTITCHED&&subcategory=TWO PIECE" +
        "&&search=" +
        this.state.search
    )
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({ products: json.products });
          this.fetchProductDetails();
        }
      });
  };

  fetchProductDetails = () => {
    this.state.products.forEach(row =>
      fetch("/products_details/product/" + row._id)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState(
              {
                product_details: []
              },
              () =>
                this.setState({
                  product_details: this.state.product_details.concat([
                    json.product
                  ])
                })
            );
          }
        })
    );
  };

  previousClick = () => {
    if (this.state.count !== 1) {
      let skip = this.state.skip;
      this.setState({
        count: this.state.count - 1,
        skip: skip - 10
      });
      this.fetchImage(skip - 10);
    }
  };
  nextClick = () => {
    if (this.state.products.length !== 0) {
      let skip = this.state.skip;
      this.setState({ count: this.state.count + 1, skip: skip + 10 });
      this.fetchImage(skip + 10);
    }
  };
  componentDidMount() {
    this.fetchImage(0);
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
    if (scrolled >= 15) {
      this.setState({ flag: true });
    }
    this.setState({
      position: scrolled
    });
  };
  changeHandler = e => {
    const { classContained } = this.state;
    if (e.target.className !== classContained) {
      e.target.className = classContained;
    }
  };
  render() {
    const styles = {
      fadeIn: {
        animation: "x 1s",
        animationName: Radium.keyframes(zoomIn, "fadeIn")
      }
    };

    return (
      <div
        style={{
          textAlign: "center",
          minWidth: "460px",
          backgroundPosition: "top"
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1
            style={{
              textAlign: "center",
              textTransform: "uppercase"
            }}
            className="home"
          >
            Unstitched (Two Piece)
          </h1>
        </div>
        <br />
        <Breadcrumb name="Unstitched (Two Piece)" />
        <br />
        <br />
        <Container>
          <Fab
            color="secondary"
            aria-label="add"
            style={{ height: "40px", width: "40px", fontSize: "2px" }}
            onClick={this.previousClick}
          >
            <ArrowLeft />
          </Fab>
          <Button
            color="primary"
            variant="contained"
            style={{ marginLeft: "10px" }}
          >
            {this.state.count}
          </Button>
          <Fab
            color="secondary"
            aria-label="add"
            style={{
              height: "40px",
              width: "40px",
              fontSize: "2px",
              marginLeft: "10px"
            }}
            onClick={this.nextClick}
          >
            <ArrowRight />
          </Fab>
          <br />
          <br />
          <div
            style={{
              width: "100%",
              textAlign: "center"
            }}
          >
            {" "}
            <StyleRoot style={styles.fadeIn}>
              {this.state.products.map(row => (
                <div className="pa4 ma3 dib shadow-4" key={row._id}>
                  <div className="myclass-image">
                    <NavLink to={`/Product/${row._id}`}>
                      <img
                        src={"data:image/png;base64," + row.image}
                        alt=""
                        style={{
                          height: "400px",
                          width: "300px",
                          minWidth: "300px",
                          cursor: "pointer"
                        }}
                        className="img-trend"
                      />
                    </NavLink>

                    <StyleRoot style={styles.fadeIn}>
                      <TransitionsModal
                        className="myclass-button"
                        id={row._id}
                      />
                    </StyleRoot>
                  </div>

                  <NavLink
                    to={`/Product/${row._id}`}
                    style={{ textDecoration: "none", color: "black" }}
                    className="p-ready-to-wear"
                  >
                    <p
                      style={{ textAlign: "center", cursor: "pointer" }}
                      className="p-ready-to-wear"
                    >
                      {row.name}
                    </p>
                  </NavLink>
                  <br />

                  <div style={{ fontWeight: "bold", fontSize: "18px" }}>
                    PKR. {row.price}
                  </div>
                </div>
              ))}
            </StyleRoot>
          </div>
          <br />
          <br />
          <Fab
            color="secondary"
            aria-label="add"
            style={{ height: "40px", width: "40px", fontSize: "2px" }}
            onClick={this.previousClick}
          >
            <ArrowLeft />
          </Fab>
          <Button
            color="primary"
            variant="contained"
            style={{ marginLeft: "10px" }}
          >
            {this.state.count}
          </Button>
          <Fab
            color="secondary"
            aria-label="add"
            style={{
              height: "40px",
              width: "40px",
              fontSize: "2px",
              marginLeft: "10px"
            }}
            onClick={this.nextClick}
          >
            <ArrowRight />
          </Fab>
          <br />
          <br />
          <br />
        </Container>
      </div>
    );
  }
}
