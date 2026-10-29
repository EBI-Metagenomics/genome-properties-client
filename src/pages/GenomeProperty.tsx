import { Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import { useApi, type GenomePropertyDetail } from "@/api";
import ExternalLink from "@/components/ExternalLink";
import Loading from "@/components/Loading";
import {
  databaseLinkHref,
  europePmcHref,
  evidenceLinkHref,
} from "@/utils/links";

const DatabaseLink = ({
  id,
  link,
  others,
}: {
  id: string;
  link: string;
  others?: string | null;
}) => {
  const href = databaseLinkHref(id, link, others);
  if (!href) {
    return null;
  }
  return <ExternalLink href={href}>{id}</ExternalLink>;
};

const EvidenceLink = ({ id }: { id: string }) => {
  const href = evidenceLinkHref(id);
  if (!href) {
    return null;
  }
  return <ExternalLink href={href}>{id}</ExternalLink>;
};

const GenomeProperty = () => {
  const { accession } = useParams();
  const { loading, error, data: gp } = useApi<GenomePropertyDetail>(
    accession ? `/v1/genome-properties/${encodeURIComponent(accession)}` : null,
  );

  if (loading) return <Loading />;
  if (error || !gp) return <p>Error! </p>;
  return (
    <section className="gp-content">
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
        {gp.comment}
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
                <ExternalLink href={europePmcHref(litRef.pmid)}>EuropePMC</ExternalLink>
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
                <b>{comment}</b>:{" "}
                <DatabaseLink id={dbId} link={dbLink} others={otherParams} />
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
                  <tr style={{ backgroundColor: "white" }} key={step.childAccession}>
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
                            <EvidenceLink id={item.interproAcc} /> -{" "}
                            <EvidenceLink id={item.signatureAcc} />
                          </td>
                          <td>
                            {item.goId ? (
                              <EvidenceLink id={item.goId} />
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
                            <EvidenceLink id={item.interproAcc} /> -{" "}
                            <EvidenceLink id={item.signatureAcc} />
                          </td>
                          <td>
                            {item.goId ? (
                              <EvidenceLink id={item.goId} />
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
          <span className="has-tip tag secondary">Threshold: {gp.threshold}</span>
        </div>
      )}
    </section>
  );
};

export default GenomeProperty;
