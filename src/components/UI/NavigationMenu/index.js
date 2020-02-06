import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';

const NavigationMenu = () => {
    return (
        <nav>
            <ul className={'menu'}>
                <li><NavLink className="nav-link" to="/">Home</NavLink></li>
                <li><NavLink className="nav-link" to="/viewer">Viewer</NavLink></li>
                <li><NavLink className="nav-link" to="/browse">Browse</NavLink></li>
                <li><NavLink className="nav-link" to="/about">About</NavLink></li>
            </ul>
        </nav>
    )
};

export default withRouter(NavigationMenu)