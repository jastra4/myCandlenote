import React, { Component } from 'react';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react';
import MenuBar from '../menuBar';

class SidebarTopPush extends Component {
  render() {
    return (
      <div>
          <Sidebar as={Menu} animation='push' direction='top' visible={true}  inverted>
            <Menu.Item name='CandleNote' position='right'>

            </Menu.Item>
            <Menu.Item name='logout' position='right'>
              <Icon name='log out' />
              Logout
            </Menu.Item>
          </Sidebar>
            <MenuBar />
      </div>
    )
  }
}

export default SidebarTopPush
// <MenuBar />
