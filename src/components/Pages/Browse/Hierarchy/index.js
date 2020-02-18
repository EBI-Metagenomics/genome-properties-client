import React, { useRef } from 'react';
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

const toggleGenPropContent = (_ref, e) => {
    if (_ref.current.classList.contains("expanded")) {
        e.target.innerHTML = '▸';
        _ref.current.classList.remove("expanded");
    } else {
        e.target.innerHTML = '▾';
        _ref.current.classList.add("expanded");
    }
};

const expandAll = () => {
    document.querySelectorAll(".genome-property span.expander").forEach(e => {
        e.innerHTML = "▾";
        if (e.parentNode.parentNode)
            e.parentNode.parentNode.classList.add("expanded");
    });
};

const collapseAll = () => {
    document.querySelectorAll(".genome-property span.expander").forEach(e => {
        e.innerHTML = "▸";
        if (e.parentNode.parentNode)
            e.parentNode.parentNode.classList.remove("expanded");
    });
};

const expandParents = element => {
    if (element.parentNode.parentNode.classList.contains('genome-property')){
        element.parentNode.parentNode.classList.add("expanded");
        if (element.parentNode.parentNode.querySelector('span.expander'))
            element.parentNode.parentNode.querySelector('span.expander').innerHTML = "▾";
        expandParents(element.parentNode.parentNode);
    }
};

const searchHierarchy = (e) => {
    const term = e.target.value;
    collapseAll();
    document.querySelectorAll('span.genprop-label')
        .forEach(e => e.classList.remove("search-match"));
    if (term.trim()!=='')
        document.querySelectorAll(`span.genprop-label[text*="${term}"]`)
            .forEach(e => {
                e.classList.add("search-match");
                expandParents(e.parentNode.parentNode);
            });
};

const RenderHierarchyFromData = ({node, level, expanded}) => {
    const _ref = useRef();
    const children = node?.gpstepSet?.edges;

    if (node) {
        return (
            <div className={"genome-property " + `${expanded ? 'expanded' : ''}`} key={node.accession} ref={_ref}>
                <header>
                    {children?.length && children[0]?.node.gpstepevidencegpSet?.edges.length ?
                        <span className="expander" style={{border: 0,color: "darkred"}}
                              onClick={(e) => toggleGenPropContent(_ref, e)} >
                            {expanded ? '▾': '▸'}
                        </span>
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
                            // return renderHierarchyFromData(childrenNode, level +1, false);
                            return <RenderHierarchyFromData node={childrenNode} level={level + 1} expanded={false}/>
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
    // const tree = renderHierarchyFromData(gpNode, 1);
    return (
        <section>
            <div>
                <input type="text" id="genprop-searcher" placeholder="Search" onChange={searchHierarchy}/>
                <a className="expand-all" onClick={expandAll}>Expand All</a>
                {' '}|{' '}
                <a className="collapse-all" onClick={collapseAll}>Collapse All</a>
                <br />
                <br />
                {/*{tree}*/}
                <RenderHierarchyFromData node={gpNode} level={1} expanded={true} />
            </div>
        </section>
    );
};

export default Hierarchy;