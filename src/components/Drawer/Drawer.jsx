import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import { Menu } from "@material-ui/icons";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
});

export default function SwipeableTemporaryDrawer(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
      style={{
        backgroundColor: "black",
        color: "white",
        height: "100vh"
      }}
    >
      <h1 style={{ textAlign: "center", textTransform: "uppercase" }}>
        Navigation
      </h1>
      <Divider style={{ color: "white" }} />
      <List>
        {[
          "READY TO WEAR(TWO PIECE)",
          "READY TO WEAR(THREE PIECE)",
          "UNSTITCHED(TWO PIECE)",
          "UNSTITCHED(THREE PIECE)",
          "FORMAL WEAR",
          "TRENDING NOW"
        ].map((text, index) => (
          <NavLink
            to={
              index === 0
                ? "/ReadyToWear/TwoPiece"
                : index === 1
                ? "/ReadyToWear/ThreePiece"
                : index === 2
                ? "/Unstitched/TwoPiece"
                : index === 3
                ? "/Unstitched/ThreePiece"
                : index === 4
                ? "/FormalWear"
                : "/TrendingNow"
            }
            style={{ textDecoration: "none", color: "white" }}
            activeStyle={{ color: "rgb(248, 70, 70)" }}
            key={text}
          >
            <ListItem button>
              <ListItemIcon style={{ color: "white" }} className="drawer-list">
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={text} className="drawer-list" />
            </ListItem>
          </NavLink>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <Button onClick={toggleDrawer("left", true)}>
        <Menu
          style={{
            color: props.flag ? "white" : props.flag1 ? "white" : "white"
          }}
        />
      </Button>

      <SwipeableDrawer
        open={state.left}
        onClose={toggleDrawer("left", false)}
        onOpen={toggleDrawer("left", true)}
      >
        {sideList("left")}
      </SwipeableDrawer>
    </div>
  );
}
