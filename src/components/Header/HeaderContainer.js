import React from 'react';
import './Header.css';
import {NavLink} from "react-router-dom";

const Header = () => {
    return (
        <header className="App-header">
            <img className="App-logo" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Wikimedia-logo.png" alt="logo" />
            <div className="login-block">
                <NavLink to={'/login'}>Login</NavLink>
            </div>
        </header>
    )
}

export default Header;