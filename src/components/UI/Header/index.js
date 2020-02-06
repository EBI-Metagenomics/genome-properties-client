import React from 'react';
import NavigationMenu from '../NavigationMenu'

const Header = () => (
            <div id="masthead" className="masthead">
                <div className="masthead-inner row">
                    <div
                        className="columns small-6 medium-8"
                        id="local-title"
                    >
                        <h1 className="main-title">
                            <div className="logo-flex">
                                <a title="Back to Genome Properties homepage" href="../../..">
                                    <div className="logo-flex-item logo-icon">
                                        {/*<Genome Properties logo />*/}
                                    </div>

                                    <div className="logo-flex-item logo-text">
                                        Genome Properties
                                    </div>
                                </a>
                            </div>
                        </h1>
                    </div>
                    <NavigationMenu />

                </div>
            </div>
);

export default Header