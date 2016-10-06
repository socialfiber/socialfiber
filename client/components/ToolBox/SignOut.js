import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submitSignOut } from '../../actions/auth'


class SignOut extends Component {

  render() {
    return (
    	<div>
    		<button onClick={this.props.submitSignOut}>Sign Out</button>
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
