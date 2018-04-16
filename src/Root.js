import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from 'App';
import * as firebase from 'services/firebase';

class Root extends React.Component {
    constructor(props) {
        super(props);
        firebase.init();
    }

    render() {
        return (
            <Provider store={this.props.store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default Root;
