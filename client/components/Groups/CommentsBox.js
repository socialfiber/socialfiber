import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { postComment } from '../../actions/groups';


class Comments extends Component {

  render() {

    const { handleSubmit, submitting } = this.props;

    return (
      <div>
        <form onSubmit = {handleSubmit(this.props.postComment)}>
            <div>
              <label>Reply</label>
              <Field name="message" component="input" type="text" required />
            </div>
            <button type="submit" disabled={submitting} >Submit</button>
        </form>
      </div>
    );

  }

}

Comments = reduxForm({
  form: 'Comments'
})(Comments);

const mapStateToProps = (state) => {
	return {
		myGroups: state.groups
	}
}

export default connect(mapStateToProps, { postComment })(Comments);
