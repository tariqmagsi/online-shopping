import React, { Component } from "react";
import pic1 from "../../images/1.jpg";
import "tachyons";
import { Container } from "@material-ui/core";
import Radium, { StyleRoot } from "radium";
import { zoomIn, slideInLeft } from "react-animations";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import slideInUp from "react-animations/lib/slide-in-up";
import slideInRight from "react-animations/lib/slide-in-right";
import slideInDown from "react-animations/lib/slide-in-down";

class Home extends Component {
  state = {
    array: [
      {
        name1: "READY TO WEAR",
        name2: "FORMAL WEAR",
        name3: "SEMI FORMAL"
      },
      {
        name1: "BASICS",
        name2: "BRIDAL COLLECTION",
        name3: "TRENDING NOW"
      }
    ],
    position: 0,
    flag: false
  };

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
    if (scrolled >= 60) {
      this.setState({ flag: true });
    }
    this.setState({
      position: scrolled
    });
  };
  render() {
    const styles = {
      zoomIn: {
        animation: "x 1s",
        animationName: Radium.keyframes(zoomIn, "fadeIn")
      },
      slideInLeft: {
        animation: "x 1s",
        animationName: Radium.keyframes(slideInLeft, "fadeIn")
      },
      slideInDown: {
        animation: "x 1s",
        animationName: Radium.keyframes(slideInDown, "slideInDown")
      },
      slideInRight: {
        animation: "x 1s",
        animationName: Radium.keyframes(slideInRight, "slideInRight")
      },
      slideInUp: {
        animation: "x 1s",
        animationName: Radium.keyframes(slideInUp, "slideInUp")
      }
    };
    if (this.state.flag)
      return (
        <div>
          <div style={{ textAlign: "center" }}>
            <StyleRoot style={styles.zoomIn}>
              <h1
                style={{
                  textAlign: "center"
                }}
                className="home"
              >
                SHOP OUR FEED NOW
              </h1>
            </StyleRoot>
            <br />
            <Container>
              <div
                style={{
                  width: "100%",
                  paddingBottom: "1300px"
                }}
                className="pad-set-home"
              >
                {" "}
                <MDBContainer>
                  {this.state.array.map(item => (
                    <MDBRow key={item.name1}>
                      <MDBCol>
                        <StyleRoot style={styles.slideInLeft}>
                          <div
                            className="hovereffect hovereffect-width-l"
                            style={{
                              width: "350px",
                              marginTop: "50px",
                              marginLeft: "30px"
                            }}
                          >
                            <img
                              className="img-responsive-l img-responsive-width-l"
                              src={pic1}
                              alt=""
                              style={{
                                height: "500px",
                                width: "360px"
                              }}
                            />

                            <div className="overlay">
                              <h2>{item.name1}</h2>
                            </div>
                          </div>
                        </StyleRoot>
                      </MDBCol>
                      <MDBCol>
                        <StyleRoot style={styles.zoomIn}>
                          <div
                            className="hovereffect hovereffect-width"
                            style={{
                              marginLeft: "30px",
                              width: "400px",
                              marginTop: "20px"
                            }}
                          >
                            <img
                              className="img-responsive img-responsive-width"
                              src={pic1}
                              alt=""
                              style={{
                                height: "550px",
                                width: "410px"
                              }}
                            />
                            <div className="overlay">
                              <h2>{item.name2}</h2>
                            </div>
                          </div>
                        </StyleRoot>
                      </MDBCol>
                      <MDBCol>
                        <StyleRoot style={styles.slideInRight}>
                          <div
                            className="hovereffect hovereffect-width-l"
                            style={{
                              marginLeft: "30px",
                              width: "350px",
                              marginTop: "50px"
                            }}
                          >
                            <img
                              className="img-responsive-l img-responsive-width-l"
                              src={pic1}
                              alt=""
                              style={{
                                height: "500px",
                                width: "360px"
                              }}
                            />
                            <div className="overlay">
                              <h2>{item.name3}</h2>
                            </div>
                          </div>
                        </StyleRoot>
                      </MDBCol>
                      <MDBCol>
                        <div
                          className="hovereffect hovereffect-width-l new-top"
                          style={{
                            marginLeft: "30px",
                            width: "350px",
                            marginTop: "50px"
                          }}
                        ></div>
                      </MDBCol>
                    </MDBRow>
                  ))}
                </MDBContainer>
              </div>
            </Container>
          </div>
        </div>
      );
    return <div style={{ height: "100vh" }}></div>;
  }
}
export default Home;
