import React, { Component } from 'react';
import { Sidebar, Menu, Icon } from 'semantic-ui-react';
import OurSideBar from '../sideBar';

export default class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render = () => (
    <div>
      <Sidebar as={Menu} animation='push' direction='top' visible={true} inverted>
        <Menu.Item name='CandleNote' position='right'>
        </Menu.Item>
        <Menu.Item name='logout' position='right'>
          <Icon name='log out' />
          Logout
        </Menu.Item>
      </Sidebar>
      <OurSideBar { ...this.props }/>
    </div>
  );
}
