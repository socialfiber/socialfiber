import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { submitFoodDiaryEntry } from '../../../actions/foodDiary';

class FoodDiaryEntry extends Component {

  render() {
    const { handleSubmit, submitting } = this.props;
    const today = new Date().toISOString().substr(0,10);
    return (
      <form onSubmit={handleSubmit(this.props.submitFoodDiaryEntry)}>
        <h3>Add Entry</h3>
        <p>Please submit a meal.</p>
        <div>
          <label>Date</label>
          <Field name="date" component="input" type="date" max={today} required />
          <label>qty/srv</label>
          <Field name="qty" component="input" type="number" min="1" required />
          <label>Tell us what you ate</label>
          <Field name="food" component="input" type="text" required />
        </div>
          <button type="submit" disabled={submitting}>Submit</button>
      </form>
    )
  }

}

FoodDiaryEntry = reduxForm({
  form: 'FoodDiaryEntry'
})(FoodDiaryEntry);

export default connect(null, { submitFoodDiaryEntry })(FoodDiaryEntry);
