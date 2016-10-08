import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { postMessage } from '../../actions/groups';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';

class MessageBox extends Component {

  render() {

    const { handleSubmit, submitting } = this.props;
    
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div className="container-message">
          <form className="message-form" onSubmit = { handleSubmit(this.props.postMessage) }>
            <h4>Post a Message</h4>
            <div>
              <Field name="message" component={TextField} multiLine={true} floatingLabelText="Enter your message" type="text" required />
            </div>
            <RaisedButton type="submit" disabled={submitting} label="Submit" />
          </form>
        </div>
      </MuiThemeProvider>
    );

  }

}

MessageBox = reduxForm({
  form: 'MessageBox'
})(MessageBox);

export default connect(null, { postMessage })(MessageBox);
