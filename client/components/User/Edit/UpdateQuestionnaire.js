import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { updateUserStats } from '../../../actions/users';
import Cookies from 'js-cookie';
import SelectComponent from '../../ToolBox/SelectComponent';
import { AutoComplete as MUIAutoComplete } from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import { TextField } from 'redux-form-material-ui';


class UpdateQuestionnaire extends Component {

  componentWillUnmount() {
    Cookies.remove('userGender');
  }

  render() {

    Cookies.set('userGender', this.props.userData.gender);
    const { handleSubmit, submitting } = this.props;
    const pregnantOptions = [{value: true, label: 'true'}, {value: false, label: 'false'}];
    const lactatingOptions = [{value: true, label: 'true'}, {value: false, label: 'false'}];
    const femaleQuestions = () => {
      if(this.props.userData.gender === 'female') {
        return (
          <div>
            <div>
              <label>Are you currently pregnant?</label>
              <Field name="preg" component={SelectComponent} options={pregnantOptions} placeholder={this.props.userData.preg} />
            </div>
            <div>
              <label>Are you currently lactating?</label>
              <Field name="lact" component={SelectComponent} options={lactatingOptions} placeholder={this.props.userData.lact} />
            </div>
          </div>
        );
      }
    }

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <form onSubmit={handleSubmit(this.props.updateUserStats)}>
            <div>
              <label className="updateQ-label">Age</label>
              <Field name="age" component={TextField} type="number" />
            </div>
            <div>
              <label className="updateQ-label">Height (ft & in)</label>
              <Field name="ft" component="input" type="number" />
              <Field name="in" component="input" type="number" />
            </div>
            <div>
              <label className="updateQ-label">Weight (lb)</label>
              <Field name="weight" component={TextField} type="number" />
            </div>
            {femaleQuestions()}
            <button className="updateQ-btn btn btn-secondary" type="submit" disabled={submitting} >Submit</button>
            <p className="error-txt">{this.props.updateStats}</p>
          </form>
        </div>
      </MuiThemeProvider>
    );

  }

}

UpdateQuestionnaire = reduxForm({
  form: 'UpdateQuestionnaireForm'
})(UpdateQuestionnaire);

const mapStateToProps = (state) => {
  return {
    userData: state.userProfile.userData,
    updateStats: state.userProfile.updateStats
  }
}

export default connect(mapStateToProps, { updateUserStats })(UpdateQuestionnaire);
