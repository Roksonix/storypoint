import React from 'react';
import { render } from 'react-dom';
import 'normalize.css';
import 'index.css';
import Root from 'Root';
import configureStore from 'store';

render(
    <Root store={ configureStore() } />,
    document.getElementById('root')
);
