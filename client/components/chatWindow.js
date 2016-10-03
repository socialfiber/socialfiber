import React, { Component } from 'react';
import io from 'socket.io-client';


class ChatWindow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
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
    e.preventDefault();
    if(e.keyCode === 13 && body) {
      const message = {
        body,
        from: "Me"
      }
      this.setState({ messages: [message, ...this.state.messages] });
      this.socket.emit('message', body)
      // console.log("emits: ", body)
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
        <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Enter a message..." onKeyUp={this.handleSubmit}/>
        </form>
        {messages}
      </div>
    );
  }
}

export default ChatWindow;
