import React, { Component } from 'react';
import { Sidebar, Menu, Icon, Image, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import OurSideBar from '../sideBar';
import { removeCurrentUser } from '../actions/usersActions';

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  resizeProfileImage(imageUrl) {
    this.state;
    const sizeIndex = imageUrl.indexOf('sz=') + 3;
    const newUrl = `${imageUrl.slice(0, sizeIndex)}25`;
    return newUrl;
  }

  render = () => (
    <div>
      <Sidebar as={Menu} animation='push' direction='top' visible={true} inverted>
        <Menu.Item name='CandleNote' position='right'>
        </Menu.Item>

        {this.props.user.userId !== '' ?
          <Menu.Item as={Link} to='/profile' name='user' position='right' onClick={() => { }}>
            <div style={{ marginRight: '5px' }}>
              <Image src={this.resizeProfileImage(this.props.user.profileImage)} circular centered spaced="right" />
            </div>
            {this.props.user.username}
          </Menu.Item>
          :
          <Menu.Item as={Link} to='/' name='user' position='right' onClick={() => { }}>
            <Icon name='user' />
            Login
          </Menu.Item>}

        <Menu.Item as={Link} to='/home' name='logout' position='right' onClick={ () => { this.props.removeCurrentUser(); } }>
            <Icon name='log out' />
            Logout
        </Menu.Item>
      </Sidebar>
      <OurSideBar { ...this.props }/>
    </div>
  );
}

const mapStateToProps = state => ({ user: state.user });

const mapDispatchToProps = dispatch => ({ removeCurrentUser: () => dispatch(removeCurrentUser()) });

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopBar);
