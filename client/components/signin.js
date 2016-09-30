import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { submitSignIn } from '../actions/auth';

class SignIn extends Component {

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.props.submitSignIn)}>
        <div>
          <label>Username</label>
          <Field name="username" component="input" type="text" />
        </div>
        <div>
          <label>Password</label>
          <Field name="password" component="input" type="password" />
        </div>
        <button type="submit">Sign In</button>
        <p>{this.props.err}</p>
      </form>
    )
  }

}

SignIn = reduxForm({
  form: 'SignInForm'
})(SignIn);

const mapStateToProps = (state) => {
  return {
    err: state.auth.err
  }
}

export default connect(mapStateToProps, { submitSignIn })(SignIn);
