import React, { Component } from 'react';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
// import moment from 'moment';

class ChatWindow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // console.log("timestamp: ", moment().format('h:mm:ss a'));
    this.socket = io('/') // Triggers on connection event on the web server.
    this.socket.on('message', (message) => { // Event listener
      this.setState({ messages: [message, ...this.state.messages] });
      this.state.messages.map((message) => {
        console.log("message: ", message)
      })
    });
  }

  handleSubmit(e) {
    // console.log("Submitted: ", e.target.value);
    const body = e.target.value;
    if(e.keyCode === 13 && body) {
      const message = {
        body,
        from: Cookies.get('username')
      }
      this.setState({ messages: [message, ...this.state.messages] });
      this.socket.emit('message', body, message.from);
      console.log("emits: ", message.from + ": " + body);
      e.target.value = '';
    }
  }

  render() {
    const messages = this.state.messages.map((message, index) => {
      return <li key={index}><b>{message.from}:</b>{message.body}</li>
    });
    return (
      <div>
        <h3>Live Chat</h3>
        <input type="text" placeholder="Enter a message..." onKeyUp={this.handleSubmit}/>
        {messages}
      </div>
    );
  }
}

export default ChatWindow;
