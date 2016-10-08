import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { submitSignUp, resetError } from '../../actions/auth';
import { AutoComplete as MUIAutoComplete } from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { TextField } from 'redux-form-material-ui';


class SignUp extends Component {

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div className="container">
          <div className="col-sm-6 col-md-4 col-md-offset-4">
            <div className="account-wall">
              <form onSubmit={ handleSubmit(this.props.submitSignUp) } className="form-signin-signup">
                <div>
                  <Field name="username" component={TextField} type="text" floatingLabelText="Username" className="text-line" />
                </div>
                <div>
                  <Field name="password" component={TextField} type="password" floatingLabelText="Password" className="text-line" />
                </div>
                <div className="confirm-pw">
                  <Field name="confirmPW" component={TextField} type="password" floatingLabelText="Confirm Password" className="text-line" />
                </div>
                <FlatButton type="submit" disabled={submitting} className="btn btn-lg btn-primary btn-block main-btn">Sign Up</FlatButton>
                <p>{this.props.err}</p>
                <Link to={'/signin'} className="text-center new-account">Sign In</Link>
              </form>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }

}

SignUp = reduxForm({
  form: 'SignUpForm'
})(SignUp);

const mapStateToProps = (state) => {
  return {
    err: state.auth.err
  }
}

export default connect(mapStateToProps, { submitSignUp, resetError })(SignUp);
