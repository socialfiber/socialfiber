import React, {Component} from 'react';
import {render} from 'react-dom';
import axios from 'axios';
import { submitUserStats } from '../actions/submitUserStats';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


//can submit post req thru component, no change to view
class UserQuestionnaire extends Component {
  constructor(props) {
    super(props)

    this.state = {
      age: '',
      height: '',
      weight: '',
      gender: ''
    }

    this.sendUserStats = this.sendUserStats.bind(this)
  }

  handleInputEvent (name, e) {
    let change = {};
    change[name] = e.target.value;
    this.setState(change);
  }

  sendUserStats (e) {
    e.preventDefault();
    console.log('state: ', this.state)
    this.props.submitUserStats(this.state);
  }

  render(){
    return (
      <div>
        <h1>Tell us a little bit about yourself...</h1>
        <form onSubmit={this.sendUserStats}>
          <input placeholder="Enter your age" type="number" value={this.state.age} min={0} onChange={this.handleInputEvent.bind(this, 'age')}></input>
          <input placeholder="Enter your height inches" type="number" value={this.state.height} min={0} onChange={this.handleInputEvent.bind(this, 'height')}></input>
          <input placeholder="Enter your current weight (in lbs)" type="number" value={this.state.weight} min={0} onChange={this.handleInputEvent.bind(this, 'weight')}></input>
          <input placeholder="Enter your gender" type="text" value={this.state.gender} onChange={this.handleInputEvent.bind(this, 'gender')}></input>
          <input type='submit' value='Create' className='btn btn-primary'></input>
        </form>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ submitUserStats }, dispatch);
}

export default connect(null, mapDispatchToProps)(UserQuestionnaire);
