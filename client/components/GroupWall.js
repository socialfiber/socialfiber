import React, { Component } from 'react';
import { connect } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { FETCH_GROUP_POSTS }

class GroupWall extends Component {

//fetch current posts on wall
    componentWillMount() {
      this.props.fetchGroupPosts()
    }

    renderGroupPosts() {
      return this.props.allGroupPosts.map((post, indx)=> {
          return(
            <li className='list-group-item'>
              <strong>{post.username}</strong>
              <span>{post.message}</span>
            </li>
          )
      })
    }


    render(){
      return(

      )
    }
}
