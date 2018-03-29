import React from 'react';
import './Header.css';

const Header = ({ title }) => (
    <header className="Header">
        <h1 className="Header-title">{ title }</h1>
    </header>
);

export default Header;