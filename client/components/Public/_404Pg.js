import React, { Component } from 'react';
import { Link } from 'react-router';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class _404Pg extends Component {

  render() {

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div className="container all-container">
          <div className="row">
            <div className="col-sm-6 col-md-4 col-md-offset-4">
              <div className="account-wall">
                <h1>
                  Page Not Found!
                </h1>
                <Link to={'/'} className="text-center">
                  Go Back
                </Link>
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );

  }

}

export default _404Pg;
