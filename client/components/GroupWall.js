import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { fetchGroupPosts } from '../actions/groups';
import Messages from './PostMessageBox';

class GroupWall extends Component {

//fetch current posts on wall
  //access groupID to pass in as param

    componentWillMount() {
      this.props.fetchGroupPosts(this.props.params.id);
    }

    renderGroupPosts() {
      return this.props.myGroups.groupPosts.map((post, indx)=> {
          return(
            <li className='list-group-item'>
              <strong>{post.username}: </strong>
              <span>{post.message}</span>
            </li>
          )
      })
    }

    render(){
      return(
        <div>
          <h1>Group Wall</h1>
          <Messages />
          <ul>
          {this.renderGroupPosts()}
          </ul>
        </div>
      )
    }
}

const mapStateToProps = (state) => {
  return {
    myGroups: state.groups
  }
}

export default connect(mapStateToProps, {fetchGroupPosts})(GroupWall)
