import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    // flexGrow: 1,
    // marginRight: 'auto'
  },
  subtitle: {
    marginLeft: 'auto'
  },
  titleBar: {
    flexGrow: 1,
    background: '#006064'
  },
  menuBar: {
    flexGrow: 1,
    background: '#78909C'
  }
}));

export default function Navbar(props) {

  const history = props.history
  const goHome  = () => {
    history.push("/")
  }

  const createAuction = () => {
    history.push("/createAuction")
  }

  const runningAuctions = () => {
    history.push("/runningAuctions")
  }

  const createAsset = () => {
    history.push("/createAsset")
  }

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.titleBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            BidKaroNa
          </Typography>
          <Typography variant="h8" className={classes.subtitle}>
            A Block-Chain based auction system
          </Typography>
        </Toolbar>
      </AppBar>

      <AppBar position="static" className={classes.menuBar}>
        <Toolbar>
          <Button color="inherit" onClick = {goHome}>Home</Button>
          <Button color="inherit" onClick = {createAuction}>Create New Auction</Button>
          <Button color="inherit" onClick = {runningAuctions}>View Running Auctions</Button>
          <Button color="inherit" onClick = {createAsset}>Create Asset</Button>
        </Toolbar>
      </AppBar>

    </div>
  );
}
