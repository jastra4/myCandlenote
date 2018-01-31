import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import { connect } from 'react-redux'; // redux
import Message from './Message';
import { setMessages } from '../actions/messagesActions'; // redux

class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      messages: ['hello world'],
    };

    props.socket.on('new message', (data) => {
      const msg = `to ${data.to}: ${data.text}`;
      this.setState({ messages: this.state.messages.concat([msg]) });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const msg = {
      text: $('#message').val(),
      to: this.props.chat,
    };
    this.props.socket.emit('send message', msg);
    $('#message').val('');
  }

  componentDidMount() {
    return axios.get('/messages')
      .then((messages) => {
        
        // add to store // redux
        // const messageInfo = {
        //   id: messages.data._id,
        //   sentBy: messages.data.sentBy,
        //   to: messages.data.to,
        //   test: messages.data.text,
        //   timeStamp: messages.data.timeStamp,
        // };
        const messageInfo = messages.data;
        this.props.loadMessages(messageInfo);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <div className="chatHeader">
          <h4>{this.props.chat}</h4>
        </div>
        <div className="chatMessages">
          {this.props.messages.map((message, i) => (
            <Message key={i} message={message.text}/>
          ))}
        </div>
        <div className="chatInput">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input id="message" className="input" placeholder="type a message"></input>
          </form>
        </div>
      </div>
    );
  }
}

// redux
const mapDispatchToProps = dispatch => (
  { loadMessages: messageInfo => dispatch(setMessages(messageInfo)) }
);

// export default ChatBox;

// redux
const mapStateToProps = state => {
  // { messages: state.messages.byId }
  const messagesById = state.messages.byId;
  const messagesForChat = Object.keys(messagesById).map(key => messagesById[key]);
  console.log('MESSAGES: ', messagesForChat);
  return {
    messages: messagesForChat
  };
};

// const mapStateToProps = (state) => {
//   console.log('state: ', state);
//   const cardsById = state.flashcards.byId;
//   const cardsForDeck = Object.keys(cardsById).map(key => cardsById[key])
//     .filter(card => card.deckId === state.decks.currentDeck.id);

//   return {
//     cards: cardsForDeck,
//     currentDeck: state.decks.currentDeck,
//     decksById: state.decks.byId,
//   };
// };

// redux
const ChatBoxConnected = connect(mapStateToProps, mapDispatchToProps)(ChatBox);
// redux
export default ChatBoxConnected;
