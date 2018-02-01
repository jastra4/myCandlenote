const isAuth = (authStatus, userId) => ({
  type: 'IS_AUTH',
  authStatus,
  userId,
});

export default isAuth;
