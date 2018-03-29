import React from 'react';
import { connect } from 'react-redux';
import MessageList from '../components/MessageList';

class AdminView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: this.props.messages
        };
    }

    render() {
        return (
            <MessageList messages={ this.state.messages }/>
        );
    }
}

const mapStateToProps = state => ({
    messages: state.messages
});

export default connect(mapStateToProps)(AdminView);