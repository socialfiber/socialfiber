import React, {Component} from 'react';
import { Link } from 'react-router';
import SignOut from './SignOut'

class NavBar extends Component {
  constructor(props){
    super(props)
    this.state={}
  }

  render(){
    return(
      <nav className="navbar">
        <div>
          <ul className="nav navbar-nav">
            <li className="navItem"><Link to='/signin'>Sign In </Link> </li>
            <li className="navItem"><Link to='/signup'>Sign Up </Link> </li>
            <li className="navItem"><Link to='/userquestionnaire'>Update Questionnaire</Link></li>
            <li className="navItem"><Link to='/userProfile'>Profile</Link></li>
            <li className="navItem"><Link to='/foodDiary'> Food Diary</Link></li>
            <li className="navItem"><Link to='/viewallgroups'> All Groups</Link></li>
            <li className="navItem"><Link to='/mygroups'> My Groups</Link></li>
            <li className="navItem"><Link to='/creategroup'> Create a Group</Link></li>
            <li className="navItem"><Link to='/myfriends'>My Friends</Link></li>
            <li className="navItem"><SignOut /></li>
          </ul>
        </div>
      </nav>
    )
  }
}


export default NavBar;
