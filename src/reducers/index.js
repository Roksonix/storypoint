import { JOIN_ROOM, CREATE_ROOM } from 'actions';

const initialState = {
    messages: [
        { author: 'Test', text: 'I am a message' },
        { author: 'Not Test', text: 'And I`m too!' }
    ]
};

function reducer(state = initialState, action) {
    switch(action.type) {
        case JOIN_ROOM:
            return Object.assign({}, state, {
                roomId: action.roomId,
                username: action.username,
                uid: action.uid
            });
        case CREATE_ROOM:
            return Object.assign({}, state, {
                roomId: action.roomId,
                username: action.username,
                uid: action.uid
            });
        default:
            return state;
    }
}

export default reducer;
