import { releaseNotes } from "@/data/releaseNotes";

const ReleaseNotes = () => {
  return (
    <section>
      <h2 id="releasenotes">Release notes</h2>
      <p>
        <br /> <strong>Genome Properties version: {releaseNotes.version}</strong>
        <br /> <strong>Date: {releaseNotes.releaseDate}</strong>
        <br />{" "}
        <strong>
          Dependency on InterProScan version: {releaseNotes.interProScanVersion}
        </strong>
        <br />
      </p>
      <p>
        This release contains {releaseNotes.count.genomeProperties} genome
        properties, and their matches to {releaseNotes.count.proteomes}{" "}
        representative proteomes. {releaseNotes.additionalInfo}
      </p>
      <h2 id="contentsofthisrelease">Contents of this release</h2>
      <div style={{ margin: "10px auto" }}>
        <table className="from-md">
          <tbody>
            <tr>
              <td></td>
              <td> TOTAL</td>
              <td> NEW IN THIS RELEASE</td>
            </tr>
            {Object.entries(releaseNotes.releaseContent).map(
              ([key, content]) => (
                <tr key={key}>
                  <td>{key.toUpperCase()}</td>
                  <td>{content.total}</td>
                  <td>{content.newlyAdded}</td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ReleaseNotes;
