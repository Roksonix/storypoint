export const JOIN_ROOM = 'JOIN_ROOM';
export const CREATE_ROOM = 'CREATE_ROOM';
export const SEND_MESSAGE = 'SEND_MESSAGE';

export const joinRoom = ({ roomId, username }) => ({
    type: JOIN_ROOM,
    roomId,
    username
});

export const createRoom = ({ roomId, username }) => ({
    type: CREATE_ROOM,
    roomId,
    username
});

export const sendMessage = ({ messageText, username }) => ({
    type: SEND_MESSAGE,
    author: username,
    text: messageText
});
