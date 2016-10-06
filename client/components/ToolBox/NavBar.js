import React, {Component} from 'react';
import { Link } from 'react-router';
import SignOut from './SignOut'


class NavBar extends Component {

  constructor(props) {
    super(props)
    this.state={}
  }

  render() {

    return(
      <nav className="navbar">
        <div>
          <ul className="nav navbar-nav">
            <li className="navItem"><Link to='/userprofile'>Home</Link></li>
            <li className="navItem"><Link to='/viewallgroups'> All Groups</Link></li>
            <li className="navItem"><SignOut /></li>
          </ul>
        </div>
      </nav>
    );

  }

}

export default NavBar;
