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
                <h3>What is D-Kisan?</h3>
                <p>D-Kisan is a Blockchain based auction and contractual selling and buying platform for farmers and traders</p>
                <p>This system will allow farmers to conduct online auction in a complete decentralized manner without relying on any central auction service</p>
                <p>This system will also help farmers in performing contractual farming with the help of our decentralized e-contract feature</p>
              </div>
            </div>
            <div style = {{'position' : 'absolute', 'bottom': '10px', 'width' : '100%'}}>
              <hr style = {{'width' : '70%'}}/>
              <p style = {{'display' : 'inline-block'}}> <a href="/team" style = {{'color' : '#006064'}}>The Team</a> </p>
            </div>
          </ThemeProvider>
      </div>
    );
  }
}
