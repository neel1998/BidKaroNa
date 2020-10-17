import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#eceff1',
    borderRadius: '20px',
    width: 'inline',
    margin : '10px',
    height : '200px',
    padding: '10px',
    color: '#455A64',
    textAlign : 'left'
  },

}));

export default function AuctionListLayout(props) {

  const classes = useStyles();
  let auction = props.auction
  let date = new Date(0)
  date.setUTCSeconds(auction[3])
  return (
    <div className={classes.root}>
      <h3><u>Auction Title:</u> {auction[2]}</h3>
      <p><u>Asset Address:</u> {auction[1]}</p>
      <p><u>Reserved Price:</u> {auction[4]}</p>
      <p><u>Deadline:</u> {date.toString()}</p>
      <p><u>Status:</u> {auction[5] === 0 ? "Active" : "Inactive"}</p>
    </div>
  );
}
