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
        'name_party1':'',
        'name_party2': '',
        'crop_name':'',
        'Details':'',
        'crop_price':'',
        'Duration': new Date(),
        'sign_party1':'',
        'sign_party2':''
      };
    }

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
          [name]: value
        });
      }
    
    
      handleDateChange = (date) => {
        date.setHours(23,59)
        this.setState({
          selectedDate: date
        });
      }

      createContract = async () => {

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
              
              <div style = {{"textAlign" : "center",'color' : '#006064'}}>
                  <form className="form">
                    <h3>Create a contract</h3>
                    <TextField
                      variant="outlined"
                      label = "Name party 1"
                      type = "text"
                      name = "title"
                      style = {{"width" : "60%", "margin":"10px"}}
                      placeholder = "Enter name of party 1"
                      value = {this.state.name_party1}
                      onChange = {this.handleInputChange}
                      required
                    />
                  
                    <TextField
                      variant="outlined"
                      label = "Name party 2"
                      type = "text"
                      name = "name_party2"
                      style = {{"width" : "60%", "margin":"10px"}}
                      placeholder = "Enter the name of party 2"
                      value = {this.state.name_party2}
                      onChange = {this.handleInputChange}
                      required
                    />
                    <br/>
                    <TextField
                      variant="outlined"
                      label = "Crop name"
                      type = "text"
                      name = "crop_name"
                      style = {{"width" : "60%", "margin":"10px"}}
                      placeholder = "Enter the name of crop"
                      value = {this.state.crop_name}
                      onChange = {this.handleInputChange}
                      required
                    />
                    
                    <TextField
                      variant="outlined"
                      label = "Crop details"
                      type = "text"
                      name = "crop_details"
                      style = {{"width" : "60%", "margin":"10px"}}
                      placeholder = "Enter the crop details"
                      value = {this.state.Details}
                      onChange = {this.handleInputChange}
                      required
                    />
                    
                    <TextField
                      variant="outlined"
                      label = "Crop price"
                      type = "number"
                      name = "crop_price"
                      style = {{"width" : "60%", "margin":"10px"}}
                      placeholder = "Enter Crop Price in Rupees"
                      value = {this.state.crop_price}
                      onChange = {this.handleInputChange}
                      required
                    />
                    
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        clearable
                        value={this.state.selectedDate}
                        label = "Select deadline for the crop delivery"
                        onChange={date => this.handleDateChange(date)}
                        minDate={new Date()}
                        format="dd/MM/yyyy"
                        style = {{"width" : "40%", "margin":"10px"}}
                      />
                    </MuiPickersUtilsProvider>
                    <br/>
                    <br/>
                    <Button variant = "contained" style = {{'color' : '#FFFFFF', 'background' : '#006064'}} onClick = {this.createContract}>Create Contract</Button>
                    <br/>
                    <br/>
    
                  </form>
              </div>
            </div>
          </ThemeProvider>
        );
      }
    }
    