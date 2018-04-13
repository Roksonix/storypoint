import React from 'react';
import { CREATE_ROOM, JOIN_ROOM } from 'actions';
import './SelectScreen.css';

const SelectScreen = ({ constraint, updateUsername, updateRoomId, updateType, onSubmit }) => (
    <form className="SelectScreen"
        onSubmit={onSubmit}>
        <input className="SelectScreen-field" name="username" placeholder="Enter your name here" onChange={ updateUsername } required/>
        <input className="SelectScreen-field" name="roomId" placeholder="Enter Room Name here" onChange={ updateRoomId } required/>
        <input id="create" className="SelectScreen-radio" name="actionType" type="radio" value={ CREATE_ROOM } onChange={ updateType }/>
        <label htmlFor="create" className="SelectScreen-label">Create New Room</label>
        <input id="connect" className="SelectScreen-radio" name="actionType" type="radio" value={ JOIN_ROOM } onChange={ updateType }/>
        <label htmlFor="connect" className="SelectScreen-label">Connect to Existing Room</label>
        <button className="SelectScreen-button" type="submit">And Click Here</button>
        {constraint && <p className="SelectScreen-constraint">{constraint}</p>}
    </form>
);

export default SelectScreen;