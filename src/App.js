import React from "react";
import "./style/style.css";
import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ReadyToWear from "./components/ReadyToWear/ReadyToWear";
import HomeAll from "./components/Home/HomeAll";
import Unstitched from "./components/Unstitched/Unstitched";
import FormalWear from "./components/Formal Wear/FormalWear";
import TrendingNow from "./components/Trending Now/TrendingNow";
import Product from "./components/Product/Product";
import NavbarComponent from "./components/Width/WidthGet";
import Cart from "./components/Cart/Cart";
import Billing from "./components/Billing/Billing";
import Portal from "./components/AdminPortal/Portal";
import Account from "./components/Account/Account";
import UnstitchedThree from "./components/Unstitched/UnstitchedThree";
import ReadyToWearThree from "./components/ReadyToWear/ReadyToWearThree";
import ThankYou from "./components/Thankyou/Thankyou";

function App() {
  return (
    <div className="navbar" style={{ overflowX: "auto" }}>
      <Router>
        <Switch>
          <Route path="/" exact name="active">
            <NavbarComponent flag={true} flag1={false} />
            <HomeAll />
            <Footer flag={false} />
          </Route>
          <Route path="/ReadyToWear/TwoPiece" name="active" exact>
            <NavbarComponent flag={false} flag1={false} flag2="R" />
            <ReadyToWear />
            <Footer flag={false} />
          </Route>
          <Route path="/ReadyToWear/ThreePiece" name="active" exact>
            <NavbarComponent flag={false} flag1={false} flag2="R" />
            <ReadyToWearThree />
            <Footer flag={false} />
          </Route>
          <Route path="/Unstitched/TwoPiece" name="active" exact>
            <NavbarComponent flag={false} flag1={false} flag2="U" />
            <Unstitched />
            <Footer flag={false} />
          </Route>
          <Route path="/Unstitched/ThreePiece" name="active" exact>
            <NavbarComponent flag={false} flag1={false} flag2="U" />
            <UnstitchedThree />
            <Footer flag={false} />
          </Route>
          <Route path="/FormalWear" name="active">
            <NavbarComponent flag={false} flag1={false} flag2="F" />
            <FormalWear />
            <Footer flag={false} />
          </Route>
          <Route path="/TrendingNow" name="active">
            <NavbarComponent flag={false} flag1={false} flag2="T" />
            <TrendingNow />
            <Footer flag={false} />
          </Route>
          <Route path="/Product" name="active">
            <NavbarComponent flag={false} flag1={false} />
            <Product />
            <Footer flag={false} />
          </Route>
          <Route path="/Cart" name="active">
            <NavbarComponent flag={false} flag1={false} />
            <Cart />
            <Footer flag={false} />
          </Route>
          <Route path="/BillingInformation" name="active">
            <NavbarComponent flag={false} flag1={true} />
            <Billing />
            <Footer flag={true} />
          </Route>
          <Route path="/Portal" name="active">
            <Portal />
          </Route>
          <Route path="/Account" name="active">
            <Account />
          </Route>
        </Switch>
        <Route path="/Thankyou" exact>
          <NavbarComponent flag={false} flag1={false} />
          <ThankYou />
          <Footer flag={false} />
        </Route>
      </Router>
    </div>
  );
}

export default App;
