import React, {Component} from 'react';
import { Link } from 'react-router';
import SignOut from './SignOut'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class NavBarSplash extends Component {

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
            <li className="home navItem active"><Link className="signin" to='/signin'> Sign In</Link></li>
            <li className="home navItem active"><Link className="signup" to='/signup'> Sign Up</Link></li>
          </ul>
        </div>
        {/* <h1 className='navheader'>social fiber.</h1> */}
      </nav>
      </MuiThemeProvider>
    );
  }
}

export default NavBarSplash;
