import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBar from './navbar';


class AllGroups extends Component {

  componentWillMount() {
    //need to fetch all group data
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
