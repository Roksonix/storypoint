import { auth, database } from 'services/firebase'; 

export const JOIN_ROOM = 'JOIN_ROOM';
export const CREATE_ROOM = 'CREATE_ROOM';
export const SEND_MESSAGE = 'SEND_MESSAGE';

export const joinRoom = ({ roomId, username }, history) => async (dispatch, getState) => {
    await auth.createUser(({ user }) => {
        dispatch({
            type: JOIN_ROOM,
            roomId,
            username,
            uid: user.uid
        });
        database.createUser({ username, uid: user.uid });
        database.joinRoom({ roomId, uid: user.uid, switchViewToRoom: () => { history.push(`/room/${roomId}`); } });
    });
};

export const createRoom = ({ roomId, username }, history) => async (dispatch, getState) => {
    await auth.createUser(({ user }) => {
        dispatch({
            type: CREATE_ROOM,
            roomId,
            username,
            uid: user.uid
        });
        database.createUser({ username, uid: user.uid });
        database.createRoom({ roomId, uid: user.uid, switchViewToAdmin: () => { history.push(`/admin/${roomId}`); } });
    });
};

export const sendMessage = ({ messageText }) => async (dispatch, getState) => {
    const { roomId, uid } = getState();

    await database.sendMessage({ messageText, roomId, uid });

    dispatch({ type: SEND_MESSAGE });
};
