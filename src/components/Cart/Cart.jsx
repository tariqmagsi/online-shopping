import React, { Component } from "react";
import "tachyons";
import { Container } from "@material-ui/core";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import CartTable from "./CartTable";
import { getFromStorage, setInStorage } from "../../utils/storage";

export default class Cart extends Component {
  state = {
    array: [],
    position: 0,
    flag: false,
    newArray: [],
    products: []
  };
  fetchData = () => {
    this.state.array.map(item =>
      fetch("/products/myproduct/" + item._id)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState(
              {
                newArray: this.state.newArray.concat({
                  _id: item._id,
                  quantity: item.quantity,
                  size: item.size,
                  name: json.product.name,
                  price: json.product.price,
                  category: json.product.category,
                  subcategory: json.product.subcategory,
                  product_id: item.product_id
                }),
                products: this.state.products.concat({
                  product_id: item._id,
                  quantity: item.quantity,
                  size: item.size,
                  product_name: json.product.name,
                  price: json.product.price,
                  category: json.product.category,
                  subcategory: json.product.subcategory
                })
              },
              () => {
                setInStorage("details", this.state.newArray);
                setInStorage("mongo_products", this.state.products);
              }
            );
          }
        })
    );
  };

  componentDidMount() {
    this.setState(
      { array: getFromStorage("products") ? getFromStorage("products") : [] },
      () => this.fetchData()
    );
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
    return (
      <div
        style={{
          textAlign: "center",
          minWidth: "301px",
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
            Shopping Cart
          </h1>
        </div>
        <br />
        <Breadcrumb name="Shopping Cart" />
        <br />
        <br />
        <Container>
          <CartTable arr={this.state.newArray} />
          <br />
          <br />
          <br />
        </Container>
      </div>
    );
  }
}
