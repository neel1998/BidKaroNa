import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#eceff1',
    borderRadius: '20px',
    width: '40%',
    margin : '10px',
    height : '100px',
    padding: '10px',
    display: 'inline-block',
    color: '#006064'
  },

  imageDiv: {
    display : 'inline',
    width : '100px',
    height : '100px',
    borderRadius: '100px',
    backgroundColor : '#006064',
    border: '2px solid #006064',
    float: 'left',
  }

}));

export default function TeamMember(props) {

  const classes = useStyles();
  let name = props.name
  let email = props.email
  let image = props.image
  return (
    <div className={classes.root}>
      <img className = {classes.imageDiv} src = {image} alt = {name}/>
      <h3> {name}</h3>
      <p> {email}</p>
    </div>
  );
}
