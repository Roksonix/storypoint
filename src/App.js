import React from 'react';
import { Route } from 'react-router-dom';
import Header from './components/Header';
import CenteredBlock from './components/CenteredBlock';
import SelectView from './containers/SelectView';
import VoterView from './containers/VoterView';
import AdminView from './containers/AdminView';

const App = () => (
    <div>
        <Header title="StoryPoint"/>
        <CenteredBlock>
            <Route path="/" exact component={SelectView}/>
            <Route path="/room/:id" component={VoterView}/>
            <Route path="/admin/:id" component={AdminView}/>
        </CenteredBlock>
    </div>
);

export default App;
