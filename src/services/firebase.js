import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBlJCoGJV6ENoNTcLXnJnCdD6daoiJbXDY",
    authDomain: "story-pnt.firebaseapp.com",
    databaseURL: "https://story-pnt.firebaseio.com",
    projectId: "story-pnt",
    storageBucket: "story-pnt.appspot.com",
    messagingSenderId: "889330920268"
};

firebase.initializeApp(config);

export const _auth = firebase.auth();
export const _database = firebase.database();

export const auth = {
    _instance: _auth,
    createUser: callback => {
        return _auth.signInAnonymouslyAndRetrieveData()
            .then(callback)
            .catch(console.error)
    }
};

export const database = {
    _instance: _database,
    getRoomMessagesRef: roomId => {
        return _database.ref(`rooms/${roomId}/messages`);
    },
    getUsersRef: () => {
        return _database.ref('users');
    },
    createUser: async ({ uid, username }) => {
        const ref = _database.ref('users');

        await ref.once('value').then(snapshot => {
            if (!snapshot.exists) {
                ref.set({
                    [uid]: username
                });
                return;
            }
            ref.set({
                ...snapshot.val(),
                [uid]: username
            });
        });
    },
    createRoom: async ({ roomId, uid, switchViewToAdmin }) => {
        const ref = _database.ref(`rooms/${roomId}`);

        await ref.once('value').then(snapshot => {
            if (snapshot.exists()) {
                throw new Error('This roomId already exists');
            }

            ref.set({
                creatorId: uid
            });

            switchViewToAdmin();
        })
    },
    joinRoom: async ({ roomId, uid, switchViewToRoom }) => {
        const ref = _database.ref(`rooms/${roomId}`);

        switchViewToRoom();

        await ref.once('value').then(snapshot => {
            if (!snapshot.exists()) {
                throw new Error('This room isn`t existing yet');
            }

            const usersRef = ref.child('users');
            const usersSnapshot = snapshot.child('users');
            const userList = usersSnapshot.val();

            if (!usersSnapshot.exists()) {
                usersRef.set([ uid ]);
                return;
            }

            if (userList.indexOf(uid) > -1) {
                return;
            }

            usersRef.set([...userList, uid]);
        });
    },
    sendMessage: async ({ messageText, roomId, uid }) => {
        const ref = _database.ref(`rooms/${roomId}`);
        const message = { author: uid, text: messageText };

        await ref.once('value').then(snapshot => {
            const messages = ref.child('messages');

            if (!snapshot.child('messages').exists()) {
                messages.set([ message ]);
                return;
            }

            messages.set([ ...snapshot.child('messages').val(), message]);
        });
    }
};
