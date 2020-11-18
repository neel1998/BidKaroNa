import React, { Component } from 'react';
import Navbar from './Navbar';
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './theme'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
    };
  }

  async componentDidMount() {
    // let networkId = Object.keys(BidKaroNaContract.networks)[0]
  }
  render() {
    return (
      <div>
          <ThemeProvider theme={theme}>
            <Navbar
              history = {this.props.history}/>
            <br/>
            <div>
              <div style = {{'width' : '95%', 'background' : '#f5f5f5', 'margin' : '10px', 'borderRadius' : '20px', 'padding' : '20px', 'textAlign' :'left', 'color' : '#006064'}}>
                <h3>What is BidKaroNa?</h3>
                <p>BidKaroNa is a Blockchain based auction system</p>
                <p>This system will allow sellers to conduct online auction in a complete decentralized manner without relying on any central auction service</p>
                <p>With the very minimalistic and simple user interface of BidKaroNa users can start their decentralized auctions almost immediately</p>
              </div>
            </div>
            <div style = {{'position' : 'absolute', 'bottom': '10px', 'width' : '100%'}}>
              <hr style = {{'width' : '70%'}}/>
              <p style = {{'display' : 'inline-block'}}> <a href="/team" style = {{'color' : '#006064'}}>The Team</a> </p>
              <p style = {{'display' : 'inline-block', 'marginLeft': '30px'}}> <a style = {{'color' : '#006064'}} href="https://github.com/neel1998/BidKaroNa">Github</a> </p>
            </div>
          </ThemeProvider>
      </div>
    );
  }
}
