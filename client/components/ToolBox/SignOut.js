import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submitSignOut } from '../../actions/auth';
import RaisedButton from 'material-ui/RaisedButton';


class SignOut extends Component {

  render() {

    const styles = {
      labelStyle: {
        color: 'white',
        textTransform: 'capitalize'
      },
      backgroundColor: '#D8A154'
    };

    return (
    	<div>
    		<RaisedButton
          onClick={this.props.submitSignOut}
          backgroundColor={styles.backgroundColor}
          label="Sign Out"
          labelStyle={styles.labelStyle}/>
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
