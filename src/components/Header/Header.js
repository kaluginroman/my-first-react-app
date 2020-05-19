import React from 'react';
import './Header.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {

    const AuthHeaderProfile = (props) => {
        return (
            <div className="header-user">
                <span className="header-user__login">{props.login}</span>
                <button className="App-header-user__login-btn" onClick={props.logout}>Logout</button>
            </div>
        )
    };

    return (
        <header className="App-header">
            <img className="App-logo" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Wikimedia-logo.png" alt="logo" />
            <div className="App-header-user">
                {props.isAuth
                    ? <AuthHeaderProfile login={props.login} logout={props.logout}/>
                    : <NavLink to={'/login'} className="App-header-user__login-btn">Login</NavLink>
                }
            </div>
        </header>
    )
};

export default Header;