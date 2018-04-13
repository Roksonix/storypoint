import React from 'react';
import { connect } from 'react-redux';
import MessageList from 'components/MessageList';

class AdminView extends React.Component {
    render() {
        return (
            <MessageList messages={ this.props.messages }/>
        );
    }
}

const mapStateToProps = state => ({
    messages: state.messages
});

export default connect(mapStateToProps)(AdminView);