import React, {Component} from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';


class SplashPg extends Component {

	render() {

		return (
			<div className='splashpg-div all-container'>
				<nav className='signin-nav'>
					<ul>
				    <li className="navItem splashpg">
				    	<div className="signinlinkdiv">
				    		<Link className="signin" to='/signin'>
				    			Sign In
				    		</Link>
				    	</div>
				    </li>
				    <li className="navItem splashpg">
				    	<div className="signuplinkdiv">
				    		<Link className="signup" to='/signup'>
				    			Sign Up
				    		</Link>
				    	</div>
				    </li>
					</ul>
				</nav>
				<div className="jumbotron" id="header-parent">
					<div id="header-child">
						<h1 className='header-splashpg'>
							social fiber.
						</h1>
						<div className="oneliner">
							<p>live healthy, with friends</p>
						</div>
					</div>
				</div>
			</div>
		);

	}

}

export default SplashPg;
