import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { submitSignIn, resetError } from '../../actions/auth';
import { AutoComplete as MUIAutoComplete } from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import { TextField } from 'redux-form-material-ui';


class SignIn extends Component {

  render() {
    const { handleSubmit, submitting } = this.props;
    return (

      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div className="container">
          <div className="row">
              <div className="col-sm-6 col-md-4 col-md-offset-4">
                  <div className="account-wall">
                      <form onSubmit={ handleSubmit(this.props.submitSignIn) } className="form-signin-signup">
                        <Field name="username" component={TextField} type="text" floatingLabelText="Username" className="text-line" />
                        <Field name="password" component={TextField} type="password" floatingLabelText="Password" className="text-line" />
                        <FlatButton type="submit" disabled={submitting} className="btn btn-lg btn-primary btn-block main-btn">Sign In</FlatButton>
                        <Link to={'/signup'} className="text-center new-account">Create an Account</Link>
                      </form>
                  </div>
              </div>
          </div>
        </div>
      </MuiThemeProvider>
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
