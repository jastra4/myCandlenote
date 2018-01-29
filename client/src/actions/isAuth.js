export const isAuth = (authStatus, username) => ({
  type: 'IS_AUTH',
  authStatus,
  username,
});
