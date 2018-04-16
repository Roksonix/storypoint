import { service } from './firebase';

function createUser(callback) {
    return service.auth().signInAnonymouslyAndRetrieveData()
        .then(callback)
        .catch(console.error);
}

export const auth = {
    createUser
};