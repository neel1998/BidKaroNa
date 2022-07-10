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
    background: '#43A6C6'
  },
  menuBar: {
    flexGrow: 1,
    background: '#67B7D1'
  }
}));

export default function Navbar(props) {

  const history = props.history
  const auth = getAuth();
  const user = auth.currentUser;
  const goHome  = () => {
    history.push("/home")
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

  const price = () => {
    history.push("/cropPrice")
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
          <Typography variant="h6" className={classes.title} style={{color:"black"}}>
            D-KISAN
          </Typography>
          <Typography variant="h8" className={classes.subtitle} style={{color:"black"}}>
            Making agriculture a profitable business
          </Typography>
        </Toolbar>
      </AppBar>

      <AppBar position="static" className={classes.menuBar}>
        <Toolbar>
          <Button color="black" onClick = {goHome}>Home</Button>
          <Button color="black" onClick = {createAuction}>Create New Auction</Button>
          <Button color="black" onClick = {runningAuctions}>View Running Auctions</Button>
          <Button color="black" onClick = {createAsset}>Create Asset</Button>
          <Button color="black" onClick = {createContract}>Create Contract</Button>
          <Button color="black" onClick = {runningContracts}>View Contracts</Button>
          <Button color="black" onClick = {price}>Crop price</Button>       
          <Button color="black" onClick = {logout}>Logout</Button>
          
        </Toolbar>
      </AppBar>

    </div>
  );
}
