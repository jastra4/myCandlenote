import React, { Component } from 'react';
import { Sidebar, Menu, Icon, Image } from 'semantic-ui-react';
import MediaQuery from 'react-responsive';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SideBarConnected from '../sideBar';
import HideableSideBar from '../sideBar/HideableSideBar';
import { removeCurrentUser } from '../actions/usersActions';
import './style.css';

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = { showSideBar: false };

    this.toggleSideBar = this.toggleSideBar.bind(this);
  }

  resizeProfileImage(imageUrl) {
    this.state;
    const sizeIndex = imageUrl.indexOf('sz=') + 3;
    const newUrl = `${imageUrl.slice(0, sizeIndex)}20`;
    return newUrl;
  }

  toggleSideBar() {
    this.setState({ showSideBar: !this.state.showSideBar });
  }

  render = () => (
    <div>
      <Sidebar as={Menu} borderless animation='push' direction='top' visible={true} inverted>
        <Menu.Menu position="left">
          <MediaQuery minWidth="900">
            <Menu.Item>
              <span className="topbar-menu-text">CandleNote</span>
            </Menu.Item>
          </MediaQuery>
          <MediaQuery maxWidth={899}>
            <Menu.Item onClick={this.toggleSideBar}>
              <Icon name="sidebar" size="large" />
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
      <MediaQuery minWidth={900}>
        <SideBarConnected { ...this.props } />
      </MediaQuery>
      <MediaQuery maxWidth={899}>
        <HideableSideBar
          { ...this.props }
          visible={this.state.showSideBar}
          toggleSideBar={this.toggleSideBar}
        />
      </MediaQuery>
    </div>
  );
}

const mapStateToProps = state => ({ currentUser: state.user.currentUser });

const mapDispatchToProps = dispatch => ({ removeCurrentUser: () => dispatch(removeCurrentUser()) });

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopBar);
