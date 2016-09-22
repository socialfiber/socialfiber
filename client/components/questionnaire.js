import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Select from 'react-select';
import { submitUserStats } from '../actions/questionnaire';

class UserQuestionnaire extends Component {

  render(){
    const { handleSubmit } = this.props
    return (
        <form onSubmit={handleSubmit(this.props.submitUserStats)}>
        <h1>Tell us a little bit about yourself...</h1>
        <div>
          <label>Age</label>
          <Field name="age" component="input" type="text" />
        </div>
        <div>
          <label>Height</label>
          <Field name="height" component="input" type="text" />
        </div>
        <div>
          <label>Weight</label>
          <Field name="weight" component="input" type="text" />
        </div>
        <div>
          <label>Gender</label>
          <Field name="gender" component="input" type="text" />
        </div>
        <button type="submit">Submit</button>
        </form>
    )
  }
}

UserQuestionnaire = reduxForm({
  form: 'UserQuestionnaire'
})(UserQuestionnaire);

export default connect(null, { submitUserStats })(UserQuestionnaire);
