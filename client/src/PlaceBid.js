import React, { Component } from 'react';
import Navbar from './Navbar';
import Web3 from 'web3';
const BidKaroNaContract = require("./contracts/BidKaroNa.json")

export default class PlaceBid extends Component {
  constructor(props) {
    super(props)
    this.state = {
        auctionDetails: 0
    };
  }

  async componentDidMount() {
    const web3 = new Web3(window.ethereum);
    let networkId = Object.keys(BidKaroNaContract.networks)[0]
    const BidKaroNa = new web3.eth.Contract(BidKaroNaContract.abi, BidKaroNaContract.networks[networkId].address);
    const auctionId = new URLSearchParams(this.props.location.search).get("id")
    const auctionDetails = await BidKaroNa.methods.getAuctionDetails(auctionId).call();
    this.setState({
        auctionDetails: auctionDetails
    })    
  }
  render() {
    return (
      <div>
      <Navbar
      history = {this.props.history}/>
      <br/>
      <p>Place Bid</p>
      <p>NEEL ye dekh auction details!!</p>
      <p>{this.state.auctionDetails[0]}</p>
      <p>{this.state.auctionDetails[1]}</p>
      <p>{this.state.auctionDetails[2]}</p>
      <p>{this.state.auctionDetails[4]}</p>
      <p>{this.state.auctionDetails[5]}</p>
      </div>
    );
  }
}
