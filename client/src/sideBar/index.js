import React, { Component } from 'react';
import { Sidebar, Segment, Menu, Icon } from 'semantic-ui-react';

export default class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = { backgroundColor: '' };
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
            <Menu.Item name='home'>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item name='write'>
              <Icon name='write' />
              Create
            </Menu.Item>
            <Menu.Item name='inbox'>
              <Icon name='inbox' />
              NoteBox
            </Menu.Item>
            <Menu.Item name='vcard outline'>
              <Icon name='vcard outline' />
              Flashcards
            </Menu.Item>
            <Menu.Item name='book'>
              <Icon name='book' />
              Library
            </Menu.Item>
            <Menu.Item name='student'>
              <Icon name='student' />
              Study Hall
            </Menu.Item>
            <Menu.Item name='winner'>
              <Icon name='winner' />
              Quizzlet
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>π
            <Segment basic style={{
                backgroundColor: '#ffd1a3',
                marginTop: '20px',
                marginRight: '100px',
                paddingRight: '75px',
                minHeight: '10005px',
              }}>
              <ContentPage changeBackgroundColor={ this.changeBackgroundColor }/>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}
