import React, { Component } from 'react';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import { fetchChatHistory, storeChatHistory } from '../actions/chatWindow';


class ChatWindow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      newMessages: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleOnClick = this.handleOnClick.bind(this);
  }

  componentWillMount() {
    console.log("Component Mounted")
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

    this.props.fetchChatHistory(this.props.roomId)
    .then(() => {
      this.setState({ messages: this.props.chatHistory });
    });
  }

  componentWillUnmount() {
    console.log("Component unmounted");
    this.props.storeChatHistory(this.state.newMessages, this.props.roomId);
    this.setState({ newMessages: [] }) // Empty out newMessages
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

      const newMessages = this.state.newMessages;
      newMessages.push(message);
      this.setState({ newMessages: newMessages });

      const currentMessages = this.state.messages;
      currentMessages.push(message);
      this.setState({ messages: currentMessages });
      this.socket.emit('message', message);
      console.log("emits: ", message.username + ": " + body);
      e.target.value = '';
    }
  }

  handleOnClick(e) {
    const body = e.target.value;
    if(body) {
      const message = {
        body,
        username: Cookies.get('username'),
        room_id: this.props.roomId
      }

      const newMessages = this.state.newMessages;
      newMessages.push(message);
      this.setState({ newMessages: newMessages });

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
          <input type="text" placeholder="Enter a message..." style={{ position: 'relative', bottom: 0, width: '247px', margin: 1}} onKeyUp={this.handleSubmit} /><button type="button" onClick={() => this.handleOnClick(event)}>Send</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    roomId: state.chatWindow.roomId,
    myFriends: state.friends.myFriends,
    chatHistory: state.chatWindow.chatHistory
  }
}

export default connect(mapStateToProps, { fetchChatHistory, storeChatHistory })(ChatWindow);
