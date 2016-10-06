import React, {Component} from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';


class SplashPg extends Component {

	render() {
		return (
			<div className = 'splashpg-div'>
				<nav className="navbar">
					<ul className="nav navbar-nav">
						<li className="navItem"><Link to='/signin'>Sign In</Link></li>
						<li className="navItem"><Link to='/signup'>Sign Up</Link></li>
					</ul>
				</nav>
				<h1>welcome</h1>
			</div>
		);
	}

}

export default SplashPg;
