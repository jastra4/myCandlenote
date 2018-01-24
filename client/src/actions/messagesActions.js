import axios from 'axios';

export const addMessage = (messageInfo) => ({
  type: 'ADD_MESSAGE',
  payload: messageInfo,
});

export const setMessages = (messages) => ({
  type: 'SET_MESSAGES',
  payload: messages
});

export const getMessages = (userId) => {
  return (dispatch) => {
    return axios.get('/messages/' + userId)
      .then(res => {
        dispatch(setMessages(res.data));
      }, err => console.log(err));
  }
}

export const setCurrentMessage = (messageId) => ({
  type: 'SET_CURRENT_MESSAGE',
  payload: { id: messageId }
});

export const deleteMessage = (messageId) => {
  return (dispatch) => {
    return axios.post('/deleteMessage/', messageId)
      .then(res => {
        dispatch({
          type: 'DELETE_MESSAGE',
          payload: { id: messageId }
        })
      });
  }
}