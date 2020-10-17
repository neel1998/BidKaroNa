import React, { Component } from 'react';
import Navbar from './Navbar';
import Web3 from 'web3';
import AuctionListLayout from './AuctionListLayout'
const BidKaroNaContract = require("./contracts/BidKaroNa.json")

export default class RunningAuctions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      auctionList : []
    };
  }



  async componentDidMount() {
    const web3 = new Web3(window.ethereum);
    let networkId = Object.keys(BidKaroNaContract.networks)[0]
    const BidKaroNa = new web3.eth.Contract(BidKaroNaContract.abi, BidKaroNaContract.networks[networkId].address);
    var totalAuctions = await BidKaroNa.methods.getAuctionsLength().call();

    new Promise(async function(res, rej) {
      var auctionList = []
      for (let i = 0; i < totalAuctions; i ++) {
        let auction = await BidKaroNa.methods.getAuctionDetails(i).call();
        // console.log(auction)
        auctionList.push(<AuctionListLayout
          auction = {auction}/>)
      }
      res(auctionList)
    }).then((auctions) => {
      this.setState({
        auctionList : auctions
      })
    })


  }
  render() {
    return (
      <div>
      <Navbar
      history = {this.props.history}/>
      <br/>
      <p>List of running auctions</p>
      {this.state.auctionList}
      </div>
    );
  }
}
