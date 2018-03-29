import React from 'react';
import './Message.css';

const Message = ({ text, author }) => (
    <li className="Message">
        <strong className="Message-author">{author}: </strong>{text}
    </li>
);

export default Message;