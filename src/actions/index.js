import { auth, database } from 'services/firebase'; 

export const JOIN_ROOM = 'JOIN_ROOM';
export const CREATE_ROOM = 'CREATE_ROOM';
export const SEND_MESSAGE = 'SEND_MESSAGE';

export const joinRoom = ({ roomId, username }) => async (dispatch, getState) => {
    await auth.createUser(({ user }) => {
        dispatch({
            type: JOIN_ROOM,
            roomId,
            username,
            uid: user.uid
        });
    });
};

export const createRoom = ({ roomId, username }) => async (dispatch, getState) => {
    await auth.createUser(({ user }) => {
        dispatch({
            type: CREATE_ROOM,
            roomId,
            username,
            uid: user.uid
        });
        database.createRoom({ roomId, uid: user.uid });
    });
};

export const sendMessage = ({ messageText, username }) => async (dispatch, getState) => {
    await database.sendMessage({ messageText, username });

    dispatch({ type: SEND_MESSAGE });
};
