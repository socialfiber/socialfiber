import React, {Component} from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';


class SplashPg extends Component {
	render() {
		return (
			<div className='splashpg-div'>
			<nav>
			    <li className="navItem splashpg"><Link className='signinlink' to='/signin'> Sign In</Link></li>
			    <li className="navItem splashpg"><Link className='signinlink' to='/signup'> Sign Up</Link></li>
			</nav>
			<div className="jumbotron">
				<h1 className='header-splashpg'>social fiber.</h1>
				<p className='oneliner'>live healthy, with friends</p>
			</div>
			</div>
		);
	}
}

export default SplashPg;
