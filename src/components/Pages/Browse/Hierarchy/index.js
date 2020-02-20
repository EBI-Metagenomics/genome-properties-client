import React from 'react';
import { useQuery } from "@apollo/react-hooks";
import { HIERARCHY } from "../../../gqlQueries";
import {Link} from "react-router-dom";

import './style.css';

const toggleGenPropContent = (e) => {
    if (e.target.parentNode.parentNode.classList.contains("expanded")) {
        collapse(e.target);
    } else {
        expand(e.target);
    }
};

const expand = element => {
    element.innerHTML = '▾';
    if (element.parentNode.parentNode)
        element.parentNode.parentNode.classList.add("expanded");
};

const collapse = element => {
    element.innerHTML = '▸';
    element.parentNode.parentNode.classList.remove("expanded");
};

const expandAll = () => {
    document.querySelectorAll(".genome-property span.expander").forEach(e => {
        expand(e);
    });
};

const collapseAll = () => {
    document.querySelectorAll(".genome-property span.expander").forEach(e => {
        collapse(e);
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

const renderHierarchyFromData = (node, level, expanded = false) => {
    const children = node?.gpstepSet?.edges;

    if (node) {
        return (
            <div className={"genome-property " + `${expanded ? 'expanded' : ''}`} key={node.accession} >
                <header>
                    {children?.length && children[0]?.node.gpstepevidencegpSet?.edges.length ?
                        <span className="expander" style={{border: 0,color: "darkred"}}
                              onClick={toggleGenPropContent} >
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
                        {children.map(edge => {
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
    const tree = renderHierarchyFromData(gpNode, 1, true);
    return (
        <section>
            <div>
                <input type="text" id="genprop-searcher" placeholder="Search" onChange={searchHierarchy}/>
                <a className="expand-all" onClick={expandAll}>Expand All</a>
                {' '}|{' '}
                <a className="collapse-all" onClick={collapseAll}>Collapse All</a>
                <br />
                <br />
                {tree}
            </div>
        </section>
    );
};

export default Hierarchy;