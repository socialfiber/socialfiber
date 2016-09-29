import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

class Comments extends Component {

    render() {
      const { handleSubmit } = this.props;
      return (
        <form>
          <h3>Add Comment</h3>
            <p>Post a Comment</p>
            <div>
              <label>Comment Box</label>
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
