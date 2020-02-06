import React, {useEffect} from 'react'
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import $ from "jquery";

const BY_TYPE = gql `
    query ($type: String!) {
        genomeProperties (type: $type) {
            edges {
                node {
                    accession
                    description
                }
            }
        }
    }
`;

const ListByType = ({type}) => {
    const { loading, error, data } = useQuery(BY_TYPE, {
        variables: { type: type}
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error! </p>;

    return data.genomeProperties.edges.map((edge, i) => {
        const {accession, description} = edge.node;
        return(
            <div key={i}>
                {accession} : {description}
            </div>
        );
    });
};

const handleTabChange = (e) => {
    debugger
};

const Browse = () => {
    useEffect(() => {
        $(document).foundation()
    },[]);
    return (
        <>
            <ul className="tabs" data-tabs id="browse-tabs">
                <li className="tabs-title"><a href="#hierarchy" >Hierarchy</a></li>
                <li className="tabs-title is-active"><a href="#pathways">Pathways</a></li>
                <li className="tabs-title"><a href="#metapaths">Metapaths</a></li>
                <li className="tabs-title"><a href="#systems">Systems</a></li>
                <li className="tabs-title"><a href="#guilds">Guilds</a></li>
                <li className="tabs-title"><a href="#complexes">Complexes</a></li>
                <li className="tabs-title"><a href="#categories">Categories</a></li>
            </ul>

            <div className="tabs-content" data-tabs-content="browse-tabs">
                <div className="tabs-panel" id="hierarchy">
                    Hierarchy
                </div>
                <div className="tabs-panel is-active" id="pathways">
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
                    Complexes
                </div>
                <div className="tabs-panel" id="categories">
                    <ListByType type="CATEGORY"/>
                </div>
            </div>
        </>
        );
};

export default Browse;