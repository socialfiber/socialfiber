import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

class Comments extends Component {

    render() {
      const { handleSubmit } = this.props;
      console.log('this props:', this.props);
      return (
        <form>
            <p>Post a Comment</p>
            <div>
              <label>Reply</label>
              <Field name="comment" component="input" type="text" required />
            </div>
            <button type="submit">Submit</button>
        </form>
      )
    }

  }

  Comments = reduxForm({
    form: 'Comments'
  })(Comments);

  export default connect(null)(Comments);
