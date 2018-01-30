export const isAuth = (authStatus, userId) => ({
  type: 'IS_AUTH',
  authStatus,
  userId,
});
