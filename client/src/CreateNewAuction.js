import React, { Component } from 'react';
import Navbar from './Navbar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './theme'
import './form.css'
import Web3 from 'web3';
const BidKaroNaContract = require("./contracts/BidKaroNa.json")

export default class CreateNewAuction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      'title':'',
      'asset_addr': '',
      'reserved_price':'',
      'selectedDate': new Date()
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }


  createAuction = async () => {
    const web3 = new Web3(window.ethereum);
    // console.log(BidKaroNaContract)
    const assetAddress = this.state.asset_addr
    const time = Date.parse(this.state.selectedDate)/1000
    const price = this.state.reserved_price
    const title = this.state.title

    let networkId = Object.keys(BidKaroNaContract.networks)[0]
    const BidKaroNa = new web3.eth.Contract(BidKaroNaContract.abi, BidKaroNaContract.networks[networkId].address);
    await window.ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    // console.log(accounts)
    if (price >= 0) {
        const result = BidKaroNa.methods.createAuction(assetAddress, price, time, title).send({ from: account });
        result.then((val) => {
        if ("auctionCreated" in val.events) {
            window.alert("Auction created successfully. Your auction Id is : " + val.events.auctionCreated.returnValues.auctionId)
            window.location.reload("/runningAuctions")
        } else if ("LogFailure" in val.events) {
            window.alert("Auction creation failed. " + val.events.LogFailure.returnValues.log)
        } else {
            window.alert("Something went wrong")
        }
        }).catch((err) => {
            window.alert("Something went wrong")
            console.log(err)
        })
    }
    else {
        window.alert("Negative Price isn't allowed")
    }
    
  }

  handleDateChange = (date) => {
    date.setHours(23,59)
    this.setState({
      selectedDate: date
    });
  }

  componentDidMount() {
    let date = new Date()
    date.setHours(23,59)
    this.setState({
      selectedDate: date
    })
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
                <h3>Create New Auction</h3>
                <TextField
                  variant="outlined"
                  label = "Auction Title"
                  type = "text"
                  name = "title"
                  style = {{"width" : "60%", "margin":"10px"}}
                  placeholder = "Enter Auction Title"
                  value = {this.state.title}
                  onChange = {this.handleInputChange}
                  required
                />
                <br/>
                <TextField
                  variant="outlined"
                  label = "Asset Address"
                  type = "text"
                  name = "asset_addr"
                  style = {{"width" : "60%", "margin":"10px"}}
                  placeholder = "Enter Address of the asset you wish to sell"
                  value = {this.state.asset_addr}
                  onChange = {this.handleInputChange}
                  required
                />
                <br/>
                <TextField
                  variant="outlined"
                  label = "Reserved Price"
                  type = "number"
                  name = "reserved_price"
                  style = {{"width" : "60%", "margin":"10px"}}
                  placeholder = "Enter Reserved Price in Ethers"
                  value = {this.state.reserved_price}
                  onChange = {this.handleInputChange}
                  required
                />
                <br/>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    clearable
                    value={this.state.selectedDate}
                    label = "Select deadline for the auction"
                    onChange={date => this.handleDateChange(date)}
                    minDate={new Date()}
                    format="dd/MM/yyyy"
                    style = {{"width" : "40%", "margin":"10px"}}
                  />
                </MuiPickersUtilsProvider>
                <br/>
                <br/>
                <Button variant = "contained" style = {{'color' : '#FFFFFF', 'background' : '#006064'}} onClick = {this.createAuction}>Create Auction</Button>
                <br/>
                <br/>

              </form>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}
