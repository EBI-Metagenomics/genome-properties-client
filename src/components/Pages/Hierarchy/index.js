import React from 'react';
import { useQuery } from "@apollo/react-hooks";
import { gql } from 'apollo-boost';
import {Link} from "react-router-dom";

import './style.css';

const HIERARCHY = gql `
 query ($accession: String!) {
    genomeProperties (accession: $accession) {
    edges {
      node {
        accession,
        description
        gpstepSet {
          edges {
            node {
              gpstepevidencegpSet {
                edges {
                  node {
                    gpAccession {
                      accession,
                      description
                      gpstepSet {
                        edges {
                          node {
                            gpstepevidencegpSet {
                              edges {
                                node {
                                  gpAccession {
                                    accession,
                                    description,
                                    gpstepSet {
                                      edges {
                                        node {
                                          gpstepevidencegpSet {
                                            edges {
                                              node {
                                                gpAccession {
                                                  accession,
                                                  description,
                                                  gpstepSet {
                                                    edges {
                                                      node {
                                                        gpstepevidencegpSet {
                                                          edges {
                                                            node {
                                                              gpAccession {
                                                                accession,
                                                                description
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
 }
`;
const ToggleGenPropContent = (e) => {
    // TODO Check whether useRef can be used
    const element = e.target;
    if (element.parentNode.parentNode.classList.contains("expanded")) {
        element.innerHTML = '▸';
        element.parentNode.parentNode.classList.remove("expanded");
    } else {
        element.innerHTML = '▾';
        if (element.parentNode.parentNode)
            element.parentNode.parentNode.classList.add("expanded");
    }
};

const renderHierarchyFromData = (node, level, expanded=true) => {
    const children = node?.gpstepSet?.edges;
    if (node) {
        return (
            <div className={"genome-property " + `${expanded ? 'expanded' : ''}`} key={node.accession}>
                <header>
                    {children?.length && children[0]?.node.gpstepevidencegpSet?.edges.length ?
                        <span className="expander" style={{border: 0,color: "darkred"}}
                              onClick={ToggleGenPropContent}>{expanded ? '▾': '▸'}</span>
                        : '・'}

                    <span className="genprop-label" text={`${node.accession} ${node.description}`}>
                    <Link className="link" to={{
                        pathname: "/genome-property",
                        hash:`#${node.accession}`,
                        state: {
                            accession: node.accession,
                        }
                    }}>{node.accession}</Link>:
                    <Link className="link" to={{
                        pathname: "/genome-property",
                        hash:`#${node.accession}`,
                        state: {
                            accession: node.accession,
                        }
                    }}>{node.description}</Link>
                </span>
                </header>

                {children?.length ?
                    <div className="children" style={{marginLeft: `${level*10}px`}}>
                        {node.gpstepSet.edges.map(edge => {
                            const childrenNode = edge.node.gpstepevidencegpSet?.edges[0]?.node.gpAccession || undefined;
                            return renderHierarchyFromData(childrenNode, level +1, false);
                        })}
                    </div> : null
                }
            </div>
        );
    }
    return null;
};

const Hierarchy = () => {
    const accession = "GenProp0065";
    const { loading, error, data } = useQuery(HIERARCHY, {
        variables: { accession: accession}
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error! </p>;

    const gpNode = data.genomeProperties.edges[0].node;
    const tree = renderHierarchyFromData(gpNode, 1);
    return (
        <section>
            <div>
                {/*<input type="text" id="genprop-searcher" placeholder="Search" />*/}
                {/*<a className="expand-all">Expand All</a>*/}
                {/*|*/}
                {/*<a className="collapse-all">Collapse All</a>*/}
                {/*<br />*/}
                {/*<br />*/}
                {tree}
            </div>
        </section>
    );
};

export default Hierarchy;