import React from 'react';
import Message from 'components/Message';
import './MessageList.css';

const MessageList = ({ messages }) => (
    <ul className="MessageList">
        {messages && messages.map((message, index) => (<Message {...message} key={index}/>))}
    </ul>
);

export default MessageList;