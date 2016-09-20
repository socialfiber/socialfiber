import React, {Component} from 'react';
import {render} from 'react-dom';
import axios from 'axios';


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

  postStats(userStatsObj) {
  axios.post('/api/users/createUser', userStatsObj)
  .then(function(response){
    console.log("response.data: ", response.data)
  })
  .catch(function(error){
    console.log("there was an error sending your data: ", error)
  })
}

  handleInputEvent (name, e) {
    let change = {};
    change[name] = e.target.value;
    this.setState(change);
  }

  sendUserStats (e) {
    e.preventDefault();
    console.log('state: ', this.state)
    console.log('typeof', typeof parseInt(this.state.age))
    this.postStats(this.state);
  }

  render(){

    return (
      <div>
        <h1>Tell us a little bit about yourself...</h1>
        <form onSubmit={this.sendUserStats}>
          <input placeholder="Enter your age" type="number" value={this.state.age} onChange={this.handleInputEvent.bind(this, 'age')}></input>
          <input placeholder="Enter your height inches" type="number" value={this.state.height} onChange={this.handleInputEvent.bind(this, 'height')}></input>
          <input placeholder="Enter your current weight (in lbs)" type="number" value={this.state.weight} onChange={this.handleInputEvent.bind(this, 'weight')}></input>
          <input placeholder="Enter your gender" type="text" value={this.state.gender} onChange={this.handleInputEvent.bind(this, 'gender')}></input>
          <input type='submit' value='Create' className='btn btn-primary'></input>
        </form>
      </div>
    )
  }


}
export default UserQuestionnaire;
