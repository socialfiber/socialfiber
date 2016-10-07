import React, { Component } from 'react';
import { fetchGroupStatus, joinGroup, leaveGroup } from '../../actions/groups';
import RaisedButton from 'material-ui/RaisedButton';


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
    fetchGroupStatus(this.props.groupID)
    .then((response) => {
      this.setState({
        groupStatus: response.payload
      });
    });
  }

  setStatus(status) {
    this.setState({
      groupStatus: status
    });
  }

  componentWillMount() {
    this.getStatus();
  }

  render() {

    if(this.state.groupStatus === false) {
      return (
        <div>
          <RaisedButton onClick={() => {
            joinGroup(this.props.groupID)
            .then((response) => {
              this.setStatus(true);
            })
          }}>
          Join Group
          </RaisedButton>
        </div>
      );
    // } else if(this.state.groupStatus === 'requested') {
    //   return (
    //     <div>
    //       <RaisedButton onClick={() => {
    //         leaveGroup(this.props.groupID)
    //         .then((response) => {
    //           this.setStatus(false);
    //         });
    //       }}>
    //       Cancel Request
    //       </RaisedButton>
    //     </div>
    //   );
    } else if(this.state.groupStatus === true) {
      return (
        <div>
          <RaisedButton onClick={() => {
            leaveGroup(this.props.groupID)
            .then((response) => {
              this.setStatus(false);
            });
          }}>
          Leave Group
          </RaisedButton>
        </div>
      );
    // } else if(this.state.groupStatus === 'owner') {
    //   return (
    //     <div>
    //       <RaisedButton onClick={() => {
    //         deleteGroup(this.props.groupID);
    //       }}>
    //       Delete Group
    //       </RaisedButton>
    //     </div>
    //   );
    } else {
      return (
        <div>
          <RaisedButton>
          </RaisedButton>
        </div>
      );
    }

  }

}

export default GroupButton;
