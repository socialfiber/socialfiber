import React, {Component} from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';
import NavBar from './navbar'


export default class SplashPg extends Component {
  render(){
    return(
    <div class = 'splashpg-div'>
    <NavBar />
      <img src ='https://images.unsplash.com/photo-1473631706567-f3724ae047b5?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&s=2b42cea7ba5c5603fed6b0e241c0cd14'></img>
      <h1>welcome</h1>
    </div>
    )
  }
}
