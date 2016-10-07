import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { postComment } from '../../actions/groups';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';

class CommentBox extends Component {

  render() {

    const { handleSubmit, submitting } = this.props;

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <form onSubmit = {handleSubmit(this.props.postComment)}>
              <div>
                <Field name="message" component={TextField} multiLine={true} floatingLabelText="Reply" type="text" required />
              </div>
              <RaisedButton type="submit" disabled={submitting} label="Submit" />
          </form>
        </div>
      </MuiThemeProvider>
    );

  }

}

CommentBox = reduxForm({
  form: 'CommentBoxForm'
})(CommentBox);

const mapStateToProps = (state) => {
	return {
		myGroups: state.groups
	}
}

export default connect(mapStateToProps, { postComment })(CommentBox);
