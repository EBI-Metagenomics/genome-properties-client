import React from 'react';

const EBIHeader = () => {
    return (
        <header
            id="masthead-black-bar"
            className="clearfix masthead-black-bar"
        >
            <div>
                <nav className="row">
                    <ul
                        id="global-nav"
                        className="menu global-nav text-right"
                    >
                        <li className="home-mobile show-for-small-only">
                            <a href="//www.ebi.ac.uk"/>
                        </li>

                        <li className="embl hide">
                            <a href="//www.embl.org/">EMBL</a>
                        </li>
                        <li className="barcelona hide">
                            <a href="//www.embl-barcelona.es/">Barcelona</a>
                        </li>
                        <li className="hamburg hide">
                            <a href="//www.embl-hamburg.de/">Hamburg</a>
                        </li>
                        <li className="heidelberg hide">
                            <a href="//www.embl.de/">Heidelberg</a>
                        </li>
                        <li className="grenoble hide">
                            <a href="//www.embl.fr/">Grenoble</a>
                        </li>
                        <li className="rome hide">
                            <a href="//www.embl.it/">Rome</a>
                        </li>

                        <li className="ebi">
                            <a href="//www.ebi.ac.uk">EMBL-EBI</a>
                        </li>

                        <li className="services active">
                            <a href="//www.ebi.ac.uk/services">Services</a>
                        </li>

                        <li className="research">
                            <a href="//www.ebi.ac.uk/research">Research</a>
                        </li>

                        <li className="training">
                            <a href="//www.ebi.ac.uk/training">Training</a>
                        </li>

                        <li className="about">
                            <a href="//www.ebi.ac.uk/about">About us</a>
                        </li>

                        <li
                            className="float-right show-for-medium embl-selector embl-ebi"
                        >
                            <button
                                className="button float-right"
                                type="button"
                                data-toggle="embl-dropdown"
                            />
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default EBIHeader;
