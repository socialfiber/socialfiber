import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { updateUserData } from '../../../actions/users';
import Cookies from 'js-cookie';
import SelectComponent from '../../ToolBox/SelectComponent';


class UpdateQuestionnaire extends Component {

  componentWillUnmount() {
    Cookies.remove('userGender');
  }

  render() {

    Cookies.set('userGender', this.props.userData.gender);
    const { handleSubmit } = this.props;
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
      <div>
        <h3>Update Info</h3>
        <form onSubmit={handleSubmit(this.props.updateUserData)}>
          <div>
            <label>Age</label>
            <Field name="age" component="input" type="number" min="13" placeholder={this.props.userData.age} required />
          </div>
          <div>
            <label>Height (ft & in)</label>
            <Field name="ft" component="input" type="number" min ="4" max="8" placeholder={Math.floor(this.props.userData.height / 12)} required />
            <Field name="in" component="input" type="number" min="0" max="11" placeholder={this.props.userData.height % 12} />
          </div>
          <div>
            <label>Weight</label>
            <Field name="weight" component="input" type="number" min="70" placeholder={this.props.userData.weight} required />
          </div>
          {femaleQuestions()}
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }

}

UpdateQuestionnaire = reduxForm({
  form: 'UpdateQuestionnaireForm'
})(UpdateQuestionnaire);

const mapStateToProps = (state) => {
  return {
    userData: state.userProfile.userData,
  }
}

export default connect(mapStateToProps, { updateUserData })(UpdateQuestionnaire);
