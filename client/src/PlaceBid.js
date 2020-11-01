import React, { Component } from 'react';
import Navbar from './Navbar';
import Web3 from 'web3';
import theme from './theme'
import { ThemeProvider } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
const BidKaroNaContract = require("./contracts/BidKaroNa.json")

export default class PlaceBid extends Component {
  constructor(props) {
    super(props)
    this.state = {
        auctionDetails: 0,
        currentBid: 0,
        bidPrice: ''
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  async componentDidMount() {
    const web3 = new Web3(window.ethereum);
    let networkId = Object.keys(BidKaroNaContract.networks)[0]
    const BidKaroNa = new web3.eth.Contract(BidKaroNaContract.abi, BidKaroNaContract.networks[networkId].address);
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    const auctionId = new URLSearchParams(this.props.location.search).get("id")
    const auctionDetails = await BidKaroNa.methods.getAuctionDetails(auctionId).call();
    var d = new Date(auctionDetails[3] * 1000)
    auctionDetails[3] = d.toDateString()
    this.setState({
        auctionDetails: auctionDetails
    })
    const currentBid = await BidKaroNa.methods.getRefundDetails(auctionId, account).call();
    this.setState({
        currentBid: currentBid
    })
  }

  placeBid = async () => {
    const web3 = new Web3(window.ethereum);
    let networkId = Object.keys(BidKaroNaContract.networks)[0]
    const BidKaroNa = new web3.eth.Contract(BidKaroNaContract.abi, BidKaroNaContract.networks[networkId].address);
    await window.ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    const auctionId = new URLSearchParams(this.props.location.search).get("id");
    const price = this.state.bidPrice;
    if (price < 0) {
        window.alert("Negative Price isn't allowed")
        return;
    }
    const result = BidKaroNa.methods.placeBid(auctionId).send({
        from: account,
        value: price
    });
    result.then((val) => {
        if ("bidPlaced" in val.events) {
            console.log(val);
            window.alert("Bid placed successfully")
            window.location.reload()
        } else if ("LogFailure" in val.events) {
            window.alert("Bid Placing failed. " + val.events.LogFailure.returnValues.log)
        } else {
            window.alert("Something went wrong")
        }
    }).catch((err) => {
        window.alert("Something went wrong")
        console.log(err)
    })
  }

  endAuction = async () => {
    const web3 = new Web3(window.ethereum);
    let networkId = Object.keys(BidKaroNaContract.networks)[0]
    const BidKaroNa = new web3.eth.Contract(BidKaroNaContract.abi, BidKaroNaContract.networks[networkId].address);
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    const auctionId = new URLSearchParams(this.props.location.search).get("id");
    const result = await BidKaroNa.methods.endAuction(auctionId).send({ from: account });
    console.log(result.events);
    if ("auctionEnded" in result.events) {
        window.alert("Auction ended successfully")
        window.location.reload()
    } else if ("LogFailure" in result.events) {
        window.alert("End Auction failed. " + result.events.LogFailure.returnValues.log)
    } else {
        window.alert("Something went wrong")
    }
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
                    <p>Reserve Price: {this.state.auctionDetails[4] + " wei"}</p>
                    <p>Current Bid: {this.state.currentBid[0] === false ? "Not Placed" : this.state.currentBid[1] + " wei"}</p>
                    <TextField
                        variant="outlined"
                        label = "Bid Amount"
                        type = "number"
                        name = "bidPrice"
                        style = {{"width" : "40%", "margin-right" : "20px"}}
                        placeholder = {this.state.currentBid[0] === false ? 
                            "Enter amount of wei you want to bid" :
                            "Enter additional amount of wei you want to bid"
                        }
                        value = {this.state.bidPrice}
                        onChange = {this.handleInputChange}
                    />
                    <Button 
                        variant = "contained" 
                        style = {{'color' : '#FFFFFF', 'background' : '#006064', "margin-top" : "8px"}} 
                        onClick = {this.placeBid}
                    > Place Bid
                    </Button>
                    <br />
                    <br />
                    <Button 
                        variant = "contained" 
                        style = {{'color' : '#FFFFFF', 'background' : '#006064', "margin-top" : "8px"}} 
                        onClick = {this.endAuction}
                    > End Auction
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
