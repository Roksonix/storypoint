import React from 'react';
import { connect } from 'react-redux';
import MessageList from 'components/MessageList';
import { database } from 'services/database';

class AdminView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
    }

    componentDidMount() {
        database.listenRoom(this.props.roomId, this.updateMessageList.bind(this));
    }

    componentWillUnmount() {
        database.unlistenRoom(this.props.roomId);
    }

    updateMessageList(snapshot) {
        const messages = snapshot.val() || [];

        database.updateMessagesWithUsernames(messages, messages => { this.setState({ messages }); });
    }

    render() {
        return (
            <MessageList messages={ this.state.messages }/>
        );
    }
}

const mapStateToProps = state => ({
    roomId: state.roomId
});

export default connect(mapStateToProps)(AdminView);