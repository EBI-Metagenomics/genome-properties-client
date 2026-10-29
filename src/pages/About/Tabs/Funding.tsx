import ExternalLink from "@/components/ExternalLink";
import { links } from "@/config";
import BBSRCLogo from "@/images/bbsrc-logo.png";
import EMBLLogo from "@/images/embl-logo_small.jpg";
import NSFLogo from "@/images/nsf1.jpg";

const Funding = () => {
  return (
    <section>
      <h2 id="funding">Funding</h2>
      <p>National Science Foundation, grant number 1458808</p>
      <p>Genome Properties is supported by the following organisations:</p>
      <div style={{ margin: "10px auto" }}>
        <table className="from-md">
          <tbody>
            <tr>
              <td>
                <ExternalLink href={links.embl} title="EMBL-EBI">
                  <img src={EMBLLogo} alt="EMBL Logo" />
                </ExternalLink>
              </td>
              <td> EMBL is EMBL-EBI's parent organisation</td>
            </tr>
            <tr>
              <td>
                <ExternalLink
                  href={links.bbsrc}
                  title="Biotechnology and Biological Sciences Research Council"
                >
                  <img src={BBSRCLogo} alt="BBSRC Logo" />
                </ExternalLink>
              </td>
              <td> Biotechnology and Biological Sciences Research Council</td>
            </tr>
            <tr>
              <td>
                <ExternalLink href={links.nsf} title="National Science Foundation">
                  <img src={NSFLogo} alt="NSF Logo" />
                </ExternalLink>
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
