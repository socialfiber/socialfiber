import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGroupUsers, joinGroup, leaveGroup, leavePage } from '../../actions/groups';
import Cookies from 'js-cookie';
import NavBar from '../ToolBox/NavBar';
import Tabs from '../ToolBox/Tabs';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {blueGrey700} from 'material-ui/styles/colors';

class GroupPage extends Component {

  componentWillMount() {
    Cookies.set('groupID', this.props.params.id);
    Cookies.set('groupName', this.props.params.groupname);
    this.props.fetchGroupUsers({
      groupID: this.props.params.id,
      groupName: this.props.params.groupname
    });
  }

  componentWillUnmount() {
    Cookies.remove('groupID');
    Cookies.remove('groupName');
    this.props.leavePage();
  }

  render() {

    console.log("GroupsPage: ", this.props);

    const tabsList = [
      { label: 'Wall', component: 'GroupWall' },
      { label: 'Members', component: 'GroupUsersList' }
    ];
    const styles = {
      labelStyle: {
        color: 'white',
        textTransform: 'capitalize'
      },
      backgroundColor: '#D8A154'
    };

    if(this.props.membership === null) {

      return (
        <div>
          <NavBar />
          <h1 className="all-container">{this.props.params.groupname}</h1>
          <h3>Loading group page...</h3>
        </div>
      );

    } else if(this.props.membership) {
      return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <div>
            <NavBar />
            <div className="group-page-header all-container">
              <h1>{this.props.params.groupname}</h1>
            </div>
            <Tabs style={{backgroundColor: 'white'}} tabsList={tabsList} defaultTab={'GroupWall'} />
            <RaisedButton
              className="leave-group-button"
              backgroundColor={styles.backgroundColor}
              labelStyle={styles.labelStyle}
              onClick = {() => {this.props.leaveGroup(this.props.params.id).then(()=>window.location.reload())}}
              label="Leave Group" />
          </div>
        </MuiThemeProvider>
      );

    } else if(!this.props.membership) {

      return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <div>
            <NavBar />
            <div className="group-page-header all-container">
            <h1>{this.props.params.groupname}</h1>
              <p>You aren't a member of this group! Please join to participate in the group.</p>
              <RaisedButton
                className="join-group-button"
                onClick={() => {this.props.joinGroup(this.props.params.id).then(()=>window.location.reload())}}
                label="Join Group"
                labelStyle={styles.labelStyle}
                backgroundColor={styles.backgroundColor}/>
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
