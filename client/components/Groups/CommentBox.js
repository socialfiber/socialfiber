import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { postComment, fetchGroupPosts } from '../../actions/groups';
import Cookies from 'js-cookie';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import {blueGrey700} from 'material-ui/styles/colors';


class CommentBox extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    const submitComment = (e) => {
      this.props.postComment(e, this.props.postID)
      .then(() => {
        this.props.fetchGroupPosts(Cookies.get('groupID'));
      });
    }
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
      labelStyle: {
        color: 'white',
        textTransform: 'capitalize'
      },
      backgroundColor: blueGrey700
    };

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <form className="commentbox" onSubmit={ handleSubmit(submitComment) } >
            <div>
              <Field
                name="message"
                component={TextField}
                multiLine={true}
                floatingLabelText="Reply"
                type="text"
                underlineStyle={styles.underlineStyle}
                underlineFocusStyle={styles.underlineStyle}
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                style={{textAlign: 'left'}}
                required
              />
            </div>
            <RaisedButton
              type="submit"
              disabled={submitting}
              label="Submit"
              labelStyle={styles.labelStyle}
              backgroundColor={styles.backgroundColor}
            />
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
    groupPosts: state.groups.groupPosts,
    comments: state.groups.comments
	}
}

export default connect(mapStateToProps, { postComment, fetchGroupPosts })(CommentBox);
