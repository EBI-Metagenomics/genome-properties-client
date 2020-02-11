import React from 'react';
import {Link, withRouter} from 'react-router-dom';

const NavigationMenu = () => {
    return (
        <nav>
            <ul className={'menu'}>
                <li><Link className="link" to="/">Home</Link></li>
                <li><Link className="link" to="/browse">Browse</Link></li>
                <li><Link className="link" to="/viewer">Viewer</Link></li>
                <li><Link className="link" to="/about">About</Link></li>
            </ul>
        </nav>
    )
};

export default withRouter(NavigationMenu)