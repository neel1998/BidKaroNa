import React, { Component } from 'react';
import Navbar from './Navbar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './theme'
import './form.css'
import Web3 from 'web3';
const AssetContract = require("./contracts/Asset.json")

export default class CreateAsset extends Component {
  constructor(props) {
    super(props)
    this.state = {
        "description": ""
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }


  createAsset = async () => {
    const web3 = new Web3(window.ethereum);
    const assetContract = new web3.eth.Contract(AssetContract.abi);
    await window.ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    assetContract.deploy({
      data: AssetContract.bytecode,
      arguments: [this.state.description]
    })
    .send({
      from : account
    }).then((instance) => {
        console.log("successfully deployed ", instance.options.address)
        alert("New Asset Created successfully. Please copy the following asset address: " + instance.options.address)
        window.location.reload()
    }).catch((err) => {
        alert("Something went wrong")
        console.log(err)
    })
  }


  componentDidMount() {

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
                <h3>Create New Asset</h3>
                <TextField
                  variant="outlined"
                  label = "Asset Description"
                  type = "text"
                  name = "description"
                  style = {{"width" : "60%", "margin":"10px"}}
                  placeholder = "Enter Asset Description"
                  value = {this.state.description}
                  onChange = {this.handleInputChange}
                  required
                />
                <br/>
                <br/>
                <Button variant = "contained" style = {{'color' : '#FFFFFF', 'background' : '#006064'}} onClick = {this.createAsset}>Create Asset</Button>
                <br/>
                <br/>

              </form>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}
