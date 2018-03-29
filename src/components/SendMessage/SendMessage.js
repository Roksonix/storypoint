import React from 'react';
import './SendMessage.css';

const SendMessage = ({ onSubmit, updateMessage }) => (
    <form className="SendMessage" onSubmit={ onSubmit }>
        <textarea className="SendMessage-area" onChange={ updateMessage }/>
        <button className="SendMessage-submit" type="submit">Send</button>
    </form>
);

export default SendMessage;