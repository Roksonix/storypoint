import { service } from './firebase';

function createUser(callback) {
    return service.auth().signInAnonymouslyAndRetrieveData()
        .then(callback)
        .catch(console.error);
}

function currentUser() {
    return service.auth().currentUser;
}

export const auth = {
    createUser,
    currentUser
};