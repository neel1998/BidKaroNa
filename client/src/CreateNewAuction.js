import React, { Component } from 'react';
import Navbar from './Navbar';

export default class CreateNewAuction extends Component {
  constructor(props) {
    super(props)
    this.state = {
    };
  }

  componentDidMount() {
  }
  render() {
    return (
      <div>
      <Navbar
      history = {this.props.history}/>
      <br/>
      <p>Create new Auction</p>
      </div>
    );
  }
}
