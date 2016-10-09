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

    const styles = {
      labelStyle: {
        textTransform: 'capitalize'
      }
    };

    if(this.state.groupStatus === false) {
      return (
        <div>
          <RaisedButton
            backgroundColor="#667761"
            labelColor="#E3E7D3"
            label="Join Group"
            labelStyle={styles.labelStyle}
            fullWidth={true}
            onClick={() => {
            joinGroup(this.props.groupID)
            .then((response) => {
              this.setStatus(true);
            })
          }} />
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
          <RaisedButton
            backgroundColor="#C6AC8F"
            labelColor="#E3E7D3"
            label="Leave Group"
            labelStyle={styles.labelStyle}
            fullWidth={true}
            onClick={() => {
            leaveGroup(this.props.groupID)
            .then((response) => {
              this.setStatus(false);
            });
          }} />
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
          <RaisedButton
            backgroundColor="#667761"
            labelColor="#E3E7D3">
          </RaisedButton>
        </div>
      );
    }

  }

}

export default GroupButton;
