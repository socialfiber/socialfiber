import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { submitFoodDiaryEntry, fetchFoodDiary, fetchMacros } from '../../../actions/foodDiary';
import { AutoComplete as MUIAutoComplete } from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import { TextField } from 'redux-form-material-ui';
import {blueGrey700} from 'material-ui/styles/colors';


class FoodDiaryEntry extends Component {

  render() {

    const { handleSubmit, submitting } = this.props;
    const today = new Date().toISOString().substr(0,10);
    const styles = {
      underlineStyle: {
        borderColor: blueGrey700
      },
      floatingLabelStyle: {
        color: blueGrey700
      },
      floatingLabelFocusStyle: {
        color: blueGrey700
      },
      labelStyle: {
        color: 'white',
        textTransform: 'capitalize'
      },
      backgroundColor: blueGrey700
    };

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <form className="diaryInputForm" onSubmit={ handleSubmit(this.props.submitFoodDiaryEntry) } >
          <h3>Add Entry</h3>
          <p className="diaryInput-p">Please submit a meal.</p>
          <div className="diaryInputDiv">
            <label className="diaryInputLabel">Date</label>
            <Field
              name="date"
              component={TextField}
              type="date"
              max={today}
              underlineFocusStyle={styles.underlineStyle} />
            <label className="diaryInputLabel">Qty/Srv</label>
            <Field
              name="qty"
              component={TextField}
              type="number"
              hintText="Example: 1"
              underlineFocusStyle={styles.underlineStyle} />
            <label className="diaryInputLabel">Tell us what you ate</label>
            <Field
              name="food"
              component={TextField}
              type="text"
              hintText="Example: hamburger"
              underlineFocusStyle={styles.underlineStyle} />
          </div>
          <FlatButton
            backgroundColor={styles.backgroundColor}
            labelStyle={styles.labelStyle}
            label="Submit"
            type="submit"
            disabled={submitting} />
          <p>{this.props.err}</p>
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
    err: state.foodDiary.err,
    actualMacros: state.userProfile.actualMacros
  }
}

export default connect(mapStateToProps, { submitFoodDiaryEntry, fetchFoodDiary, fetchMacros })(FoodDiaryEntry);
