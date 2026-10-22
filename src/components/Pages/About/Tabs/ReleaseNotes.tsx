import React from 'react';
import releaseNoteFixture from "../../releaseNoteFixture";

const ReleaseNotes = () => {
    // Todo replace fixture with actual release notes json
    return (
        <section>
            <h2 id="releasenotes">Release notes</h2>
                <p><br /> <strong>Genome Properties version: {releaseNoteFixture.version}</strong>
                    <br /> <strong>Date: {releaseNoteFixture.releaseDate}</strong>
                        <br /> <strong>Dependency on InterProScan version: {releaseNoteFixture.interProScanVersion}</strong>
                            <br /></p>
                <p>This release contains {releaseNoteFixture.count.genomeProperties} genome properties, and their
                    matches to {releaseNoteFixture.count.proteomes} representative proteomes. {releaseNoteFixture.additionalInfo}
                    as E.coli complexes from the Complex Portal.</p>
                <h2 id="contentsofthisrelease">Contents of this release</h2>
                <div style={{margin: '10px auto'}}>
                    <table className="from-md">
                        <tbody>
                        <tr>
                            <td></td>
                            <td> TOTAL</td>
                            <td> NEW IN THIS RELEASE</td>
                        </tr>

                        {Object.keys(releaseNoteFixture.releaseContent).map(key => {
                            return (
                                <tr key={key}>
                                    <td>{key.toUpperCase()}</td>
                                    <td>{releaseNoteFixture.releaseContent[key].total}</td>
                                    <td>{releaseNoteFixture.releaseContent[key].newlyAdded}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
        </section>
    );
};

export default ReleaseNotes;