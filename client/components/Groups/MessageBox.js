import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { postMessage } from '../../actions/groups';


class MessageBox extends Component {

  render() {

    const { handleSubmit, submitting } = this.props;
    return (
      <form onSubmit = { handleSubmit(this.props.postMessage) }>
          <h4>Post a Message</h4>
          <div>
            <Field name="message" component="input" type="text" required />
          </div>
          <button type="submit" disabled={submitting} >Submit</button>
      </form>
    );

  }

}

MessageBox = reduxForm({
  form: 'MessageBox'
})(MessageBox);

export default connect(null, { postMessage })(MessageBox);
