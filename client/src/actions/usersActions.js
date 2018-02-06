import axios from 'axios';

export const setCurrentUser = userInfo => ({
  type: 'SET_CURRENT_USER',
  payload: userInfo,
});

export const setUsers = userList => ({
  type: 'SET_USERS',
  payload: userList,
});

export const getUser = userId => (
  dispatch => (
    axios.get(`/user/${userId}`)
      .then((res) => {
        console.log('Got user:', res.data);
        dispatch(setCurrentUser(res.data));
      }, err => console.log(err))
  )
);

export const setCurrentFriends = friends => ({
  type: 'SET_CURRENT_FRIENDS',
  payload: friends,
});

export const getFriends = userId => (
  dispatch => (
    axios.post('/api/userFriends', { userId })
      .then((res) => {
        console.log('Friends:', res.data);
        dispatch(setCurrentFriends(res.data));
      }, err => console.log(err))
  )
);

export const removeCurrentUser = () => ({ type: 'REMOVE_CURRENT_USER' });
