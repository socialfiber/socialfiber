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
		const styles = {
			labelStyle: {
				textTransform: 'capitalize'
			}
		};

		return (
			<MuiThemeProvider muiTheme={getMuiTheme()}>
				<div>
					<ul className="list-unstyled">
						<li className="list-group-item group-message" style={{marginBottom:'5px'}}>
							<div>
								<strong>{this.props.post.username}</strong>
								: {this.props.post.message}
							</div>
							<ul>
								<li className="group-comments">
									{postComments}
								</li>
							</ul>
							<div>
								{this.state.showReply && <CommentBox />}
							</div>
							<div style={{textAlign:'center'}}>
								<RaisedButton
									onClick={this.showReplyForm}
									label="Reply"
									labelStyle={styles.labelStyle}
								/>
							</div>
						</li>
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
