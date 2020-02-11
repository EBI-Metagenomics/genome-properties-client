import React from 'react';
import NavigationMenu from '../NavigationMenu';
import GPLogo from '../../../images/GP_logo.png';

const Header = () => (
    <div id="masthead" className="masthead">
        <div className="masthead-inner row">
            <div
                className="columns medium-12"
                id="local-title"
            >
                <h1 className="main-title">
                    <img src={GPLogo} width=" 60px"/> {' '}
                    <a title="Back to Genome Properties homepage" href="../../..">
                        Genome Properties
                    </a>
                </h1>
            </div>
            <NavigationMenu/>
        </div>
    </div>
);

export default Header