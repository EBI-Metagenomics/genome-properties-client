import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { BASIC_HIERARCHY, HIERARCHY } from "../../../gqlQueries";
import { Link } from "react-router-dom";
import Loading from "components/Loading";

import "./style.css";

const toggleGenPropContent = (e) => {
  if (e.target.parentNode.parentNode.classList.contains("expanded")) {
    collapse(e.target);
  } else {
    expand(e.target);
  }
};

const expand = (element) => {
  element.innerHTML = "▾";
  if (element.parentNode.parentNode)
    element.parentNode.parentNode.classList.add("expanded");
};

const collapse = (element) => {
  element.innerHTML = "▸";
  element.parentNode.parentNode.classList.remove("expanded");
};

const expandAll = () => {
  document.querySelectorAll(".genome-property span.expander").forEach((e) => {
    expand(e);
  });
};

const collapseAll = () => {
  document.querySelectorAll(".genome-property span.expander").forEach((e) => {
    collapse(e);
  });
};

const expandParents = (element) => {
  if (element.parentNode.parentNode.classList.contains("genome-property")) {
    element.parentNode.parentNode.classList.add("expanded");
    if (element.parentNode.parentNode.querySelector("span.expander"))
      element.parentNode.parentNode.querySelector("span.expander").innerHTML =
        "▾";
    expandParents(element.parentNode.parentNode);
  }
};

const searchHierarchy = (e) => {
  const term = e.target.value;
  collapseAll();
  document
    .querySelectorAll("span.genprop-label")
    .forEach((e) => e.classList.remove("search-match"));
  if (term.trim() !== "")
    document
      .querySelectorAll(`span.genprop-label[text*="${term}"]`)
      .forEach((e) => {
        e.classList.add("search-match");
        expandParents(e.parentNode.parentNode);
      });
};

const renderHierarchyFromData = (node, level, expanded = false) => {
  const children = node?.gpstepSet?.edges;

  if (node) {
    return (
      <div
        className={"genome-property " + `${expanded ? "expanded" : ""}`}
        key={node.accession}
      >
        <header>
          {children?.length &&
          children[0]?.node.gpstepevidencegpSet?.edges.length ? (
            <span
              className="expander"
              style={{ border: 0, color: "darkred" }}
              onClick={toggleGenPropContent}
            >
              {expanded ? "▾" : "▸"}
            </span>
          ) : (
            "・"
          )}

          <span
            className="genprop-label"
            text={`${node.accession} ${node.description}`}
          >
            <Link to={`/genome-property/${node.accession}`}>
              {node.accession}
            </Link>
            :
            <Link to={`/genome-property/${node.accession}`}>
              {node.description}
            </Link>
          </span>
        </header>

        {children?.length ? (
          <div className="children" style={{ marginLeft: `${level * 10}px` }}>
            {children.map((edge) => {
              const childrenNode =
                edge.node.gpstepevidencegpSet?.edges[0]?.node.gpAccession ||
                undefined;
              return renderHierarchyFromData(childrenNode, level + 1, false);
            })}
          </div>
        ) : null}
      </div>
    );
  }
  return null;
};

const Hierarchy = () => {
  const accession = "GenProp0065";
  const { loading, error, data } = useQuery(BASIC_HIERARCHY, {
    variables: { accession: accession },
  });
  const { loading: loadingF, error: errorF, data: dataF } = useQuery(
    HIERARCHY,
    {
      variables: { accession: accession },
    }
  );
  if (error) return <p>Error! </p>;

  const currentData =
    (!loadingF && !errorF && dataF) || (!loading && data) || {};

  const gpNode = currentData?.genomeProperties?.edges?.[0]?.node;
  const tree = renderHierarchyFromData(gpNode, 1, true);
  return (
    <section>
      <section className="progress">
        <table className="vf-table vf-table--tight">
          <thead className="vf-table__header">
            <tr className="vf-table__row">
              <th className="vf-table__heading" scope="col" colSpan="2">
                Loading progress
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="vf-table__row">
              <td className="vf-table__cell">High-level hierarchy</td>
              <td className="vf-table__cell state">
                {loading ? <Loading /> : "✅"}
              </td>
            </tr>
            <tr className="vf-table__row">
              <td className="vf-table__cell">Steps</td>
              <td className="vf-table__cell state">
                {loadingF ? <Loading /> : "✅"}
              </td>
            </tr>
          </tbody>
        </table>
        {tree && (
          <div>
            <input
              type="text"
              id="genprop-searcher"
              placeholder="Search"
              onChange={searchHierarchy}
            />
            <a className="expand-all" onClick={expandAll}>
              Expand All
            </a>{" "}
            |{" "}
            <a className="collapse-all" onClick={collapseAll}>
              Collapse All
            </a>
            <br />
            <br />
            {tree}
          </div>
        )}
      </section>
    </section>
  );
};

export default Hierarchy;
