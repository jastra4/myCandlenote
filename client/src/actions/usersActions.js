import axios from 'axios';

export const setCurrentUser = userInfo => ({
  type: 'SET_CURRENT_USER',
  payload: userInfo,
});

export const setUsers = userList => ({
  type: 'SET_USERS',
  payload: userList,
});

// export const getusers = userList => (
// 	dispatch => (
// 		axios.get('/users')
// 			.then((res) => {
// 				disatch(setUsers(res.data));
// 			})
// 	)
// );

// return axios.get('/users')
//   .then((users) => {
//     const usersList = users.data;
//     console.log('usersList: ', usersList);
//     this.props.loadUsers(usersList);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

export const getUser = userId => (
  dispatch => (
    axios.get(`/user/${userId}`)
      .then((res) => {
        console.log('Got user:', res.data);
        dispatch(setCurrentUser(res.data));
      }, err => console.log(err))
  )
);

export const removeCurrentUser = () => ({ type: 'REMOVE_CURRENT_USER' });
