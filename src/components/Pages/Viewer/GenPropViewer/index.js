import React, { useEffect, useState } from "react";
import gpv from "genome-properties-viewer";
import Select from "react-select";

import "genome-properties-viewer/gp-style.css";
import "./style.css";
import config from "config.json";

const GenPropViewer = () => {
  const github = config.github; /** @global */
  const [options, setOptions] = useState([]);
  useEffect(() => {
    const { d3, GenomePropertiesViewer, uploadLocalGPFile } = gpv;
    const viewer = new GenomePropertiesViewer({
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
      gp_server: config.gp_server,
    });
    window.viewer = viewer;
    viewer.gp_taxonomy.on("taxonomyLoaded", () => {
      setOptions(
        viewer.gp_taxonomy.getLeaves(viewer.gp_taxonomy.root).map((taxid) => ({
          value: taxid,
          label: viewer.gp_taxonomy.nodes[taxid].name,
        }))
      );
    });
    let showTaxonomy = true;

    viewer.gp_taxonomy.show_tree = showTaxonomy;

    d3.select(".minimise").on("click", (event, d) => {
      const on = d3.select(event.currentTarget).classed("on");
      d3.selectAll(".top-controllers>div")
        .style("max-height", on ? "0px" : "500px")
        .style("overflow", on ? null : "hidden")
        .transition(200)
        .style("max-height", on ? "500px" : "0px")
        .style("opacity", on ? 1 : 0);
      d3.selectAll(".top-controllers")
        .transition(200)
        .style("padding", on ? "5px" : "0px");
      d3.select(event.currentTarget).classed("on", !on);
    });
    d3.select("#toggle-tax").on("click", (event, d) => {
      d3.select(event.currentTarget).text(
        showTaxonomy ? "Show Taxonomy" : "Hide Taxonomy"
      );
      showTaxonomy = !showTaxonomy;
      viewer.gp_taxonomy.show_tree = showTaxonomy;
      viewer.update_viewer();
    });
  }, []);

  const handleFileChange = (evt) => {
    const oFiles = evt.target.files;
    for (let i = 0; i < oFiles.length; i++) {
      gpv.uploadLocalGPFile(viewer, oFiles[i]);
    }
  };
  const handleSelectChange = (optionSelected) => {
    viewer.gp_taxonomy.dipatcher.call(
      "spaciesRequested",
      this,
      optionSelected.value
    );
  };
  return (
    <div className="container">
      <div className="top-block">
        <div id="gp-controllers" className="top-controllers">
          <div>
            <header>Load Species data</header>
            <ul className="vf-list">
              <li className="vf-list__item">
                <label htmlFor="tax-search">Search by taxonomy name:</label>
                <Select onChange={handleSelectChange} options={options} />
              </li>
              <li className="vf-list__item">
                <label htmlFor="newfile">Upload a File: </label>
                <input type="file" id="newfile" onChange={handleFileChange} />
              </li>
            </ul>
          </div>
          <div>
            <header>Filter properties</header>
            <ul className="vf-list">
              <li className="vf-list__item">
                <label htmlFor="gp-selector">By top level category:</label>
                <div id="gp-selector" className="selector"></div>
              </li>
              <li className="vf-list__item">
                <label htmlFor="gp-filter">By text:</label>
                <input type="text" id="gp-filter" />
              </li>
            </ul>
          </div>
          <div>
            <header>Format labels</header>
            <ul className="vf-list">
              <li className="vf-list__item">
                <label htmlFor="tax_label">Species:</label>
                <select id="tax_label">
                  <option value="name">Species</option>
                  <option value="id">Tax ID</option>
                  <option value="both">Both</option>
                </select>
              </li>
              <li className="vf-list__item">
                <label htmlFor="gp_label">Properties:</label>
                <select id="gp_label">
                  <option value="name">Name</option>
                  <option value="id">ID</option>
                  <option value="both">Both</option>
                </select>
              </li>
              <li className="vf-list__item">
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
