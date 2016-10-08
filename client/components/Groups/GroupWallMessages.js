import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchComments } from '../../actions/groups';
import GroupWallComments from './GroupWallComments';
import CommentBox from './CommentBox';
import RaisedButton from 'material-ui/RaisedButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class GroupWallMessages extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showReply: false
		}
		this.showReplyForm = this.showReplyForm.bind(this)
	}

	showReplyForm(e) {
		e.preventDefault();
		this.setState({
			showReply: !this.state.showReply
		});
		this.props.myGroups.commentObject = this.props.post;
	}

	render() {

		const postComments = this.props.post.comments.map((comment, idx) => <GroupWallComments key={idx} comment={comment} />);

		return (
			<MuiThemeProvider muiTheme={getMuiTheme()}>
				<div>
					<ul className="list-unstyled">
						<li className="list-group-item" style={{marginBottom:'5px'}}>
							{/* <div>{this.props.post.createdAt.substr(0,10)}</div> */}
							<div><strong>{this.props.post.username}</strong>: {this.props.post.message}</div>
							{this.state.showReply && <CommentBox />}
							<li>
								{postComments}
							</li>
						</li>
						<div style={{textAlign:'right'}}><RaisedButton onClick={this.showReplyForm} label="Reply"/></div>
					</ul>
				</div>
			</MuiThemeProvider>
		);

	}

}

const mapStateToProps = (state) => {
	return {
		myGroups: state.groups
	}
}

export default connect(mapStateToProps, { fetchComments })(GroupWallMessages);
