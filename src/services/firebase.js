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
    createRoom: async ({ roomId, uid }) => {
        const ref = _database.ref(`rooms/${roomId}`);

        await ref.once('value').then(snapshot => {
            if (snapshot.exists()) {
                throw new Error('This roomId already exists');
            }

            ref.set({
                creatorId: uid
            });
        })
    },
    sendMessage: async (message) => {
        const ref = _database.ref('messages');
        const key = ref.push().key;
        const updates = {
            ['messages/' + key]: message
        };

        return ref.update(updates);
    }
};
