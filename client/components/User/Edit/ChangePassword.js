import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { submitChangePassword, resetError } from '../../../actions/users';


class ChangePassword extends Component {

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.props.submitChangePassword)} >
          <div>
            <label>Password</label>
            <Field name="password" component="input" type="password" />
          </div>
          <div>
            <label>Confirm Password</label>
            <Field name="confirmPW" component="input" type="password" />
          </div>
          <div>
            <label>New Password</label>
            <Field name="newPW" component="input" type="password" />
          </div>
          <button type="submit" disabled={submitting} >Submit</button>
          <p>INSERT_MSG_HERE</p>
        </form>
      </div>
    );
  }

}

ChangePassword = reduxForm({
  form: 'ChangePasswordForm'
})(ChangePassword);

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, { submitChangePassword, resetError })(ChangePassword);
