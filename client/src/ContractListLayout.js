import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#eceff1',
    borderRadius: '20px',
    width: 'inline',
    margin : '10px',
    height : '360px',
    padding: '10px',
    color: '#455A64',
    textAlign : 'left'
  },

}));

export default function ContractListLayout(props) {
    const history = props.history;
    const placeBid  = () => {
      //history.push("/placeBid?id=" + props.auction.id);
    }
    const classes = useStyles();
    let auction = props.econtract
    let date = new Date(0)
    date.setUTCSeconds(auction[6])
    return (
      <div className={classes.root}>
        <h3><u>Contract Number:</u> {props.econtract.id}</h3>
        <p><u>Asset Address:</u> {auction[0]}</p>
        <p><u>Party 1:</u> {auction[1]}</p>
        <p><u>Party 2:</u> {auction[2]}</p>
        <p><u>Crop:</u> {auction[3]}</p>
        <p><u>Crop details:</u> {auction[4]}</p>
        <p><u>Price:</u> {auction[5]}</p>
        <p><u>Deadline:</u> {date.toString()}</p>
        
      </div>
    );
  }