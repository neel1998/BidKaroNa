import React, { Component } from 'react';
import Navbar from './Navbar';

export default class Home extends Component {
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
          <p>Home</p>
      </div>
    );
  }
}
