  import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { submitFoodDiaryEntry, fetchFoodDiary, fetchMacros } from '../../../actions/foodDiary';
import { AutoComplete as MUIAutoComplete } from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import { TextField } from 'redux-form-material-ui';


class FoodDiaryEntry extends Component {

  constructor(props) {
    super(props);
    this.submitEntry.bind(this);
  }

  submitEntry(e) {
    submitFoodDiaryEntry(e)
    .then(() => {
      fetchFoodDiary()
      .then(() => {
        fetchMacros();
      });
    });
  }

  render() {

    const { handleSubmit, submitting } = this.props;
    const today = new Date().toISOString().substr(0,10);

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <form onSubmit={ handleSubmit(this.submitEntry) } >
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
          <button type="submit" disabled={submitting} >Submit</button>
        </form>
      </MuiThemeProvider>
        );

  }

}

FoodDiaryEntry = reduxForm({
  form: 'FoodDiaryEntryForm'
})(FoodDiaryEntry);

const mapStateToProps = (state) => {
  return {
    diaryData: state.foodDiary.logs,
    actualMacros: state.userProfile.actualMacros
  }
}

export default connect(mapStateToProps, { submitFoodDiaryEntry, fetchFoodDiary, fetchMacros })(FoodDiaryEntry);
