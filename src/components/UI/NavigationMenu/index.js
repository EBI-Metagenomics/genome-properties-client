import React from 'react';
import {Link, withRouter} from 'react-router-dom';

const NavigationMenu = () => {
    return (
        <nav>
            <ul className={'menu'}>
                <li><Link className="link" to={`${process.env.PUBLIC_URL}/`}>Home</Link></li>
                <li><Link className="link" to={`${process.env.PUBLIC_URL}/browse`}>Browse</Link></li>
                <li><Link className="link" to={`${process.env.PUBLIC_URL}/viewer`}>Viewer</Link></li>
                <li><Link className="link" to={`${process.env.PUBLIC_URL}/about`}>About</Link></li>
            </ul>
        </nav>
    )
};

export default withRouter(NavigationMenu)