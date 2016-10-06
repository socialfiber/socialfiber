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
				<img src ='https://images.unsplash.com/photo-1473631706567-f3724ae047b5?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&s=2b42cea7ba5c5603fed6b0e241c0cd14'></img>
			</div>
		);
	}

}

export default SplashPg;