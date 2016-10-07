import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createNewGroup } from '../../actions/groups';


class CreateGroup extends Component {

  render() {

    const { handleSubmit, submitting } = this.props;
    return (
      <div>
        <form onSubmit={ handleSubmit(this.props.createNewGroup) }>
          <h4>Create a Group Based on Your Dietary Interests</h4>
          <p>You may choose a topic such as "paleo" or "vegetarian"</p>
          <div>
            <label>Name</label>
            <Field name='name' component='input' type='text' required/>
          </div>
          <div>
            <label>Description</label>
            <Field name='description' component='input' type='text' required/>
          </div>
          <button type="submit" disabled={submitting} >Submit</button>
        </form>
      </div>
    );
    
  }
  
}

CreateGroup = reduxForm({
  form: 'CreateGroup'
})(CreateGroup);

export default connect(null, { createNewGroup })(CreateGroup);
