import React, { Component } from 'react';
import Navbar from './Navbar';
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './theme'
import TeamMember from './TeamMember'

export default class Team extends Component {
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
          <ThemeProvider theme={theme}>
            <Navbar
              history = {this.props.history}/>
            <br/>
            <h2 style = {{'color' : '#006064'}}>The Team </h2>
            <TeamMember name = {"Preet Thakkar"} email = {"preet.thakkar@students.iiit.ac.in"} image = {"https://www.citypng.com/public/uploads/preview/-41601334536deuz6oibxe.png"}/>
            <TeamMember name = {"Vaibhav Garg"} email = {"vaibhav.garg@students.iiit.ac.in"} image = {"https://www.citypng.com/public/uploads/preview/-41601334000juyqtkjgzt.png"}/>
            <TeamMember name = {"Anchit Gupta"} email = {"anchit.gupta@research.iiit.ac.in"} image = {"https://www.citypng.com/public/uploads/preview/-41601321774gxrd7dvg9f.png"}/>
            <TeamMember name = {"Kunal Vaswani"} email = {"kunal.vaswani@students.iiit.ac.in"} image = {"https://www.citypng.com/public/uploads/preview/-41601320993ivqtu7lbzo.png"}/>
            <TeamMember name = {"Anush Mahajan"} email = {"anush.mahajan@research.iiit.ac.in"} image = {"https://www.citypng.com/public/uploads/preview/-41601318596qfyeqk7mvf.png"}/>
            <TeamMember name = {"Rizwan Ali"} email = {"rizwan.ali@students.iiit.ac.in"} image = {"https://www.citypng.com/public/uploads/preview/-41601316264zmyndxmi21.png"}/>
            <TeamMember name = {"Neel Trivedi"} email = {"neel.trivedi@research.iiit.ac.in"} image = {"https://www.citypng.com/public/uploads/preview/-41601315366ahksehn0fu.png"}/>

          </ThemeProvider>
      </div>
    );
  }
}
