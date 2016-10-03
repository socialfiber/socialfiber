import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { fetchGroupPosts } from '../actions/groups';
import Messages from './PostMessageBox';
import Comments from './comments';

class GroupWall extends Component {

  constructor(){
    super();
    this.state = {
      showReply: false
    }
  }

  showReplyForm(e){
    e.preventDefault();
    console.log('e:', e);
    this.setState({showReply: !this.state.showReply})
  }

//fetch current posts on wall
  //access groupID to pass in as param

    componentWillMount() {
      this.props.fetchGroupPosts(this.props.params.id);
      console.log('this props: ', this.props.myGroups.userGroups);
      console.log('this props: ', this.props.params);

    }




    renderGroupPosts() {
      return this.props.myGroups.groupPosts.map((post, indx)=> {
        const shortDate = post.createdAt.substr(0,10);
          return(
            <li className='list-group-item'>
              {shortDate}
              <strong> {post.username}: </strong>
              <span>{post.message}</span>
              <span><button onClick = {this.showReplyForm.bind(this)}> Reply </button></span>
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
          {this.state.showReply && <Comments />}
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
