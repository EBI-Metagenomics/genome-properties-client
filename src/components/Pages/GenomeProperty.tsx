import { Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import { useApi, type GenomePropertyDetail } from "../../api";
import Loading from "../Loading";

const renderDBLink = (id, link, others) => {
  switch (id) {
    case "KEGG":
      return (
        <a
          href={`http://www.genome.jp/dbget-bin/www_bget?pathway:${link}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          KEGG
        </a>
      );
    case "IUBMB":
      return (
        <a
          href={`http://www.chem.qmul.ac.uk/iubmb/enzyme/reaction/${link}/${others}.html`}
          target="_blank"
          rel="noopener noreferrer"
        >
          IUBMB
        </a>
      );
    case "MetaCyc":
      return (
        <a
          href={`https://metacyc.org/META/NEW-IMAGE?type=NIL&object=${link}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          MetaCyc
        </a>
      );
    case "Complex Portal":
      return (
        <a
          href={`https://www.ebi.ac.uk/complexportal/complex/${link}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Complex Portal
        </a>
      );
    case "PDBe":
      return (
        <a
          href={`https://www.ebi.ac.uk/pdbe/entry/pdb/${link}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          PDBe
        </a>
      );
    default:
      return null;
  }
};

const renderEvidenceLink = (id) => {
  if (id.startsWith("GO:"))
    return (
      <a
        href={`http://www.ebi.ac.uk/QuickGO/GTerm?id=${id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {id}
      </a>
    );
  else if (id.startsWith("IPR"))
    return (
      <a
        href={`https://www.ebi.ac.uk/interpro/entry/${id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {id}
      </a>
    );
  else if (id.startsWith("TIGR"))
    return (
      <a
        href={`http://www.jcvi.org/cgi-bin/tigrfams/HmmReportPage.cgi?acc=${id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {id}
      </a>
    );
  else return null;
};

const GenomeProperty = () => {
  const { accession } = useParams();
  const { loading, error, data: gp } = useApi<GenomePropertyDetail>(
    accession ? `/genome-properties/${encodeURIComponent(accession)}/` : null,
  );

  if (loading) return <Loading />;
  if (error || !gp) return <p>Error! </p>;
  return (
    <section className={"gp-content"}>
      <h2>
        {accession} - {gp.description}
      </h2>
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
          {gp.literature.length > 0 ? (
            gp.literature.map((litRef, i) => (
              <li
                className="reference"
                id={`${accession}-${litRef.listOrder}`}
                key={`${accession}-${litRef.listOrder}`}
              >
                <span className="index">[{i + 1}]</span>
                <span className="authors">{(litRef.author || "") + " "}</span>
                <span className="title">{(litRef.title || "") + " "}</span>
                <span className="citation">{(litRef.journal || "") + " "}</span>
                <span className="reference_id">{litRef.pmid + " "}</span>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://europepmc.org/abstract/MED/${litRef.pmid}`}
                >
                  EuropePMC
                </a>
              </li>
            ))
          ) : (
            <cite>None</cite>
          )}
        </ul>
      </div>
      <div>
        <h4>Database Links</h4>

        <ul>
          {gp.databaseLinks.length > 0 ? (
            gp.databaseLinks.map(({ dbId, dbLink, comment, otherParams }) => (
              <li key={dbId}>
                <b>{comment}</b>: {renderDBLink(dbId, dbLink, otherParams)}
              </li>
            ))
          ) : (
            <cite>None</cite>
          )}
        </ul>
      </div>
      {gp.type === "CATEGORY" ? (
        <div>
          <h4>Genome properties</h4>
          <table
            className="no-stripe"
            style={{ backgroundColor: "#337fb6", borderCollapse: "separate" }}
          >
            <tbody>
              <tr style={{ backgroundColor: "#ddd" }}>
                <th style={{ width: "30%" }}>Property</th>
                <th style={{ textAlign: "left" }}>Accession</th>
              </tr>

              {gp.steps.map((step, i) => {
                if (!step.childAccession) return null;
                return (
                  <tr
                    style={{ backgroundColor: "white" }}
                    key={step.childAccession}
                  >
                    <td>
                      {i + 1}.{" "}
                      <Link to={`/genome-property/${step.childAccession}`}>
                        {step.stepId}
                      </Link>
                    </td>
                    <td>
                      <Link to={`/genome-property/${step.childAccession}`}>
                        {step.childAccession}
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <h4>Steps</h4>
          <table
            className="no-stripe"
            style={{ backgroundColor: "#337fb6", borderCollapse: "separate" }}
          >
            <tbody>
              <tr style={{ backgroundColor: "#ddd" }}>
                <th style={{ width: "30%" }}>Step</th>
                <th style={{ textAlign: "left" }}>Evidence</th>
                <th style={{ textAlign: "left" }}>Go Terms</th>
              </tr>

              {gp.steps.map((step) => (
                <Fragment key={`${step.stepId}-${step.stepNumber}`}>
                  {step.evidence.map((item, i) => (
                    <Fragment key={`${step.stepId}-${step.stepNumber}-${i}`}>
                      {i > 0 ? (
                        <tr style={{ backgroundColor: "white" }}>
                          <td>
                            {renderEvidenceLink(item.interproAcc)} -{" "}
                            {renderEvidenceLink(item.signatureAcc)}
                          </td>
                          <td>
                            {item.goId ? (
                              renderEvidenceLink(item.goId)
                            ) : (
                              <cite>None</cite>
                            )}
                          </td>
                        </tr>
                      ) : (
                        <tr style={{ backgroundColor: "white" }}>
                          <td rowSpan={step.evidence.length}>
                            {step.stepNumber}. {step.stepId}
                            {step.required ? null : (
                              <>
                                {" "}
                                <br />{" "}
                                <span className="tag secondary">Optional</span>
                              </>
                            )}
                          </td>
                          <td>
                            {renderEvidenceLink(item.interproAcc)} -{" "}
                            {renderEvidenceLink(item.signatureAcc)}
                          </td>
                          <td>
                            {item.goId ? (
                              renderEvidenceLink(item.goId)
                            ) : (
                              <cite>None</cite>
                            )}
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
          <span
            data-tooltip="2u4ti4-tooltip"
            aria-haspopup="true"
            data-disable-hover="false"
            className="has-tip tag secondary"
            title=""
            aria-describedby="adw5gt-tooltip"
            data-yeti-box="adw5gt-tooltip"
            data-toggle="adw5gt-tooltip"
            data-resize="adw5gt-tooltip"
          >
            Threshold: {gp.threshold}
          </span>
        </div>
      )}
    </section>
  );
};

export default GenomeProperty;
