import React, {Component} from 'react';
import { Link } from 'react-router';
import SignOut from './SignOut'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class NavBar extends Component {

  constructor(props) {
    super(props)
    this.state={}
  }

  render() {

    return(
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <nav className="navbar navbar-fixed-top">
          <div>
            <ul className="nav navbar-nav">
              <li className="home navItem active"><Link className="homelink" to='/userprofile'>Home</Link></li>
              <li className="dropdown active">
                <a href="#" className="dropbtn">Browse</a>
                <div className="dropdown-content">
                  <li className="dropdown-item navItem"><Link to='/viewallgroups'>All Groups</Link></li>
                  <li className="dropdown-item navItem"><Link to='/viewallusers'>All Users</Link></li>
                </div>
              </li>
              <li className="navbar-right signout-button"><SignOut /></li>
            </ul>
          </div>
          <h1 className='navheader'>social fiber.</h1>
        </nav>
      </MuiThemeProvider>
    );
  }
}

export default NavBar;
