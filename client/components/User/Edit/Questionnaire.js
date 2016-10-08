import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { submitUserStats } from '../../../actions/users';
import GenderSelect from './GenderSelect';
import NavBar from '../../ToolBox/NavBar';
import SelectComponent from '../../ToolBox/SelectComponent';
import { AutoComplete as MUIAutoComplete } from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import { TextField } from 'redux-form-material-ui';

class Questionnaire extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gender: null
    }
  }

  render() {

    const { handleSubmit, submitting } = this.props;
    const pregnantOptions = [{value: true, label: 'true'}, {value: false, label: 'false'}];
    const lactatingOptions = [{value: true, label: 'true'}, {value: false, label: 'false'}];
    const femaleQuestions = () => {
      if(this.state.gender === 'female') {
        return (
          <div>
            <div>
              <label>Are you currently pregnant?</label>
              <Field name="preg" component={SelectComponent} options={pregnantOptions} />
            </div>
            <div>
              <label>Are you currently lactating?</label>
              <Field name="lact" component={SelectComponent} options={lactatingOptions} />
            </div>
          </div>
        );
      }
    }

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div className="container questionnaire">
          <div className="row">
            <h1 className="questionnaire-h1">Tell us a little bit about yourself...</h1>
            <p>social fiber calculates RDA-based nutrient recommendations for each individual</p>
              <div className="col-sm-6 col-md-4 col-md-offset-4">
              <div className='inner-div-questionnaire'>
                <form className="questionnaire-form" onSubmit={handleSubmit(this.props.submitUserStats)}>
                  <div className="questionnaire-inputs">
                    <label>Age</label>
                    <Field name="age" component="input" type="number" min="13" required />
                  </div>
                  <div className="questionnaire-inputs">
                    <label>Height (ft & in)</label>
                    <Field className='input' name="ft" component="input" type="number" min="4" max="8" required />
                    <Field name="in" component="input" type="number" min="0" max="11" />
                  </div>
                  <div className="questionnaire-inputs">
                    <label>Weight</label>
                    <Field name="weight" component="input" type="number" min="70" required />
                  </div>
                  <div className="questionnaire-inputs">
                    <label>Gender</label>
                    <Field name="gender" component={GenderSelect} genderState={this} />
                  </div>
                  {femaleQuestions()}
                  <button className='submitquestionnaire btn btn-secondary' type="submit" disabled={submitting} >Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        </MuiThemeProvider>
    );

  }

}

Questionnaire = reduxForm({
  form: 'Questionnaire'
})(Questionnaire);

export default connect(null, { submitUserStats })(Questionnaire);
