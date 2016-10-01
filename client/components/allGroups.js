import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllGroups } from '../actions/groups';
import AllGroupsIndividual from './AllGroupsIndividual';
import NavBar from './navbar';


class AllGroups extends Component {
  componentWillMount() {
    this.props.fetchAllGroups()
  }

  renderGroups(){
    return this.props.groups.allGroups.map((group, idx)=> {
        return (
            <li className='list-group-item' key={idx}>

              <AllGroupsIndividual group={group}/>
            </li>
          )
    })
  }


  render(){
    return(
      <div>
        <NavBar />
          <h1>Find a Group</h1>
          <ul className='list-group'>
            {this.renderGroups()}
          </ul>
      </div>
    )
  }

}


function mapStateToProps(state) {
  return {
    groups: state.groups
  }
}

export default connect(mapStateToProps, { fetchAllGroups }) (AllGroups);
