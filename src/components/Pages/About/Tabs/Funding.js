import React from 'react';
import EMBLLogo from '../../../../images/embl-logo_small.jpg';
import BBSRCLogo from '../../../../images/bbsrc-logo.png';
import NSFLogo from '../../../../images/nsf1.jpg';

const Funding = () => {
    return (
        <section>
                <h2 id="funding">Funding</h2>
                <p>National Science Foundation, grant number 1458808</p>
                <p>Genome Properties is supported by the following organisations:</p>
                <div style={{margin: '10px auto'}}>
                    <table className="from-md">
                        <tbody>
                        <tr>
                            <td>
                                <a href=" http://www.embl.org" alt=" EMBL-EBI">
                                    <img src={EMBLLogo} alt="EMBL Logo"/>
                                </a>
                            </td>
                            <td> EMBL is EMBL-EBI's parent organisation</td>
                        </tr>

                        <tr>
                            <td>
                                <a href=" http://www.bbsrc.ac.uk"
                                   alt=" Biotechnology and Biological Sciences Research Council">
                                    <img src={BBSRCLogo} alt="BBSRC Logo"/>
                                </a>
                            </td>
                            <td> Biotechnology and Biological Sciences Research Council</td>
                        </tr>

                        <tr>
                            <td>
                                <a href=" https://www.nsf.gov" alt=" National Science Foundation">
                                    <img src={NSFLogo} alt="NSF Logo"/>
                                </a>
                            </td>
                            <td> National Science Foundation</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
        </section>
    );
};

export default Funding;