import type { ChangeEvent, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { useApi, type HierarchyNode } from "../../../../api";
import Loading from "../../../Loading";

import "./style.css";

const toggleGenPropContent = (e: MouseEvent<HTMLSpanElement>) => {
  const row = e.currentTarget.parentNode?.parentNode as HTMLElement | null;
  if (!row) return;
  if (row.classList.contains("expanded")) {
    collapse(e.currentTarget);
  } else {
    expand(e.currentTarget);
  }
};

const expand = (element: Element) => {
  element.innerHTML = "▾";
  element.parentNode?.parentNode &&
    (element.parentNode.parentNode as HTMLElement).classList.add("expanded");
};

const collapse = (element: Element) => {
  element.innerHTML = "▸";
  (element.parentNode?.parentNode as HTMLElement | null)?.classList.remove(
    "expanded",
  );
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

const expandParents = (element: Element | null) => {
  const row = element?.parentNode?.parentNode as HTMLElement | undefined;
  if (row?.classList.contains("genome-property")) {
    row.classList.add("expanded");
    const expander = row.querySelector("span.expander");
    if (expander) expander.innerHTML = "▾";
    expandParents(row);
  }
};

const searchHierarchy = (e: ChangeEvent<HTMLInputElement>) => {
  const term = e.target.value;
  collapseAll();
  document
    .querySelectorAll("span.genprop-label")
    .forEach((el) => el.classList.remove("search-match"));
  if (term.trim() !== "")
    document
      .querySelectorAll(`span.genprop-label[data-text*="${term}"]`)
      .forEach((el) => {
        el.classList.add("search-match");
        expandParents(el.parentNode?.parentNode as Element);
      });
};

const renderHierarchyFromData = (
  node: HierarchyNode | null | undefined,
  level: number,
  expanded = false,
) => {
  const children = node?.children ?? [];

  if (node) {
    return (
      <div
        className={"genome-property " + `${expanded ? "expanded" : ""}`}
        key={node.accession}
      >
        <header>
          {children.length ? (
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
            data-text={`${node.accession} ${node.description}`}
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

        {children.length ? (
          <div className="children" style={{ marginLeft: `${level * 10}px` }}>
            {children.map((child) =>
              renderHierarchyFromData(child, level + 1, false),
            )}
          </div>
        ) : null}
      </div>
    );
  }
  return null;
};

const Hierarchy = () => {
  const accession = "GenProp0065";
  const { loading, error, data } = useApi<HierarchyNode>(
    `/v1/hierarchy/${encodeURIComponent(accession)}`,
  );

  if (error) return <p>Error! </p>;
  if (loading) return <Loading />;

  const tree = renderHierarchyFromData(data, 1, true);
  return (
    <section>
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
  );
};

export default Hierarchy;
