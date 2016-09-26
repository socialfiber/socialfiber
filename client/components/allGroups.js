import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllGroups } from '../actions/groups';
import NavBar from './navbar';


class AllGroups extends Component {

  componentWillMount() {
    this.props.fetchAllGroups()
  }

  render(){
    return(
      <div>
        <NavBar />
          <h1>Find a Group</h1>
      </div>
    )
  }

}


function mapStateToProps(state) {
  return {
    allGroups: state.groups
  }
}

export default connect(mapStateToProps, { fetchAllGroups }) (AllGroups);
