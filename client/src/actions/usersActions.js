export const setCurrentUser = (userInfo) => ({
  type: 'SET_CURRENT_USER',
  payload: userInfo,
});

export const removeCurrentUser = () => ({
  type: 'SET_CURRENT_USER',
});