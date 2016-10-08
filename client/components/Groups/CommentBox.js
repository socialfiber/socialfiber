import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { postComment } from '../../actions/groups';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import {blueGrey700} from 'material-ui/styles/colors';


class CommentBox extends Component {

  render() {

    const { handleSubmit, submitting } = this.props;
    const styles = {
      underlineStyle: {
        borderColor: blueGrey700,
      },
      floatingLabelStyle: {
        color: blueGrey700,
      },
      floatingLabelFocusStyle: {
        color: blueGrey700,
      },
    };

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <form className="commentbox" onSubmit = {handleSubmit(this.props.postComment)}>
              <div>
                <Field
                  name="message"
                  component={TextField}
                  multiLine={true}
                  floatingLabelText="Reply"
                  type="text"
                  underlineFocusStyle={styles.underlineStyle}
                  floatingLabelStyle={styles.floatingLabelStyle}
                  floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                  style={{textAlign: 'left'}}
                  required />
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
