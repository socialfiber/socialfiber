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
            <li className="home navItem"><Link className="homelink" to='/userprofile'>Home</Link></li>
            <li className="dropdown">
              <a href="#" className="dropbtn">Browse</a>
              <div className="dropdown-content">
                <li className="dropdown-item navItem"><Link to='/viewallgroups'>All Groups</Link></li>
                <li className="dropdown-item navItem"><Link to='/viewallusers'>All Users</Link></li>
              </div>
            </li>
          </ul>
        </div>
        <div className="signoutbutton-item"><SignOut /></div>
        <h1 className='navheader'>social fiber.</h1>
      </nav>
    );

  }

}

export default NavBar;
