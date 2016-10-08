import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGroupUsers, joinGroup, leaveGroup, leavePage } from '../../actions/groups';
import Cookies from 'js-cookie';
import NavBar from '../ToolBox/NavBar';
import Tabs from '../ToolBox/Tabs';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

class GroupPage extends Component {

  componentWillMount() {
    Cookies.set('groupID', this.props.params.id);
    Cookies.set('groupName', this.props.params.groupname);
    this.props.fetchGroupUsers({
      groupID: this.props.params.id,
      groupName: this.props.params.groupname
    });
  }

  componentDidMount() {
    console.log("componentDidMount")
  }

  componentWillUnmount() {
    Cookies.remove('groupID');
    Cookies.remove('groupName');
    this.props.leavePage();
  }

  render() {

    const tabsList = [
      { label: 'Wall', component: 'GroupWall' },
      { label: 'Members', component: 'GroupUsersList' }
    ];

    if(this.props.membership === null) {

      return (
        <div>
          <NavBar />
          <h1>{this.props.params.groupname}</h1>
          <h3>Loading group page...</h3>
        </div>
      );

    } else if(this.props.membership) {
      return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <div>
            <NavBar />
            <div className="group-page-header">
                <h1>{this.props.params.groupname}</h1>
                <RaisedButton
                  className="leave-group-button"
                  onClick = {() => {this.props.leaveGroup(this.props.params.id).then(()=>window.location.reload())}}
                  label="Leave Group" />
            </div>
            <Tabs tabsList={tabsList} defaultTab={'GroupWall'} />
          </div>
        </MuiThemeProvider>
      );

    } else if(!this.props.membership) {

      return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <div>
            <NavBar />
            <div className="group-page-header">
            <h1>{this.props.params.groupname}</h1>
              <p>You aren't a member of this group! Please join to participate in the group.</p>
              <RaisedButton
                className="join-group-button"
                onClick={() => {this.props.joinGroup(this.props.params.id).then(()=>window.location.reload())}}
                label="Join Group" />
            </div>
          </div>
        </MuiThemeProvider>
      );
    }

  }

}

const mapStateToProps = (state) => {
  return {
    membership: state.groups.membership
  }
}

export default connect(mapStateToProps, { fetchGroupUsers, joinGroup, leaveGroup, leavePage })(GroupPage);
