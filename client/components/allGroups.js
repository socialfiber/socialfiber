import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllGroups } from '../actions/groups';
import NavBar from './navbar';


class AllGroups extends Component {
  componentWillMount() {
    this.props.fetchAllGroups()
  }

  renderGroups(){
    console.log("this.props.allGroups: ", this.props.allGroups)
    return this.props.allGroups.map((group, idx)=> {
        return <li className='list-group-item'>
          <span className="pull-xs-right">{group.name}</span>
          <strong>{group.description}</strong>
        </li>
    }
  )
}


  render(){
    console.log("func: ", this.renderGroups())
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
    allGroups: state.groups.all
  }
}

export default connect(mapStateToProps, { fetchAllGroups }) (AllGroups);
