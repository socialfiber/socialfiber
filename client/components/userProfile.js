import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserData } from '../actions/fetchUserData';
import NavBar from './navbar';
import { Field, reduxForm } from 'redux-form';
import SelectComponent from './SelectComponent';
import { updateUserData } from '../actions/updateUserData';
import RadarGraph from './radarGraph';
import ProfilePic from './profilePic';
import ChatWindow from './chatWindow';


class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editFlag: false
    }
  }

  componentWillMount() {
    this.props.fetchUserData();
  }

  componentDidUpdate() {
    if(this.props.submitSucceeded === true) {
      this.props.fetchUserData()
      .then(() => {
        this.toggleEditing();
        this.props.reset();
      });
    }
  }

  toggleEditing() {
    // console.log("Toggling editing");
    this.setState({ editFlag: (!this.state.editFlag) });
  }

  render() {

    const { handleSubmit } = this.props;
    const genderOptions = [{value: 'male', label: 'male'}, {value: 'female', label: 'female'}];
    const pregnantOptions = [{value: true, label: 'true'}, {value: false, label: 'false'}];
    const lactatingOptions = [{value: true, label: 'true'}, {value: false, label: 'false'}];

    if(this.props.userData !== null) {
      if(!this.state.editFlag) {
        return (
          <div>
            <NavBar />
            <ProfilePic />
            <div>Age: {this.props.userData.age}</div>
            <div>Gender: {this.props.userData.gender}</div>
            <div>Height: {Math.floor(this.props.userData.height/12)}ft {this.props.userData.height %12}in</div>
            <div>Weight: {this.props.userData.weight}</div>
            <div>
              <button type="button" onClick={() => this.toggleEditing()}>Edit Info</button>
            </div>
            <ChatWindow />
            <RadarGraph />
          </div>
        );
      } else {
        return (
          <div>
            <NavBar />
            <div>
              <h3>Edit User Info</h3>
            </div>
            <form onSubmit={handleSubmit(this.props.updateUserData)}>
              <div>
                <label>Age</label>
                <Field name="age" component="input" type="number" min="0" placeholder={this.props.userData.age} required />
              </div>
              <div>
                <label>Height (ft & in)</label>
                <Field name="ft" component="input" type="number" min = "0" max="8" placeholder={Math.floor(this.props.userData.height / 12)} required />
                <Field name="in" component="input" type="number" min="0" max="11" placeholder={this.props.userData.height % 12} />
              </div>
              <div>
                <label>Weight</label>
                <Field name="weight" component="input" type="number" min="0" placeholder={this.props.userData.weight} required />
              </div>
              <div>
                <label>Gender</label>
                <Field name="gender" component={SelectComponent} options={genderOptions} placeholder={this.props.userData.gender} />
              </div>
              <div>
                <label>Are you currently pregnant?</label>
                <Field name="preg" component={SelectComponent} options={pregnantOptions} placeholder={this.props.userData.preg} />
              </div>
              <div>
                <label>Are you currently lactating?</label>
                <Field name="lact" component={SelectComponent} options={lactatingOptions} placeholder={this.props.userData.lact} />
              </div>
              <button type="submit">Submit</button>
              <button type="button" onClick={() => this.toggleEditing()}>Return</button>
            </form>
          </div>
        );
      }
    } else {
      return (
        <div>
          <h3>Loading your profile...</h3>
        </div>
      )
    }
  }

}

UserProfile = reduxForm({
  form: 'userProfileForm'
})(UserProfile);

function mapStateToProps(state) {
  return {
    userData: state.userProfile.userData,
  }
}

export default connect(mapStateToProps, { fetchUserData, updateUserData })(UserProfile);
