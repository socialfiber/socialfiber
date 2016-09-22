import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { submitSignUp } from '../actions/auth';

class SignUp extends Component {

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.props.submitSignUp)}>
        <div>
          <label>Username</label>
          <Field name="username" component="input" type="text" />
        </div>
        <div>
          <label>Password</label>
          <Field name="password" component="input" type="password" />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    )
  }

}

SignUp = reduxForm({
  form: 'SignUpForm'
})(SignUp);

export default connect(null, { submitSignUp })(SignUp);
