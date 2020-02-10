import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {
  LocalParkingRounded,
  VerifiedUser,
  Cancel,
  DoneAll,
  SupervisedUserCircle
} from "@material-ui/icons";
import Product from "./Products/Product";
import { Container } from "@material-ui/core";
import Logout from "./Logout";
import PendingTable from "./PendingOrders/PendingOrders";
import DelieveredTable from "./Delivered/DeliveredOrders";
import ChangePass from "./ChangePass/ChangePass";
import ChangeKey from "./Key/Key";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));

export default function ScrollableTabsButtonForce() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab
            label="Products"
            icon={<LocalParkingRounded />}
            {...a11yProps(0)}
          />
          <Tab label="Pending Orders" icon={<Cancel />} {...a11yProps(1)} />
          <Tab label="Delivered Orders" icon={<DoneAll />} {...a11yProps(2)} />
          <Tab
            label="Change Password"
            icon={<SupervisedUserCircle />}
            {...a11yProps(3)}
          />
          <Tab
            label="Change Secret Key"
            icon={<SupervisedUserCircle />}
            {...a11yProps(4)}
          />
          <Tab label="Logout" icon={<VerifiedUser />} {...a11yProps(5)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <Container>
          <h1 style={{ textAlign: "center" }}>Products</h1>
          <Product />
        </Container>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Container>
          <h1 style={{ textAlign: "center" }}>Pending Orders</h1>
          <PendingTable />
        </Container>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Container>
          <h1 style={{ textAlign: "center" }}>Delivered Orders</h1>
          <DelieveredTable />
        </Container>
      </TabPanel>

      <TabPanel value={value} index={3}>
        <h1 style={{ textAlign: "center" }}>Edit Profile</h1>
        <ChangePass />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Container>
          <h1 style={{ textAlign: "center" }}>Change Secret Key</h1>
          <ChangeKey />
        </Container>
      </TabPanel>
      <TabPanel value={value} index={5}>
        <h1 style={{ textAlign: "center" }}>Logout</h1>
        <Logout />
      </TabPanel>
    </div>
  );
}
