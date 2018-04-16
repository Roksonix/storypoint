import { service } from './firebase';

async function createUser({ uid, username }) {
    const ref = service.database().ref('users');

    await ref.once('value')
        .then(snapshot => {
            const value = !snapshot.exists() ?
                { [uid]: username } :
                {
                    ...snapshot.val(),
                    [uid]: username
                };
            ref.set(value);
            return value;
        });
}

async function createRoom({ roomId, uid }, callback) {
    const ref = service.database().ref(`rooms/${roomId}`);

    await ref.once('value').then(snapshot => {
        if (snapshot.exists()) {
            throw new Error('This roomId already exists');
        }

        ref.set({
            creatorId: uid
        });

        return roomId;
    })
    .then(callback)
    .catch(console.error);
}

async function joinRoom({ roomId, uid }, callback) {
    const ref = service.database().ref(`rooms/${roomId}`);

    await ref.once('value').then(snapshot => {
        if (!snapshot.exists()) {
            throw new Error('This room isn`t existing yet');
        }

        const usersRef = ref.child('users');
        const usersSnapshot = snapshot.child('users');
        const userList = usersSnapshot.val() || [];

        if (userList.indexOf(uid) > -1) {
            return roomId;
        }

        const value = !usersSnapshot.exists() ?
            [ uid ] :
            [...userList, uid];

        usersRef.set(value);
        return value;
    })
    .then(callback)
    .catch(console.error);
}

async function sendMessage({ messageText, roomId, uid }) {
    const ref = service.database().ref(`rooms/${roomId}`);
    const message = { author: uid, text: messageText };

    await ref.once('value').then(snapshot => {
        const messages = ref.child('messages');
        const value = !snapshot.child('messages').exists() ?
            [ message ] :
            [ ...snapshot.child('messages').val(), message];

        messages.set(value);
        return value;
    });
}

function unlistenRoom(roomId) {
    service.database().ref(`rooms/${roomId}/messages`).off('value');
}

function listenRoom(roomId, handler) {
    service.database().ref(`rooms/${roomId}/messages`).on('value', handler);
}

function updateMessagesWithUsernames(messages, callback) {
    service.database().ref('users').once('value').then(snapshot => {
        const usersMap = snapshot.val();

        messages.map(message => {
            message.author = usersMap[message.author];

            return message;
        });

        return messages;
    }).then(callback);
}

export const database = {
    createUser,
    createRoom,
    joinRoom,
    sendMessage,
    unlistenRoom,
    listenRoom,
    updateMessagesWithUsernames
};
