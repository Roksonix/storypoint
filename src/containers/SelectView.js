import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SelectScreen from 'components/SelectScreen';
import { joinRoom, createRoom, JOIN_ROOM, CREATE_ROOM } from 'actions';

class SelectView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            roomId: '',
            viewType: '',
            constraint: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.updateUsername = this.updateUsername.bind(this);
        this.updateRoomId = this.updateRoomId.bind(this);
        this.updateType = this.updateType.bind(this);
    }

    createRoom() {
        this.props.createRoom(this.state, this.props.history);
    }

    joinRoom() {
        this.props.joinRoom(this.state, this.props.history);
    }

    onSubmit(event) {
        event.preventDefault();
        if (!this.state.username.trim() || !this.state.roomId.trim()) {
            return;
        }
        if (!this.state.viewType) {
            this.setState({ constraint: 'Please, choose one: join existing room or create a new one' });
            return;
        }
        this.state.viewType === JOIN_ROOM && this.joinRoom();
        this.state.viewType === CREATE_ROOM && this.createRoom();
    }

    updateUsername(event) {
        this.setState({ username: event.target.value });
    }

    updateRoomId(event) {
        this.setState({ roomId: event.target.value });
    }

    updateType(event) {
        this.setState({ constraint: '', viewType: event.target.value });
    }

    render() {
        return (
            <SelectScreen
                constraint={this.state.constraint}
                updateUsername={this.updateUsername}
                updateRoomId={this.updateRoomId}
                updateType={this.updateType}
                onSubmit={this.onSubmit}/>
        );
    }
}

export default connect(null, { createRoom, joinRoom })(withRouter(SelectView));