import React, { Component } from 'react';
import { submitSignIn } from '../actions/auth';
import {render} from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class SignIn extends Component {
  constructor(props){
    super(props)

      this.state = {
        username : '',
        password: ''
      }
      this.submitSignIn = this.submitSignIn.bind(this)
    }
    handleInputEvent (name, e) {
      let change = {};
      change[name] = e.target.value;
      this.setState(change);
    }

    submitSignIn (e) {
      e.preventDefault();
      console.log('state: ', this.state)
      this.props.submitSignIn(this.state);
    }
    render(){
      return (
        <div>
        <form onSubmit = {this.submitSignIn}>
        <input placeholder='username' value={this.state.username}></input>
        <input placeholder='password' value={this.state.password}></input>
        <input type='submit' value='Sign In' className='btn btn-primary'></input>
        </form>
        <p>Not a member yet? Click here to sign up.</p>
        <input type='submit' value='Sign Up' className='btn btn-primary'></input>
        </div>
      );
    }
  }

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ submitSignIn }, dispatch);
}

export default connect(null, mapDispatchToProps)(SignIn);
