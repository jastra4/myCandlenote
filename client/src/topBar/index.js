import React, { Component } from 'react';
import { Sidebar, Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import OurSideBar from '../sideBar';
import { removeCurrentUser } from '../actions/usersActions';

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render = () => (
    <div>
      <Sidebar as={Menu} animation='push' direction='top' visible={true} inverted>
        <Menu.Item name='CandleNote' position='right'>
        </Menu.Item>

        {this.props.user.userId !== -1 ?
          <Menu.Item as={Link} to='/profile' name='user' position='right' onClick={() => { }}>
            <Icon name='user' />
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
