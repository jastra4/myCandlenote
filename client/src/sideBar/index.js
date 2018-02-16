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
    const { activeItem } = this.state;
    return (
      <div>
        <Sidebar.Pushable as={Segment} borderless className="main-pushable-segment" overflow="scroll">
          <Sidebar as={Menu} className="main-sidebar-left" animation='push' width='thin' visible={true} icon='labeled' vertical inverted>
            <Link to='/profile'>
              <Menu.Item name='home' active={activeItem === 'home'}onClick={ this.handleItemClick }>
                <Icon name='home' />
                Home
              </Menu.Item>
            </Link>
            <Link to='/notepad'>
              <Menu.Item name='write' active={activeItem === 'write'} onClick={ this.handleItemClick }>
                <Icon name='write' />
                Create
              </Menu.Item>
            </Link>
            <Link to='/notebox'>
              <Menu.Item name='inbox' active={activeItem === 'inbox'} onClick={ this.handleItemClick }>
                <Icon name='inbox' />
                NoteBox
              </Menu.Item>
            </Link>
            <Link to='/decks'>
              <Menu.Item name='clone' active={activeItem === 'clone'} onClick={this.handleItemClick}>
                <Icon name='clone' />
                Decks
              </Menu.Item>
            </Link>
            <Link to='/flashcards'>
              <Menu.Item name='vcard outline' active={activeItem === 'vcard outline'} onClick={ this.handleItemClick }>
                <Icon name='vcard outline' />
                Flashcards
              </Menu.Item>
            </Link>
            <Link to='/library'>
              <Menu.Item name='book' active={activeItem === 'book'} onClick={ this.handleItemClick }>
                <Icon name='book' />
                Library
              </Menu.Item>
            </Link>
            <Link to='/studyhall'>
              <Menu.Item name='student' active={activeItem === 'student'} onClick={ this.handleItemClick }>
                <Icon name='student'/>
                Study Hall
                <i className={`comment outline icon ${this.state.newMessage}`} ></i>
              </Menu.Item>
            </Link>
            <Link to='/schedule'>
              <Menu.Item name='calendar' active={activeItem === 'calendar'} onClick={this.handleItemClick}>
                <Icon name='calendar' />
                Schedule
              </Menu.Item>
            </Link>
            <Link to='/video-conference' peer={this.props.peer}>
              <Menu.Item name='video-conference' active={activeItem === 'video-conference'} onClick={this.handleItemClick}>
                <Icon name='video camera' />
                Video Conference
              </Menu.Item>
            </Link>
            <Link to='/simonSays'>
              <Menu.Item name='winner' active={activeItem === 'winner'} onClick={ this.handleItemClick }>
                <Icon name='winner' />
                Simon Says
              </Menu.Item>
            </Link>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic className="main-body-segment mainPageArea">
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
