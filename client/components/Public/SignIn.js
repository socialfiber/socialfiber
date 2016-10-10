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
import {blueGrey700} from 'material-ui/styles/colors';


class SignIn extends Component {

  componentWillUnmount() {
    this.props.resetError();
  }

  render() {

    const { handleSubmit, submitting } = this.props;
    const styles = {
      underlineStyle: {
        borderColor: blueGrey700
      },
      floatingLabelStyle: {
        color: blueGrey700
      },
      floatingLabelFocusStyle: {
        color: blueGrey700
      },
      labelStyle: {
        color: 'white',
        textTransform: 'capitalize'
      },
      backgroundColor: blueGrey700
    };

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div className="container all-container">
          <div className="row">
            <div className="col-sm-6 col-md-4 col-md-offset-4">
              <div className="account-wall">
                <form onSubmit={ handleSubmit(this.props.submitSignIn) } className="form-signin-signup">
                  <Field
                    name="username"
                    component={TextField}
                    type="text"
                    floatingLabelText="Username"
                    className="text-line"
                    underlineFocusStyle={styles.underlineStyle}
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle} />
                  <Field
                    name="password"
                    component={TextField}
                    type="password"
                    floatingLabelText="Password"
                    className="text-line"
                    underlineFocusStyle={styles.underlineStyle}
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}/>
                  <FlatButton
                    type="submit"
                    disabled={submitting}
                    className="btn btn-lg btn-primary btn-block main-btn"
                    label="Sign in"
                    labelStyle={styles.labelStyle}
                    backgroundColor={styles.backgroundColor} />
                  <p className="error-txt">{this.props.err}</p>
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
