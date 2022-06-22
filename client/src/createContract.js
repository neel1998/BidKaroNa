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
const Econtract = require("./contracts/Econtract.json")

export default class CreateNewContract extends Component {
  constructor(props) {
    const address = localStorage.getItem('address');
    super(props)
    this.state = {
      'name_party1': '',
      'name_party2': '',
      'asset_addr':address,
      'crop_name': '',
      'Details': '',
      'crop_price': '',
      'Duration': new Date(),
      'sign_party1': '',
      'sign_party2': ''
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }


  createContract = async () => {
    const web3 = new Web3(window.ethereum);
    console.log(Econtract);
    const assetAddress = this.state.asset_addr
    const time = Date.parse(this.state.Duration)/1000
    const party1 = this.state.name_party1
    const party2 = this.state.name_party2
    const crop_name = this.state.crop_name
    const crop_details = this.state.Details
    const price = this.state.crop_price

    console.log(Econtract.networks);

    let networkId = Object.keys(Econtract.networks)[0];
    console.log(networkId);
    const econtract = new web3.eth.Contract(Econtract.abi,Econtract.networks[networkId].address);
    await window.ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    if (price >= 0) {
      console.log("Time:"+time);
      const result = econtract.methods.createContract(assetAddress,party1,party2,crop_name,crop_details, price, time).send({ from: account });
      result.then((val) => {
      if ("contractCreated" in val.events) {
          window.alert("Contract created successfully. Your contract Id is : " + val.events.contractCreated.returnValues.contractId);
          window.location.reload("/runningAuctions")
      } else if ("LogFailure" in val.events) {
          window.alert("Contract creation failed. " + val.events.LogFailure.returnValues.log)
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
      Duration: date
    });
  }

  componentDidMount() {
    let date = new Date()
    date.setHours(23,59)
    this.setState({
      Duration: date
    })
  }


  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <Navbar
            history={this.props.history} />

          <div style={{ "textAlign": "center", 'color': '#006064' }}>
            <form className="form">
              <h3>Create a contract</h3>
              <TextField
                variant="outlined"
                label="Name party 1"
                type="text"
                name="name_party1"
                style={{ "width": "60%", "margin": "10px" }}
                placeholder="Enter name of party 1"
                value={this.state.name_party1}
                onChange={this.handleInputChange}
                required
              />

              <TextField
                variant="outlined"
                label="Name party 2"
                type="text"
                name="name_party2"
                style={{ "width": "60%", "margin": "10px" }}
                placeholder="Enter the name of party 2"
                value={this.state.name_party2}
                onChange={this.handleInputChange}
                required
              />
              <TextField
                variant="outlined"
                label="Asset Address"
                type="text"
                name="asset_addr"
                style={{ "width": "60%", "margin": "10px" }}
                placeholder="Enter Address of the asset you wish to sell"
                value={this.state.asset_addr}
                onChange={this.handleInputChange}
                required
              />
              <br />
              <TextField
                variant="outlined"
                label="Crop name"
                type="text"
                name="crop_name"
                style={{ "width": "60%", "margin": "10px" }}
                placeholder="Enter the name of crop"
                value={this.state.crop_name}
                onChange={this.handleInputChange}
                required
              />

              <TextField
                variant="outlined"
                label="Crop details"
                type="text"
                name="Details"
                style={{ "width": "60%", "margin": "10px" }}
                placeholder="Enter the crop details"
                value={this.state.Details}
                onChange={this.handleInputChange}
                required
              />

              <TextField
                variant="outlined"
                label="Crop price"
                type="number"
                name="crop_price"
                style={{ "width": "60%", "margin": "10px" }}
                placeholder="Enter Crop Price in Rupees"
                value={this.state.crop_price}
                onChange={this.handleInputChange}
                required
              />

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  clearable
                  value={this.state.Duration}
                  label="Select deadline for the crop delivery"
                  onChange={date => this.handleDateChange(date)}
                  minDate={new Date()}
                  format="dd/MM/yyyy"
                  style={{ "width": "40%", "margin": "10px" }}
                />
              </MuiPickersUtilsProvider>
              <br />
              <br />
              <Button variant="contained" style={{ 'color': '#FFFFFF', 'background': '#006064' }} onClick={this.createContract}>Create Contract</Button>
              <br />
              <br />

            </form>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}
