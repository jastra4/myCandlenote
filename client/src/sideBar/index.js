import React, { Component } from 'react';
import { Sidebar, Segment, Menu, Icon } from 'semantic-ui-react';

export default class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
              Notes
            </Menu.Item>
            <Menu.Item name='vcard outline'>
              <Icon name='vcard outline' />
              Flashcards
            </Menu.Item>
            <Menu.Item name='clone'>
              <Icon name='clone' />
              Decks
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
          <Sidebar.Pusher>
            <Segment basic style={{
                backgroundColor: 'red',
                marginTop: '35px',
                marginRight: '100px',
                paddingRight: '75px',
                minHeight: '10005px',
              }}>
              <ContentPage />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}
