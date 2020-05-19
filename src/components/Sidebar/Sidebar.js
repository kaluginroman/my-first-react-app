import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'

const Sidebar = () => {
    return (
        <div className="App-sidebar">
            <ul className="App-nav">
                <li className="App-nav-item">
                    <NavLink className="App-link" to="/profile">Profile</NavLink>
                </li>
                <li className="App-nav-item">
                    <NavLink className="App-link" to="/dialogs">Dialogs</NavLink>
                </li>
                <li className="App-nav-item">
                    <NavLink className="App-link" to="/users">Users</NavLink>
                </li>
                <li className="App-nav-item">
                    <NavLink className="App-link" to="/settings">Settings</NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar;