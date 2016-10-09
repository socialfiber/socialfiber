import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submitSignOut } from '../../actions/auth';
import RaisedButton from 'material-ui/RaisedButton';


class SignOut extends Component {

  render() {

    return (
    	<div>
    		<RaisedButton
          onClick={this.props.submitSignOut}
          backgroundColor="#D8A154"
          labelColor="#FFFFFF"
          label="Sign Out"/>
    	</div>
    );

  }

}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { submitSignOut })(SignOut);
