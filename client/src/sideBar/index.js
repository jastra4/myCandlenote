import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar, Segment, Menu, Icon } from 'semantic-ui-react';

export default class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: '',
      activeItem: 'home',
    };
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  }

  changeBackgroundColor = (backgroundColor) => {
    this.setState({ backgroundColor });
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
