import React, { Component } from 'react';
import Navbar from './Navbar';
import Web3 from 'web3';
import theme from './theme'
import { ThemeProvider } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
const BidKaroNaContract = require("./contracts/BidKaroNa.json")

export default class PlaceBid extends Component {
  constructor(props) {
    super(props)
    this.state = {
        auctionDetails: 0,
        currentBid: 0
    };
  }

  async componentDidMount() {
    const web3 = new Web3(window.ethereum);
    let networkId = Object.keys(BidKaroNaContract.networks)[0]
    const BidKaroNa = new web3.eth.Contract(BidKaroNaContract.abi, BidKaroNaContract.networks[networkId].address);
    const auctionId = new URLSearchParams(this.props.location.search).get("id")
    const auctionDetails = await BidKaroNa.methods.getAuctionDetails(auctionId).call();
    var d = new Date(auctionDetails[3] * 1000)
    auctionDetails[3] = d.toDateString()
    this.setState({
        auctionDetails: auctionDetails
    })
    console.log(BidKaroNa.methods)
  }

  placeBid = async () => {
    const web3 = new Web3(window.ethereum);
    let networkId = Object.keys(BidKaroNaContract.networks)[0]
    const BidKaroNa = new web3.eth.Contract(BidKaroNaContract.abi, BidKaroNaContract.networks[networkId].address);
    await window.ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    const auctionId = new URLSearchParams(this.props.location.search).get("id");
    var etherAmount = web3.utils.toBN(12);
    var weiValue = web3.utils.toWei(etherAmount, 'ether');
    const result = BidKaroNa.methods.placeBid(auctionId).send({
        from: account,
        value: weiValue
    });
    console.log(result);
  }

  render() {
    return (
      <ThemeProvider theme = {theme}>
        <div>
        <Navbar
        history = {this.props.history}/>
        <br/>
            <div style = {{"textAlign" : "center",'color' : '#006064'}}>
                <form className="form">
                    <h3>Auction Details</h3>
                    <p>Auction Title: {this.state.auctionDetails[2]}</p>
                    <p>Seller Address: {this.state.auctionDetails[0]}</p>
                    <p>Asset Address: {this.state.auctionDetails[1]}</p>
                    <p>Deadline: {this.state.auctionDetails[3]}</p>
                    <p>Reserve Price: {this.state.auctionDetails[4]}</p>
                    {/* <Button 
                        variant = "contained" 
                        style = {{'color' : '#FFFFFF', 'background' : '#006064'}} 
                        onClick = {this.changeActiveStatus}
                    > {this.state.auctionDetails[5] === "1" ? "Activate" : "Deactivate"}
                    </Button>
                    <br />
                    <br /> */}
                    <Button 
                        variant = "contained" 
                        style = {{'color' : '#FFFFFF', 'background' : '#006064'}} 
                        onClick = {this.placeBid}
                    > Place Bid
                    </Button>
                    <br />
                    <br />
                </form>
            </div>
        </div>
      </ThemeProvider>
    );
  }
}
