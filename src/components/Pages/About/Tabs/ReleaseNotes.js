import React from 'react';

const ReleaseNotes = () => {
    return (
        <section>
            <h2 id="releasenotes">Release notes</h2>
                <p><br /> <strong>Genome Properties version: v2.0</strong>
                    <br /> <strong>Date: August 2018</strong>
                        <br /> <strong>Dependency on InterProScan version: 5.30-69.0</strong>
                            <br /></p>
                <p>This release contains 1286 genome properties, and their matches to 219 representative proteomes.
                    Major new additions in this release include automatically generated properties from MetaCyc as well
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

                        <tr>
                            <td> PATHWAY</td>
                            <td> 664</td>
                            <td> 536</td>
                        </tr>

                        <tr>
                            <td> METAPATH</td>
                            <td> 60</td>
                            <td> 13</td>
                        </tr>

                        <tr>
                            <td> SYSTEM</td>
                            <td> 327</td>
                            <td> 5</td>
                        </tr>

                        <tr>
                            <td> GUILD</td>
                            <td> 16</td>
                            <td> 2</td>
                        </tr>

                        <tr>
                            <td> COMPLEX</td>
                            <td> 132</td>
                            <td> 132</td>
                        </tr>

                        <tr>
                            <td> CATEGORY</td>
                            <td> 87</td>
                            <td> 18</td>
                        </tr>

                        </tbody>
                    </table>
                </div>
        </section>
    );
};

export default ReleaseNotes;