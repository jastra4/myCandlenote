import React, { Component } from 'react';
import { Sidebar, Menu, Icon, Image, Header } from 'semantic-ui-react';
import MediaQuery from 'react-responsive';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SideBarConnected from '../sideBar';
import { removeCurrentUser } from '../actions/usersActions';
import './style.css';

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = { showSideBar: false };
  }

  resizeProfileImage(imageUrl) {
    this.state;
    const sizeIndex = imageUrl.indexOf('sz=') + 3;
    const newUrl = `${imageUrl.slice(0, sizeIndex)}20`;
    return newUrl;
  }

  render = () => (
    <div>
      <Sidebar as={Menu} animation='push' direction='top' visible={true} inverted>
        <Menu.Menu position="left">
          <Menu.Item>
            <span className="topbar-menu-text">CandleNote</span>
          </Menu.Item>
          <MediaQuery maxWidth={899}>
            <Menu.Item>
              <Icon name="sidebar" size="large"/>
            </Menu.Item>
          </MediaQuery>
        </Menu.Menu>
        <Menu.Menu position="right">

          {this.props.currentUser.userId !== '' ?
            <Menu.Item as={Link} to='/profile' name='user' onClick={() => { }}>
              <div style={{ marginRight: '5px' }}>
                <Image src={this.resizeProfileImage(this.props.currentUser.profileImage)} circular centered spaced="right" />
              </div>
              <span className="topbar-menu-text">{this.props.currentUser.username}</span>
            </Menu.Item>
            :
            <Menu.Item as={Link} to='/' name='user' onClick={() => { }}>
              <Icon name='user' size="large"/>
              <span className="topbar-menu-text">Login</span>
            </Menu.Item>}

          <Menu.Item as={Link} to='/home' name='logout' onClick={() => { this.props.removeCurrentUser(); }}>
            <Icon name='log out' size="large"/>
            <span className="topbar-menu-text">Logout</span>
          </Menu.Item>
        </Menu.Menu>
      </Sidebar>
      <SideBarConnected { ...this.props } />
    </div>
  );
}

const mapStateToProps = state => ({ currentUser: state.user.currentUser });

const mapDispatchToProps = dispatch => ({ removeCurrentUser: () => dispatch(removeCurrentUser()) });

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopBar);
