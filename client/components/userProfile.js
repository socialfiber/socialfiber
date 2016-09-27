import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserData } from '../actions/fetchUserData';
import NavBar from './navbar';
import { Field, reduxForm } from 'redux-form';
import SelectComponent from './SelectComponent';
import { updateUserData } from '../actions/updateUserData';
import RadarGraph from './radarGraph';


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
    const options = [{value: 'male', label: 'male'},{value: 'female', label: 'female'}];

    if(this.props.userData !== null) {
      if(!this.state.editFlag) {
        return (
          <div>
            <NavBar />
            <h3>User Info</h3>
            <div>Age: {this.props.userData.age}</div>
            <div>Gender: {this.props.userData.gender}</div>
            <div>Height: {this.props.userData.height}</div>
            <div>Weight: {this.props.userData.weight}</div>
            <div>
              <button type="button" onClick={() => this.toggleEditing()}>Edit Info</button>
            </div>
            <p><RadarGraph /></p>
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
                <Field name="gender" component={SelectComponent} options={options} placeholder={this.props.userData.gender} />
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
    userData: state.userProfile
  }
}

export default connect(mapStateToProps, { fetchUserData, updateUserData })(UserProfile);
