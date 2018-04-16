import * as firebase from 'firebase';
import { firebase as config } from 'config';

export const init = () => {
    firebase.initializeApp(config);
};

export const service = firebase;
