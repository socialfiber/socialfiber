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
import {blueGrey700} from 'material-ui/styles/colors';


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
            <div className="questionnaire-inputs">
              <label className="q-label">
                Are you currently pregnant?
              </label>
              <Field className="selectComponent-div" name="preg" component={SelectComponent} options={pregnantOptions} />
            </div>
            <div className="questionnaire-inputs">
              <label className="q-label">
                Are you currently lactating?
              </label>
              <Field className="selectComponent-div" name="lact" component={SelectComponent} options={lactatingOptions} />
            </div>
          </div>
        );
      }
    }
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
      inputStyle: {
        color: 'white'
      }
		};

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div className="container questionnaire all-container">
          <h1 className="questionnaire-h1">
            Tell us a little bit about yourself...
          </h1>
          <p>
            social fiber calculates RDA-based nutrient recommendations for each individual
          </p>
          <div className="col-sm-6 col-md-4 col-md-offset-4">
            <div className='inner-div-questionnaire'>
              <form className="questionnaire-form" onSubmit={ handleSubmit(this.props.submitUserStats) } >
                <div className="questionnaire-inputs">
                  <label className="q-label">
                    Age
                  </label>
                  <Field
                    name="age"
                    component={TextField}
                    type="number"
                    underlineFocusStyle={styles.underlineStyle}
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    inputStyle={styles.inputStyle}
                  />
                </div>
                <div className="questionnaire-inputs">
                  <label className="q-label">
                    Height (ft & in)
                  </label>
                  <Field className='input' name="ft" component="input" type="number" />
                  <Field className='input' name="in" component="input" type="number" />
                </div>
                <div className="questionnaire-inputs">
                  <label className="q-label">
                    Weight (lb)
                  </label>
                  <Field
                    name="weight"
                    component={TextField}
                    type="number"
                    underlineFocusStyle={styles.underlineStyle}
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    inputStyle={styles.inputStyle}
                  />
                </div>
                <div className="questionnaire-inputs">
                  <label className="q-label">
                    Gender
                  </label>
                  <Field className="selectComponent-div" name="gender" component={GenderSelect} genderState={this} />
                </div>
                {femaleQuestions()}
                <button className='submitquestionnaire btn btn-secondary' type="submit" disabled={submitting} >
                  Submit
                </button>
                <p className="error-txt">
                  {this.props.submitStats}
                </p>
              </form>
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

const mapStateToProps = (state) => {
  return {
    submitStats: state.userProfile.submitStats
  }
}

export default connect(mapStateToProps, { submitUserStats })(Questionnaire);
