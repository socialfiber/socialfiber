import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  }
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
