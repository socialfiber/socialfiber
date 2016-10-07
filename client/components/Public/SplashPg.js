import React, {Component} from 'react';
import {React_Boostrap_Carousel} from 'react-boostrap-carousel';
import {render} from 'react-dom';
import {Link} from 'react-router';


class SplashPg extends Component {
	render() {
		return (
			<div className='splashpg-div' style={{height:"100%",margin:0}}>
				<React_Boostrap_Carousel animation={true} className="carousel-fade">
					<div className="carousel-item-one" style={{backgroundColor:"skyblue"}}>
						123
					</div>
					<div style={{backgroundColor:"aqua"}}>
						456
					</div>
					<div style={{backgroundColor:"lightpink"}}>
						789
					</div>
				</React_Boostrap_Carousel>
			</div>
		);
	}
}

export default SplashPg;
