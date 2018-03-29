import { createStore } from 'redux';
import reducers from './reducers';
import { loadState, saveState } from './services/localstorage';
import throttle from 'lodash/throttle';

const configureStore = () => {
    const persistedState = loadState();
    const store = createStore(reducers, persistedState);

    store.subscribe(throttle(() => {
        saveState(store.getState());
    }), 1000);

    return store;
};

export default configureStore;
