import React, {useEffect} from 'react';
import $ from "jquery";
import Hierarchy from "./Hierarchy";
import ListByType from "./ListByType";

const Browse = () => {
    useEffect(() => {
        $(document).foundation();
    },[]);
    return (
        <>
            <ul className="tabs" data-tabs id="browse-tabs">
                <li className="tabs-title is-active"><a href="#hierarchy" >Hierarchy</a></li>
                <li className="tabs-title"><a href="#pathways">Pathways</a></li>
                <li className="tabs-title"><a href="#metapaths">Metapaths</a></li>
                <li className="tabs-title"><a href="#systems">Systems</a></li>
                <li className="tabs-title"><a href="#guilds">Guilds</a></li>
                <li className="tabs-title"><a href="#complexes">Complexes</a></li>
                <li className="tabs-title"><a href="#categories">Categories</a></li>
            </ul>

            <div className="tabs-content" data-tabs-content="browse-tabs">
                <div className="tabs-panel is-active" id="hierarchy">
                    <Hierarchy />
                </div>
                <div className="tabs-panel" id="pathways">
                    <ListByType type="PATHWAY"/>
                </div>
                <div className="tabs-panel" id="metapaths">
                    <ListByType type="METAPATH"/>
                </div>
                <div className="tabs-panel" id="systems">
                    <ListByType type="SYSTEM"/>
                </div>
                <div className="tabs-panel" id="guilds">
                    <ListByType type="GUILD"/>
                </div>
                <div className="tabs-panel" id="complexes">
                    <ListByType type="COMPLEX"/>
                </div>
                <div className="tabs-panel" id="categories">
                    <ListByType type="CATEGORY"/>
                </div>
            </div>
        </>
        );
};

export default Browse;