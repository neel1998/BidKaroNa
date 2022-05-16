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
            <TeamMember name = {"Janhavi Kulkarni"} email = {"janhavi1dkulkarni@gmail.com"} image = {"https://www.citypng.com/public/uploads/preview/-41601334536deuz6oibxe.png"}/>
            <TeamMember name = {"Keshav Sharma"} email = {"mailkeshav298@gmail.com"} image = {"https://www.citypng.com/public/uploads/preview/-41601334000juyqtkjgzt.png"}/>
            <TeamMember name = {"Arihant Kochar"} email = {"aarihantt@gmail.com"} image = {"https://www.citypng.com/public/uploads/preview/-41601321774gxrd7dvg9f.png"}/>
            <TeamMember name = {"Mitul Jain"} email = {"meetjain437@gmail.com"} image = {"https://www.citypng.com/public/uploads/preview/-41601316264zmyndxmi21.png"}/>
          </ThemeProvider>
      </div>
    );
  }
}
