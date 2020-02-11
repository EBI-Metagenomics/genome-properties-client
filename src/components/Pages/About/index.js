import React, {useEffect} from 'react';
import $ from "jquery";

import AboutGenomeProperties from "./Tabs/AboutGenomeProperties";
import Calculating from "./Tabs/Calculating";
import Funding from "./Tabs/Funding";
import Contributing from "./Tabs/Contributing";
import Documentation from "./Tabs/Documentation";
import Contact from "./Tabs/Contact";
import ReleaseNotes from "./Tabs/ReleaseNotes";

const About = () => {
    useEffect(() => {
        $(document).foundation();
    },[]);
    return (
        <>
            <ul className="tabs" data-tabs id="about-tabs">
                <li className="tabs-title is-active"><a href="#about" >About</a></li>
                <li className="tabs-title"><a href="#calculating">Calculating</a></li>
                <li className="tabs-title"><a href="#funding">Funding</a></li>
                <li className="tabs-title"><a href="#contributing">Contributing</a></li>
                <li className="tabs-title"><a href="#documentation">Help & Documentation</a></li>
                <li className="tabs-title"><a href="#contact">Contact</a></li>
                <li className="tabs-title"><a href="#release_notes">Release notes</a></li>
            </ul>

            <div className="tabs-content" data-tabs-content="about-tabs">
                <div className="tabs-panel is-active" id="about">
                    <AboutGenomeProperties />
                </div>
                <div className="tabs-panel" id="calculating">
                    <Calculating/>
                </div>
                <div className="tabs-panel" id="funding">
                    <Funding/>
                </div>
                <div className="tabs-panel" id="contributing">
                    <Contributing/>
                </div>
                <div className="tabs-panel" id="documentation">
                    <Documentation/>
                </div>
                <div className="tabs-panel" id="contact">
                    <Contact/>
                </div>
                <div className="tabs-panel" id="release_notes">
                    <ReleaseNotes/>
                </div>
            </div>
        </>
    );
};

export default About;