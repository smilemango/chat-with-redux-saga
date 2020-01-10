import * as types from "../constants/ActionTypes";
import { addUser, messageReceived, populateUsersList } from "../actions";

const setupSocket = (dispatch, username) => {
  const socket = new WebSocket("ws://localhost:8989");
  socket.onopen = () => {
    console.log('onopen@setupSocket');
    socket.send(
      JSON.stringify({
        type: types.ADD_USER,
        name: username
      })
    );
  };
  socket.onmessage = event => {
    const data = JSON.parse(event.data);
    console.log('onmessage@setupSocket :', data);
    switch (data.type) {
      case types.ADD_MESSAGE:
        dispatch(messageReceived(data.message, data.author));
        break;
      case types.ADD_USER:
        dispatch(addUser(data.name));
        break;
      case types.USERS_LIST:
        console.log('call populateUsersList');
        dispatch(populateUsersList(data.users));
        break;
      default:
        break;
    }
  };
  return socket;
};

export default setupSocket;