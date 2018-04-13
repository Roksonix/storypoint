import React from 'react';
import { connect } from 'react-redux';
import MessageList from 'components/MessageList';
import { database } from 'services/firebase';

class AdminView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
    }

    componentDidMount() {
        database.getRoomMessagesRef(this.props.roomId).on('value', this.updateMessageList.bind(this));
    }

    componentWillUnmount() {
        database.getRoomMessagesRef(this.props.roomId).off('value');
    }

    updateMessageList(snapshot) {
        const messages = snapshot.val() || [];

        database.getUsersRef().once('value').then(snapshot => {
            const usersMap = snapshot.val();

            messages.map(message => {
                message.author = usersMap[message.author];

                return message;
            });

            this.setState({ messages });
        });
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