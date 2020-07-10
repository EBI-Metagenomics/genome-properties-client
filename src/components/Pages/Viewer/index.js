import React, {useEffect} from 'react';
import $ from "jquery";
import Instructions from "./Instructions";
import Species from "./Species";
import GenPropViewer from "./GenPropViewer";

import {useQuery} from "@apollo/react-hooks";
import {HIERARCHY} from "../../gqlQueries";

const gqlTod3 = (node) => {
    if (node) {
        const children = [];
        const childEdges = node?.gpstepSet?.edges;
        if (childEdges?.length) {
            childEdges.forEach(edge => {
                const childNode = edge.node.gpstepevidencegpSet?.edges[0]?.node.gpAccession;
                if (childNode) {
                    children.push({
                        id: childNode.accession,
                        name: childNode.description,
                        children: gqlTod3(childNode),
                    });
                }
            })
        }
        return children;
    }
};

const Viewer = () => {
    useEffect(() => {
        $(document).foundation();
    },[]);

    // const accession = "GenProp0065";
    // const { loading, error, data } = useQuery(HIERARCHY, {
    //     variables: { accession: accession}
    // });
    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error! </p>;

    // const hierarchyJson = {
    //     id: data.genomeProperties.edges[0].node.accession,
    //     name : data.genomeProperties.edges[0].node.description ,
    //     children: gqlTod3(data.genomeProperties.edges[0].node)
    // };

    return (
        <>
            <ul className="tabs" data-tabs id="viewer-tabs">
                <li className="tabs-title is-active"><a href="#viewer" >Viewer</a></li>
                <li className="tabs-title"><a href="#instructions">Instructions</a></li>
                <li className="tabs-title"><a href="#species">Species</a></li>
            </ul>

            <div className="tabs-content" data-tabs-content="viewer-tabs">
                <div className="tabs-panel is-active" id="viewer">
                    {/*<GenPropViewer gpHierarchy={hierarchyJson} />*/}
                    <GenPropViewer />
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