import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Sidebar, Segment, Menu, Icon } from 'semantic-ui-react';

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: '',
      activeItem: 'home',
      newMessage: 'noMessages',
    };
    this.activeListener = this.activeListener.bind(this);
    this.resetNewMessage = this.resetNewMessage.bind(this);
  }

  handleItemClick = (e, { name }) => {
    if (name === 'student') {
      this.resetNewMessage();
    }
    this.setState({ activeItem: name });
  }

  changeBackgroundColor = (backgroundColor) => {
    this.setState({ backgroundColor });
  }

  componentDidMount() {
    this.activeListener();
  }

  activeListener() {
    if (this.props.socket !== undefined) {
      this.props.socket.on('new message', () => {
        this.setState({ newMessage: 'newMessage' });
      });
    } else {
      window.setTimeout(this.activeListener, 500);
    }
  }

  resetNewMessage() {
    this.setState({ newMessage: 'noMessages' });
  }

  render() {
    const { ContentPage } = this.props;
    return (
      <div>
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='push' width='thin' visible={true} icon='labeled' vertical inverted>
            <Link to='/'>
              <Menu.Item name='home' active={true} onClick={ this.handleItemClick }>
                <Icon name='home' />
                Home
              </Menu.Item>
            </Link>
            <Link to='/notepad'>
              <Menu.Item name='write' onClick={ this.handleItemClick }>
                <Icon name='write' />
                Create
              </Menu.Item>
            </Link>
            <Link to='/notebox'>
              <Menu.Item name='inbox' onClick={ this.handleItemClick }>
                <Icon name='inbox' />
                NoteBox
              </Menu.Item>
            </Link>
            <Link to='/decks'>
              <Menu.Item name='clone' onClick={this.handleItemClick}>
                <Icon name='clone' />
                Decks
              </Menu.Item>
            </Link>
            <Link to='/flashcards'>
              <Menu.Item name='vcard outline' onClick={ this.handleItemClick }>
                <Icon name='vcard outline' />
                Flashcards
              </Menu.Item>
            </Link>
            <Link to='/library'>
              <Menu.Item name='book' onClick={ this.handleItemClick }>
                <Icon name='book' />
                Library
              </Menu.Item>
            </Link>
            <Link to='/studyhall'>
              <Menu.Item name='student' onClick={ this.handleItemClick }>
                <Icon name='student' />
                Study Hall
                <div className={`${this.state.newMessage}`}>!</div>
              </Menu.Item>
            </Link>
            <Link to='/schedule'>
              <Menu.Item name='calendar' onClick={this.handleItemClick}>
                <Icon name='calendar' />
                Schedule
              </Menu.Item>
            </Link>
            <Link to='/quizzlet'>
              <Menu.Item name='winner' onClick={ this.handleItemClick }>
                <Icon name='winner' />
                Quizzlet
              </Menu.Item>
            </Link>
          </Sidebar>
          <Sidebar.Pusher>π
            <Segment basic style={{
                backgroundColor: '#ffd1a3',
                marginTop: '20px',
                marginRight: '100px',
                paddingRight: '75px',
                minHeight: '10005px',
              }}>
              <ContentPage {...this.props} changeBackgroundColor={ this.changeBackgroundColor }/>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

const mapStateToProps = state => ({ socket: state.activeSocket.socket });

const SideBarConnected = connect(mapStateToProps, null)(SideBar);

export default SideBarConnected;
