import axios from 'axios';

export const addMessage = messageInfo => ({
  type: 'ADD_MESSAGE',
  payload: messageInfo,
});

export const setMessages = messages => ({
  type: 'SET_MESSAGES',
  payload: messages,
});

export const getMessages = userId => (
  dispatch => (
    axios.get(`/messages/${userId}`)
      .then((res) => {
        console.log('Getting message:', res.data);
        dispatch(setMessages(res.data));
      }, err => console.log(err))
  )
);

export const setCurrentMessage = messageId => ({
  type: 'SET_CURRENT_MESSAGE',
  payload: { id: messageId },
});

export const deleteMessage = messageId => (
  dispatch => (
    axios.post('/deleteMessage/', messageId)
      .then((res) => {
        console.log('Delete message res:', res.body);
        dispatch({
          type: 'DELETE_MESSAGE',
          payload: { id: messageId },
        });
      })
  )
);
