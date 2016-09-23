import React, {Component} from 'react';
import {render} from 'react-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import SelectComponent from './select'
import { bindActionCreators } from 'redux';

class FoodDiary extends Component {

  render(){
    const { handleSubmit } = this.props;
    return (
      <form onSubmit = {handleSubmit(this.props.submitFoodDiaryEntry)}>
        <h1>Food Diary</h1>
          <p>Please submit a meal. You may enter phrases such as "cheesburger and fries" or "two eggs and whole wheat toast"</p>
          <div>
            <label>Tell us what you ate</label>
              <Field name='age' component='input' type='text' required/>
          </div>
            <button type='submit'>Submit</button>
      </form>
    )
  }
}

FoodDiary = reduxForm({
  form: 'FoodDiary'
})(FoodDiary);

export default connect(null,{ submitFoodDiaryEntry })(FoodDiary);
