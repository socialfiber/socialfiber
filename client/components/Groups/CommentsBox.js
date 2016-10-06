import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { postComment } from '../../actions/groups';


class Comments extends Component {

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit = {handleSubmit(this.props.postComment)}>
          <div>
            <label>Reply</label>
            <Field name="message" component="input" type="text" required />
          </div>
          <button type="submit" onClick={() => window.location.reload()}>Submit</button>
      </form>
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
