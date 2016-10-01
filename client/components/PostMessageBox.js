import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

class Messages extends Component {

    render() {
      const { handleSubmit } = this.props;
      console.log('this props:', this.props);
      return (
        <form>
            <p>Post a Message</p>
            <div>
              <label>Message</label>
              <Field name="message" component="input" type="text" required />
            </div>
            <button type="submit">Submit</button>
        </form>
      )
    }

  }

  Messages = reduxForm({
    form: 'Messages'
  })(Messages);

  export default connect(null)(Messages);
