import React from "react";
import { Link } from "react-router-dom";
import releaseNoteFixture from "../releaseNoteFixture";
import "./style.css";
import BrowseIcon from "../../../images/browse_icon.jpg";
import ViewerIcon from "../../../images/viewer_icon.jpg";

const Home = () => {
  return (
    <section className="vf-stack">
      <p>
        Genome properties is an annotation system whereby functional attributes
        can be assigned to a genome, based on the presence of a defined set of
        protein signatures within that genome. Properties (which often describe
        pathways) are composed of steps, with each step defining a protein
        required for the function of the pathway/property. Genome properties use
        protein signatures as evidence to determine the presence of each step
        within a property.
      </p>
      <div className="images">
        <Link
          className="link"
          to={`${process.env.PUBLIC_URL}/browse`}
          alt="Browse Genome Properties"
        >
          <img src={BrowseIcon} width=" 400px" alt="Browse Genome Properties" />
        </Link>
        <Link
          className="link"
          to={`${process.env.PUBLIC_URL}/viewer`}
          alt="Genome Properties Viewer"
        >
          <img src={ViewerIcon} width=" 400px" alt="Genome Properties Viewer" />
        </Link>
      </div>

      <p>
        Users can browse the genome properties, which are arranged within a
        hierarchy, examining the specific steps defined within each property.
        Alternatively, the properties can be compared in terms of the species
        they are found/not found in, across a modifiable set of genomes using
        our interactive viewer.
      </p>

      <p>
        <strong>
          If you use Genome Properties, please cite this publication:
        </strong>
      </p>

      <p className="reference">
        <span className="authors">
          Richardson LJ, Rawlings ND, Salazar GA, Almeida A, Haft DR, Ducq G,
          Sutton GG, Finn RD.
        </span>{" "}
        <span className="name">
          Genome properties in 2019: a new companion database to InterPro for
          the inference of complete functional attributes.
        </span>{" "}
        <span className="journal">Nucleic Acids Research</span> 2018 Oct. [
        <a href="https://doi.org/10.1093/nar/gky1013">
          doi:10.1093/nar/gky1013.
        </a>{" "}
        <a href="https://pubmed.ncbi.nlm.nih.gov/30364992/">PMID: 30364992.</a>]
      </p>

      <p>
        Genome Properties version: <code>{releaseNoteFixture.version}</code>{" "}
        <br />
        Dependency on InterProScan version:{" "}
        <code>{releaseNoteFixture.interProScanVersion}</code>
      </p>
    </section>
  );
};

export default Home;
