import React, { useEffect } from "react";
import gpv from "genome-properties-viewer";
import "genome-properties-viewer/gp-style.css";
import config from "config.json";

const GenPropViewer = () => {
  const github = config.github;
  useEffect(() => {
    let d3 = gpv.d3,
      GenomePropertiesViewer = gpv.GenomePropertiesViewer,
      viewer = new GenomePropertiesViewer({
        element_selector: "#gp-viewer",
        controller_element_selector: "#gp-selector",
        server: `${github}/flatfiles/gp_assignments/SUMMARY_FILE_{}.gp`,
        hierarchy_path: `${github}/flatfiles/hierarchy.json`,
        // hierarchy_path: gpHierarchy,
        server_tax: `${github}/flatfiles/taxonomy.json`,
        model_species_path: `${github}/flatfiles/gp_assignments/json/JSON_MERGED`,
        cell_side: 20,
        height: 400,
        template_link_to_GP_page: `${config.website}/genome-property/{}`,
      });
    window.viewer = viewer;
    let showTaxonomy = true;

    viewer.gp_taxonomy.show_tree = showTaxonomy;

    d3.select(".minimise").on("click", (d, i, c) => {
      const on = d3.select(c[i]).classed("on");
      d3.selectAll(".top-controllers>div")
        .style("max-height", on ? "0px" : "500px")
        .style("overflow", on ? null : "hidden")
        .transition(200)
        .style("max-height", on ? "500px" : "0px")
        .style("opacity", on ? 1 : 0);
      d3.selectAll(".top-controllers")
        .transition(200)
        .style("padding", on ? "5px" : "0px");
      d3.select(c[i]).classed("on", !on);
    });
    d3.select("#toggle-tax").on("click", (d, i, c) => {
      d3.select(c[i]).text(showTaxonomy ? "Show Taxonomy" : "Hide Taxonomy");
      showTaxonomy = !showTaxonomy;
      viewer.gp_taxonomy.show_tree = showTaxonomy;
      viewer.update_viewer();
    });
  }, []);

  return (
    <div className="container">
      <div className="top-block">
        <div id="gp-controllers" className="top-controllers">
          <div>
            <header>Load Genome Properties</header>
            <ul>
              <li>
                <label htmlFor="tax-search">From Taxonomy:</label>
                <input type="text" id="tax-search" />
              </li>
              <li>
                <label htmlFor="newfile">From a File: </label>
                <input type="file" id="newfile" />
              </li>
            </ul>
          </div>
          <div>
            <header>Filter Properties</header>
            <ul>
              <li>
                <label htmlFor="gp-selector">By Top level category:</label>
                <div id="gp-selector" className="selector"></div>
              </li>
              <li>
                <label htmlFor="gp-filter">by Text:</label>
                <input type="text" id="gp-filter" />
              </li>
            </ul>
          </div>
          <div>
            <header>Labels</header>
            <ul>
              <li>
                <label htmlFor="tax_label">Species:</label>
                <select id="tax_label">
                  <option value="name">Species</option>
                  <option value="id">Tax ID</option>
                  <option value="both">Both</option>
                </select>
              </li>
              <li>
                <label htmlFor="gp_label">Properties:</label>
                <select id="gp_label">
                  <option value="name">Name</option>
                  <option value="id">ID</option>
                  <option value="both">Both</option>
                </select>
              </li>
              <li>
                <button id="toggle-tax" className="button secondary">
                  Hide Taxonomy
                </button>
              </li>
            </ul>
          </div>
          <div className="gp-legends">
            <header>Legends</header>
          </div>
          <a className="minimise"></a>
        </div>
      </div>
      <div id="gp-viewer"></div>
      <div className="info-tooltip"></div>
    </div>
  );
};

export default GenPropViewer;
