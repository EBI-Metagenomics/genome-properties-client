import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import { useQuery } from "@apollo/react-hooks";
import { gql } from 'apollo-boost';

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
                <Link className="link" to={{
                    pathname: "/genome-property",
                    hash:`#${accession}`,
                    state: {
                        accession: accession,
                    }
                }}>{accession}</Link> : {description}
            </div>
        );
    });
};

export default withRouter(ListByType);