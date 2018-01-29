import React, { Component } from 'react';
import { Sidebar, Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
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
        <Menu.Item as={Link} to='/home' name='logout' position='right' onClick={ () => {} }>
            <Icon name='log out' />
            Logout
        </Menu.Item>
      </Sidebar>
      <OurSideBar { ...this.props }/>
    </div>
  );
}
