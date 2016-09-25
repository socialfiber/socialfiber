import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { submitSignUp } from '../actions/auth';

class SignUp extends Component {
  render() {
    const { handleSubmit } = this.props;
    const wrongPass = (<div style={{color: 'red'}}>{this.props.auth}</div>);
    return (
      <div>
      <pre><code>{JSON.stringify(this.props, null, 4)}</code></pre>
        <form onSubmit={handleSubmit(this.props.submitSignUp)}>
          <div>
            <label>Username</label>
            <Field name="username" component="input" type="text" />
          </div>
          <div>
            <label>Password</label>
            <Field name="password" component="input" type="password" />
            {wrongPass}
          </div>
          <div>
            <label>Password</label>
            <Field name="confirmPW" component="input" type="password" />
            {wrongPass}
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    )
  }

}

SignUp = reduxForm({
  form: 'SignUpForm'
})(SignUp);

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { submitSignUp })(SignUp);
