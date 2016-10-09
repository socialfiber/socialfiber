import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { submitChangePassword, resetError } from '../../../actions/users';
import { AutoComplete as MUIAutoComplete } from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import { TextField } from 'redux-form-material-ui';


class ChangePassword extends Component {

  componentWillUnmount() {
    this.props.resetError();
  }

  render() {

    const { handleSubmit, submitting } = this.props;

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <form onSubmit={handleSubmit(this.props.submitChangePassword)} >
            <div>
              <label>Password</label>
              <Field name="password" component={TextField} type="password" />
            </div>
            <div>
              <label>Confirm Password</label>
              <Field name="confirmPW" component={TextField} type="password" />
            </div>
            <div>
              <label>New Password</label>
              <Field name="newPW" component={TextField} type="password" />
            </div>
            <button className="btn btn-secondary" type="submit" disabled={submitting} >Submit</button>
          </form>
        </div>
      </MuiThemeProvider>
    );

  }

}

ChangePassword = reduxForm({
  form: 'ChangePasswordForm'
})(ChangePassword);

const mapStateToProps = (state) => {
  return {
    msg: state.userProfile.changePW
  }
}

export default connect(mapStateToProps, { submitChangePassword, resetError })(ChangePassword);
