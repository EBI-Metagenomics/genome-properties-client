import React, {useEffect} from 'react';
import $ from "jquery";
import Instructions from "./Instructions";
import Species from "./Species";

const Viewer = () => {
    useEffect(() => {
        $(document).foundation();
    },[]);
    return (
        <>
            <ul className="tabs" data-tabs id="viewer-tabs">
                <li className="tabs-title is-active"><a href="#viewer" >Viewer</a></li>
                <li className="tabs-title"><a href="#instructions">Instructions</a></li>
                <li className="tabs-title"><a href="#species">Species</a></li>
            </ul>

            <div className="tabs-content" data-tabs-content="viewer-tabs">
                <div className="tabs-panel is-active" id="viewer">
                    Viewer
                </div>
                <div className="tabs-panel" id="instructions">
                    <Instructions />
                </div>
                <div className="tabs-panel" id="species">
                    <Species />
                </div>
            </div>
        </>
    );
};

export default Viewer;