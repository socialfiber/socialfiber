import React, { Component } from 'react';
import { fetchGroupStatus, addUser, removeUser } from '../../actions/groups';


class GroupButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      groupStatus: undefined
    }
    this.getStatus.bind(this);
    this.setStatus.bind(this);
  }

  getStatus() {
    fetchGroupStatus(this.props.userID, groupID)
    .then((response) => {
      this.setState({
        groupStatus: response.payload
      });
    });
  }

  setStatus(response) {
    this.setState({
      groupStatus: response.payload
    });
  }

  componentWillMount() {
    this.getStatus();
  }
  
  render() {

    if(this.state.groupStatus === 'requested') {
      return (
        <div>
          <button onClick={() => {
            addUser(this.props.userID, this.props.groupID)
            .then((response) => {
              this.setStatus(response);
            });
          }}>
          Approve Request
          </button>
          <button onClick={() => {
            removeUser(this.props.userID, this.props.groupID)
            .then((response) => {
              this.setStatus(response);
            });
          }}>
          Add User
          </button>
        </div>
      );
    } else if(this.state.groupStatus === 'member') {
      return (
        <div>
          <button onClick={() => {
            removeUser(this.props.userID, this.props.groupID)
            .then((response) => {
              this.setStatus(response);
            });
          }}>
          Remove User
          </button>
        </div>
      );
    } else {
      return (
        <div>
        </div>
      );
    }
    
  }

}

export default GroupButton;
