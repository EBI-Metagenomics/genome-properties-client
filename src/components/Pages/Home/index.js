import React from 'react';
import releaseNoteFixture from "../releaseNoteFixture";
import './style.css';
import BrowseIcon from '../../../images/browse_icon.jpg';
import ViewerIcon from '../../../images/viewer_icon.jpg'

const Home = () => {
    return (
        <section style={{padding: "16px"}}>
            <p>
                Genome properties is an annotation system whereby functional attributes can be assigned to a genome,
                based on the presence of a defined set of protein signatures within that genome. Properties (which often
                describe pathways) are composed of steps, with each step defining a protein required for the function of
                the pathway/property. Genome properties use protein signatures as evidence to determine the presence of
                each step within a property.
            </p>
            <div className="images">
                <table className="table from-md">
                    <tbody>
                    <tr>
                        <td>
                            <a href="#browse" alt="Browse Genome Properties">
                                <img
                                    src={BrowseIcon}
                                    width=" 400px"
                                    alt="Browse Genome Properties"
                                />
                            </a>
                        </td>
                        <td>
                            <a href="#viewer" alt="Genome Properties Viewer">
                                <img
                                    src={ViewerIcon}
                                    width=" 400px"
                                    alt="Genome Properties Viewer"
                                />
                            </a>
                        </td>
                    </tr>

                    </tbody>
                </table>
            </div>

            <p>Users can browse the genome properties, which are arranged within a hierarchy, examining the specific steps
                defined within each property. Alternatively, the properties can be compared in terms of the species they
                are found/not found in, across a modifiable set of genomes using our interactive viewer.
            </p>

            <p>
                <strong>If you use Genome Properties, please cite this publication:</strong>
            </p>

            <p>
                Richardson LJ, Rawlings ND, Salazar GA, Almeida A, Haft DR, Ducq G, Sutton GG, Finn RD. Genome properties
                in 2019: a new companion database to InterPro for the inference of complete functional attributes. Nucleic
                Acids Res. 2018 Oct. [doi:10.1093/nar/gky1013. PMID: 30364992.]
                <a href="https://doi.org/10.1093/nar/gky1013">doi:10.1093/nar/gky1013. PMID: 30364992.</a>
            </p>

            <p>
                Genome Properties version: {releaseNoteFixture.version} <br />
                Dependency on InterProScan version: {releaseNoteFixture.interProScanVersion}
            </p>
        </section>
    );
};

export default Home;