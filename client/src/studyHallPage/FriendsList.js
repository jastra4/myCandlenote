import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Friend from './Friend';
import { setUsers } from '../actions/usersActions';
import PropTypes from 'prop-types';

class FriendsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { friends: [] };
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps: ', nextProps.contacts);
    const users = Object.keys(nextProps.contacts).map(key => nextProps.contacts[key]);
    this.setState({ friends: users });
    // console.log('users: ', users);
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers() {
    return axios.get('/users')
      .then((users) => {
        const usersList = users.data;
        console.log('usersList: ', usersList);
        this.props.loadUsers(usersList);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onClick() {
    console.log(this.state)
    // console.log('props.contacts: ', this.props.contacts);
    // console.log(Object.keys(this.props.contacts).map(key => this.props.contacts[key]));
  }

  render() {
    return (
      <div>
        <h4>Friends</h4>
        <div> {this.state.friends.map((friend, i) => (
          <Friend key={i} friend={friend} changeChat={this.props.changeChat}/>
        ))} </div>
        <button onClick={this.onClick.bind(this)}>test</button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => (
  { loadUsers: usersList => dispatch(setUsers(usersList)) }
);

const mapStateToProps = (state) => {
  console.log('state: ', state);
  const usersById = state.users.byId;
  return { contacts: usersById };
};

const FriendsListConnected = connect(mapStateToProps, mapDispatchToProps)(FriendsList);

export default FriendsListConnected;
