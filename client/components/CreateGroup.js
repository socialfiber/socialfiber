import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createNewGroup } from '../actions/createNewGroup';
import NavBar from './navbar';


class CreateGroup extends Component {

  render(){
    const { handleSubmit } = this.props;
    return (
      <div>
        <NavBar />
        <form onSubmit={ handleSubmit(this.props.createNewGroup) }>
          <h3>Create a Group Based on Your Dietary Interests</h3>
            <p>You may choose a topic such as "paleo" or "vegetarian"</p>
              <div>
                <label>Name</label>
                  <Field name='name' component='input' type='text' required/>
                <label>Description</label>
                  <Field name='description' component='input' type='text' required/>
              </div>
                <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

CreateGroup = reduxForm({
  form: 'CreateGroup'
})(CreateGroup)

export default connect(null, { createNewGroup })(CreateGroup);
