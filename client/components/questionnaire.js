import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { submitUserStats } from '../actions/questionnaire';
import SelectComponent from './SelectComponent';
import NavBar from './navbar';


class UserQuestionnaire extends Component {

  render() {
    const { handleSubmit } = this.props;
    const genderOptions = [{value: 'male', label: 'male'}, {value: 'female', label: 'female'}];
    const pregnantOptions = [{value: true, label: 'true'}, {value: false, label: 'false'}];
    const lactatingOptions = [{value: true, label: 'true'}, {value: false, label: 'false'}];
    return (
      <div>
      <NavBar />
        <form onSubmit={handleSubmit(this.props.submitUserStats)}>
          <h1>Tell us a little bit about yourself...</h1>
            <div>
              <label>Age</label>
              <Field name="age" component="input" type="number" min="0" required />
            </div>
            <div>
              <label>Height (ft & in)</label>
              <Field name="ft" component="input" type="number" min="0" max="8" required />
              <Field name="in" component="input" type="number" min="0" max="11" />
            </div>
            <div>
              <label>Weight</label>
              <Field name="weight" component="input" type="number" min="0" required />
            </div>
            <div>
              <label>Gender</label>
              <Field name="gender" component={SelectComponent} options={genderOptions} />
            </div>
            <div>
              <label>Are you currently pregnant?</label>
              <Field name="preg" component={SelectComponent} options={pregnantOptions} />
            </div>
            <div>
              <label>Are you currently lactating?</label>
              <Field name="lact" component={SelectComponent} options={lactatingOptions} />
            </div>
            <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

UserQuestionnaire = reduxForm({
  form: 'UserQuestionnaire'
})(UserQuestionnaire);

export default connect(null, { submitUserStats })(UserQuestionnaire);
