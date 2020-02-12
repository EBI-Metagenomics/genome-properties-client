import React from 'react';
import { useQuery } from "@apollo/react-hooks";
import { gql } from 'apollo-boost';
import {Link} from "react-router-dom";

const GENOME_PROPERTY = gql `
 query ($accession: String!) { 
    genomeProperties(accession: $accession) {
    edges {
      node {
        accession,
        type,
        author,
        description,
        threshold,
        comment,
        gplitrefSet {
          edges {
            node {
              literatureReferencePmid {
                pmid,
                title,
                author,
                journal
              }
              listOrder
            }
          }
        }
        gpdatabaselinkSet {
          edges {
            node {
              dbId,
              dbLink,
              comment,
              otherParams
            }
          }
        }
        gpstepSet {
          edges {
            node {
              autoStep,
              stepId,
              stepNumber,
              required,
              gpstepevidencegpSet {
                edges {
                  node {
                    gpAccession {
                      accession
                    }
                  }
                }
              },
              gpstepevidenceiprSet {
                edges {
                  node {
                    interproAcc,
                    signatureAcc,
                    autoIprStep,
                    iprsteptogoSet {
                      edges {
                        node {
                          go {
                            goId
                          } 
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
 }
 
`;

const renderDBLink = (id, link, others) => {
    switch (id) {
        case "KEGG":
            return <a href={`http://www.genome.jp/dbget-bin/www_bget?pathway:${link}`} target="_blank" rel="noopener noreferrer">KEGG</a>;
        case "IUBMB":
            return <a href={`http://www.chem.qmul.ac.uk/iubmb/enzyme/reaction/${link}/${others}.html`} target="_blank" rel="noopener noreferrer">IUBMB</a>;
        case "MetaCyc":
            return <a href={`https://metacyc.org/META/NEW-IMAGE?type=NIL&object=${link}`} target="_blank" rel="noopener noreferrer">MetaCyc</a>;
        case "Complex Portal":
            return <a href={`https://www.ebi.ac.uk/complexportal/complex/${link}`} target="_blank" rel="noopener noreferrer">Complex Portal</a>;
        case "PDBe":
            return <a href={`https://www.ebi.ac.uk/pdbe/entry/pdb/${link}`} target="_blank" rel="noopener noreferrer">PDBe</a>;
        default:
            return null;
    }
};

const renderEvidenceLink = (id) => {
    if (id.startsWith("GO:"))
        return <a href={`http://www.ebi.ac.uk/QuickGO/GTerm?id=${id}`} target="_blank" rel="noopener noreferrer">{id}</a>;
    else if (id.startsWith("IPR"))
        return <a href={`https://www.ebi.ac.uk/interpro/entry/${id}`} target="_blank" rel="noopener noreferrer">{id}</a>;
    else if (id.startsWith("TIGR"))
        return <a href={`http://www.jcvi.org/cgi-bin/tigrfams/HmmReportPage.cgi?acc=${id}`} target="_blank" rel="noopener noreferrer">{id}</a>;
    else
        return null;
};

const GenomeProperty = (props) => {
    const { accession } = props.location.state;
    const { loading, error, data } = useQuery(GENOME_PROPERTY, {
        variables: { accession: accession}
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error! </p>;

    const gp = data.genomeProperties.edges[0].node;
    return (
        <section>
            <h2>{accession} - {gp.description}</h2>
            <span className="tag">Type: {gp.type}</span>
            <br />
            <br />
            <div>Author: {gp.author}</div>
            <br />
            <div>
                <h4>Description</h4>
                {gp.comment} {/* Todo Fix link*/}
            </div>
            <div>
                <h4>References</h4>

                <ul className="references">
                    {gp.gplitrefSet?.edges.length > 0 ? gp.gplitrefSet.edges.map((edge, i) => {
                        const {literatureReferencePmid: litRef, listOrder} = edge.node;
                        return (
                            <li className="reference" id={`${accession}-${listOrder}`} key={`${accession}-${listOrder}`}>
                                <span className="index">[{i +1}]</span>
                                <span className="authors">{litRef.author + ' '}</span>
                                <span className="title">{litRef.title + ' '}</span>
                                <span className="citation">{litRef.journal+ ' '}</span>
                                <span className="reference_id">{litRef.pmid+ ' '}</span>
                                <a target="_blank" rel="noopener noreferrer"
                                   href={`https://europepmc.org/abstract/MED/${litRef.pmid}`}>EuropePMC</a>
                            </li>
                        );
                    }) : <cite>None</cite>}
                </ul>
            </div>
            <div>
                <h4>Database Links</h4>

                <ul>
                    {gp.gpdatabaselinkSet?.edges.length > 0 ? gp.gpdatabaselinkSet.edges.map(edge => {
                        const {dbId, dbLink, comment, otherParams} = edge.node;
                        return (
                            <li key={dbId}>
                                <b>{comment}</b>: {renderDBLink(dbId, dbLink, otherParams)}
                            </li>
                        );
                    }) : <cite>None</cite>}
                </ul>
            </div>
            {gp.type === "CATEGORY" ?
                <div>
                    <h4>Genome properties</h4>
                    <table className="no-stripe" style={{backgroundColor: "#86a5bb"}}>
                        <tbody>
                        <tr style={{backgroundColor: "#ddd"}}>
                            <th width="30%">Property
                            </th>
                            <th style={{textAlign: "left"}}>Accession</th>
                        </tr>

                        {gp.gpstepSet.edges.map((edge, i) => {
                            const {stepId, gpstepevidencegpSet} = edge.node;
                            const accNode = gpstepevidencegpSet.edges[0].node.gpAccession;
                            return (
                                <tr style={{backgroundColor: "white"}}>
                                    <td>
                                        {i +1}. <Link className="link" to={{
                                        pathname: "/genome-property",
                                        hash:`#${accNode.accession}`,
                                        state: {
                                            accession: accNode.accession,
                                        }
                                    }}>{stepId}</Link>
                                    </td>
                                    <td>
                                        <Link className="link" to={{
                                        pathname: "/genome-property",
                                        hash:`#${accNode.accession}`,
                                        state: {
                                            accession: accNode.accession,
                                        }
                                    }}>{accNode.accession}</Link>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
                : <div>
                    <h4>Steps</h4>
                    <table className="no-stripe" style={{backgroundColor: '#86a5bb'}}>
                        <tbody>
                        <tr style={{backgroundColor: '#ddd'}}>
                            <th width="30%">Step
                            </th>
                            <th style={{textAlign: 'left'}}>Evidence</th>
                            <th style={{textAlign: 'left'}}>Go Terms</th>
                        </tr>

                        {gp.gpstepSet.edges.map(edge => {
                            const {stepId, stepNumber, required, gpstepevidenceiprSet} = edge.node;
                            return (
                                <React.Fragment key={`${stepId}-${stepNumber}`}>
                                    {gpstepevidenceiprSet.edges.map((stepEdge, i) => {
                                        const gpToIpr = stepEdge.node;
                                        const iprToGo = gpToIpr.iprsteptogoSet?.edges[0]?.node;
                                        return (
                                            <React.Fragment key={`${stepId}-${stepNumber}-${i}`}>
                                                {i > 0 ?
                                                    <tr style={{backgroundColor: "white"}}>
                                                        <td>
                                                            {renderEvidenceLink(gpToIpr.interproAcc)} - {renderEvidenceLink(gpToIpr.signatureAcc)}
                                                        </td>
                                                        <td>
                                                            {iprToGo ?
                                                                renderEvidenceLink(iprToGo.go.goId)
                                                                : <cite>None</cite>}
                                                        </td>
                                                    </tr> :
                                                    <tr style={{backgroundColor: 'white'}}>
                                                        <td rowSpan={gpstepevidenceiprSet.edges.length}>
                                                            {stepNumber}. {stepId}
                                                            {required ? null : <> <br/> < span className="tag secondary">Optional</span></>}
                                                        </td>
                                                        <td>
                                                            {renderEvidenceLink(gpToIpr.interproAcc)} - {renderEvidenceLink(gpToIpr.signatureAcc)}
                                                        </td>
                                                        <td>
                                                            {iprToGo ?
                                                                renderEvidenceLink(iprToGo.go.goId)
                                                                : <cite>None</cite>}
                                                        </td>
                                                    </tr>
                                                }
                                            </React.Fragment>
                                        );
                                    })}
                                </React.Fragment>
                            );
                        })}
                        </tbody>
                    </table>
                    <span data-tooltip="2u4ti4-tooltip" aria-haspopup="true" data-disable-hover="false"
                          className="has-tip tag secondary" title="" aria-describedby="adw5gt-tooltip"
                          data-yeti-box="adw5gt-tooltip" data-toggle="adw5gt-tooltip" data-resize="adw5gt-tooltip">
                    Threshold: {gp.threshold}
                </span>
                </div>
                }
        </section>
    );
};

export default GenomeProperty;