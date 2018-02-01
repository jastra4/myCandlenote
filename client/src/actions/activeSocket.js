const activeSocket = (socket, username) => ({
  type: 'ACTIVE_SOCKET',
  socket,
  username,
});

export default activeSocket;
