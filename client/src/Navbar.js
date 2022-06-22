import React from 'react';
import { getAuth, signOut } from '@firebase/auth';
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
    background: '#00008B'
  },
  menuBar: {
    flexGrow: 1,
    background: '#0000FF'
  }
}));

export default function Navbar(props) {

  const history = props.history
  const auth = getAuth();
  const user = auth.currentUser;
  const goHome  = () => {
    history.push("/")
  }

  const logout = () => {
    signOut(auth)
        .then(() => {
            localStorage.removeItem('token')
            history.push("/")
        })
        .catch((e) => alert(e.message))
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

  const createContract = () => {
    history.push("/createContract")
  }

  const runningContracts = () => {
    history.push("/runningContracts")
  }

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.titleBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            D-KISAN
          </Typography>
          <Typography variant="h8" className={classes.subtitle}>
            Making agriculture a profitable business
          </Typography>
        </Toolbar>
      </AppBar>

      <AppBar position="static" className={classes.menuBar}>
        <Toolbar>
          <Button color="inherit" onClick = {goHome}>Home</Button>
          <Button color="inherit" onClick = {createAuction}>Create New Auction</Button>
          <Button color="inherit" onClick = {runningAuctions}>View Running Auctions</Button>
          <Button color="inherit" onClick = {createAsset}>Create Asset</Button>
          <Button color="inherit" onClick = {createContract}>Create Contract</Button>
          <Button color="inherit" onClick = {runningContracts}>View Contracts</Button>
          <Button color="inherit" onClick = {logout}>Logout</Button>
          
        </Toolbar>
      </AppBar>

    </div>
  );
}
