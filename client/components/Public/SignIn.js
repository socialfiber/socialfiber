import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { submitSignIn, resetError } from '../../actions/auth';


class SignIn extends Component {

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <div>
        <form onSubmit={ handleSubmit(this.props.submitSignIn) }>
          <div>
            <label>Username</label>
            <Field name="username" component="input" type="text" />
          </div>
          <div>
            <label>Password</label>
            <Field name="password" component="input" type="password" />
          </div>
          <button type="submit" disabled={submitting} >Sign In</button>
          <p>{this.props.err}</p>
          <Link to={'/signup'}>Sign up now!</Link>
        </form>
      </div>
    );
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

export default connect(mapStateToProps, { submitSignIn, resetError })(SignIn);
