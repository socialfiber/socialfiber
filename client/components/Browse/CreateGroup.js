import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createNewGroup } from '../../actions/groups';
import { AutoComplete as MUIAutoComplete } from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import { TextField } from 'redux-form-material-ui';


class CreateGroup extends Component {

  render() {

    const { handleSubmit, submitting } = this.props;
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div className="container">
        <div className="row">
        <div className="col-sm-6 col-md-4 col-md-offset-4">
        <form onSubmit={ handleSubmit(this.props.createNewGroup) }>
          <h4>Create a Group Based on Your Dietary Interests</h4>
          <p>You may choose a topic such as "paleo" or "vegetarian"</p>
          <div>
            <label>Name</label>
            <Field name='name' component={TextField} type='text' required/>
          </div>
          <div>
            <label>Description</label>
            <Field name='description' component={TextField} type='text' required/>
          </div>
          <button className="creategroupbutton" type="submit" disabled={submitting}>Create Group</button>
        </form>
        </div>
        </div>
      </div>
      </MuiThemeProvider>
    );
    
  }
  
}

CreateGroup = reduxForm({
  form: 'CreateGroup'
})(CreateGroup);

export default connect(null, { createNewGroup })(CreateGroup);
