import React, { Component } from 'react';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import { fetchChatHistory, storeChatHistory } from '../actions/chatWindow';


class ChatWindow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.socket = io.connect(); // Triggers on connection event on the web server.
    const room = this.props.roomId;

    this.socket.on('connect', () => {
      this.socket.emit('room', room);
    });

    this.socket.on('message', (message) => { // Event listener
      const currentMessages = this.state.messages;
      currentMessages.push(message);
      this.setState({ messages: currentMessages });
    });

    // this.props.fetchChatHistory(room);
  }

  componentWillUnmount() {
    console.log("Component unmounted");
    // this.props.storeChatHistory(this.state.messages, this.props.roomId);
  }

  handleSubmit(e) {
    // console.log("Submitted: ", e.target.value);
    const body = e.target.value;
    if(e.keyCode === 13 && body) {
      const message = {
        body,
        username: Cookies.get('username'),
        room_id: this.props.roomId
      }
      const currentMessages = this.state.messages;
      currentMessages.push(message);
      this.setState({ messages: currentMessages });
      this.socket.emit('message', message);
      console.log("emits: ", message.username + ": " + body);
      e.target.value = '';
    }
  }

  render() {
    const messages = this.state.messages.map((message, index) => {
      return <li key={index}><b>{message.username}: </b>{message.body}</li>
    });

    return (
      <div style={{ margin: 1, border: '1px solid', borderColor: '#cccccc', width: '300px', height: '300px', position: 'absolute', bottom: 0, right: 0, backgroundColor: 'white' }}>
        <div>
          <div style={{ width: '300px' , height: '280px', overflow: 'scroll' }}>{messages}</div>
          <input type="text" placeholder="Enter a message..." style={{ position: 'relative', bottom: 0, width: '247px', margin: 1}} onKeyUp={this.handleSubmit} /><button type="button" onClick={this.handleSubmit}>Send</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    roomId: state.chatWindow.roomId,
    myFriends: state.friends.myFriends
    // chatHistory: state.
  }
}

export default connect(mapStateToProps, { fetchChatHistory, storeChatHistory })(ChatWindow);
