import React, {Component} from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';


class SplashPg extends Component {

	this.props.callCarousel = {$("#myCarousel").carousel()}
	render() {
		return (
			{this.props.callCarousel}
			<div id='myCarousel' className = 'carousel slide' data-slide='carousel'>
				<ol class="carousel-indicators">
					<li data-target="#myCarousel" data-slide-to="0" class="active"></li>
					<li data-target="#myCarousel" data-slide-to="1"></li>
					<li data-target="#myCarousel" data-slide-to="2"></li>
				</ol>


				<div class="carousel-inner" role="listbox">
					<div class="item active">
						<img src="../assets/orangetree.jpeg" alt="orange"/>
					</div>

					<div class="item">
						<img src="../assets/lemonsandlimes.jpeg" alt="lemsnlimes"/>
					</div>

					<div class="item">
						<img src="../assets/blueberrytree.jpeg" alt="blueberrytree"/>
					</div>
				</div>
				<a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
					<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
					<span class="sr-only">Previous</span>
				</a>
				<a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
					<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
					<span class="sr-only">Next</span>
				</a>
			</div>
		);
	}
}

export default SplashPg;
