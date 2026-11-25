import ExternalLink from "@/components/ExternalLink";
import { links } from "@/config";

const Documentation = () => {
  return (
    <section>
      <h2 id="helpdocumentation">Help &amp; Documentation</h2>
      <h2 id="onlinetrainingresources">Online Training Resources</h2>
      <p>
        You can learn more about Genome Properties data and how to use the
        website from these free online courses:
      </p>
      <p>
        For a brief overview (&lt; 30 mins) =&gt;{" "}
        <ExternalLink href={links.trainingQuickTour}>
          Genome Properties Quick Tour
        </ExternalLink>
      </p>
      <p>
        For a more in-depth course (&gt; 30 mins) =&gt;{" "}
        <ExternalLink href={links.trainingTutorial}>
          Genome Properties Tutorial
        </ExternalLink>
      </p>
      <h2 id="documentation">Documentation</h2>
      <p>
        We use GitHub as our data repository, and readthedocs to store our
        documentation. You can access the ReadMe file for the GitHub repository
        here:
      </p>
      <p>
        <ExternalLink href={links.githubReadme}>GitHub ReadMe</ExternalLink>
      </p>
      <p>and the documentation for Genome Properties here:</p>
      <p>
        <ExternalLink href={links.readthedocs}>
          Genome Properties readthedocs
        </ExternalLink>
      </p>
      <h2 id="publications">Publications</h2>
      <p>
        <strong>
          To cite Genome Properties, please refer to the following publication:
        </strong>
      </p>
      <p>
        Richardson LJ, Rawlings ND, Salazar GA, Almeida A, Haft DR, Ducq G,
        Sutton GG, Finn RD. Genome properties in 2019: a new companion database
        to InterPro for the inference of complete functional attributes. Nucleic
        Acids Res. 2018 Oct. doi:10.1093/nar/gky1013. PMID: 30364992.{" "}
        <ExternalLink href={links.paperNar}>doi:10.1093/nar/gky1013</ExternalLink>
      </p>
      <p>
        <strong>
          For a list of previous publications referring to Genome Properties,
          please see here:
        </strong>
      </p>
      <p>
        Haft DH, Selengut JD, Richter RA, Harkins D, Basu MK, Beck E. TIGRFAMs
        and Genome Properties in 2013. Nucleic Acids Res. 2013 Jan;41(Database
        issue) D387-95. doi:10.1093/nar/gks1234. PMID: 23197656; PMCID:
        PMC3531188.
      </p>
      <p>
        Selengut JD, Haft DH, Davidsen T, Ganapathy A, Gwinn-Giglio M, Nelson
        WC, Richter AR, White O. TIGRFAMs and Genome Properties: tools for the
        assignment of molecular function and biological process in prokaryotic
        genomes. Nucleic Acids Res. 2007 Jan;35(Database issue) D260-4.
        doi:10.1093/nar/gkl1043. PMID: 17151080; PMCID: PMC1781115.
      </p>
      <p>
        Haft DH, Selengut JD, Brinkac LM, Zafar N, White O. Genome Properties: a
        system for the investigation of prokaryotic genetic content for
        microbiology, genome annotation and comparative genomics.
        Bioinformatics. 2005 Feb;21(3) 293-306. doi:10.1093/bioinformatics/bti015.
        PMID: 15347579.
      </p>
    </section>
  );
};

export default Documentation;
