import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { postMessage, fetchGroupPosts } from '../../actions/groups';
import Cookies from 'js-cookie';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import {blueGrey700} from 'material-ui/styles/colors';


class MessageBox extends Component {

  render() {

    const { handleSubmit, submitting } = this.props;
    const submitPost = (e) => {
      this.props.postMessage(e)
      .then(() => {
        this.props.fetchGroupPosts(Cookies.get('groupID'));
      });
    }
    const styles = {
      underlineStyle: {
        borderColor: blueGrey700
      },
      floatingLabelStyle: {
        color: blueGrey700,
      },
      floatingLabelFocusStyle: {
        color: blueGrey700
      },
      labelStyle: {
        textTransform: 'capitalize'
      }
    };

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <form className="message-form" onSubmit = { handleSubmit(submitPost) }>
            <h4 className="messagebox-header">Post a Message</h4>
            <div>
              <Field
                name="message"
                component={TextField}
                multiLine={true}
                floatingLabelText="Enter your message"
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
            />
          </form>
        </div>
      </MuiThemeProvider>
    );

  }

}

MessageBox = reduxForm({
  form: 'MessageBox'
})(MessageBox);

const mapStateToProps = (state) => {
  return {
    groupPosts: state.groups.groupPosts
  }
}

export default connect(mapStateToProps, { postMessage, fetchGroupPosts })(MessageBox);
