import React from 'react';
import AboutGP from '../../../../images/web_fig_GP_small2.png'

const AboutGenomeProperties = () => {
    return (
        <section>
            <h2 id="aboutgenomeproperties">About Genome Properties</h2>
                <p>
                    Genome properties (GP) is an annotation system whereby functional attributes can be assigned to a
                    genome, based on the presence of a defined set of protein family markers within that genome.
                    For example, a species can be proposed to synthesise proline if it can be shown that the genome for
                    that species encodes all the necessary proteins required to carry out the various biochemical steps
                    in the proline biosynthesis pathway.
                </p>
                <p>
                    <img src={AboutGP} alt="Genome Properties"/>
                </p>
                <p>
                    While it is possible to infer this kind of information through analysis of genomic sequence, using
                    protein family models, like those utilised by InterPro, reduces the number of calculations while at
                    the same time increasing the sensitivity of the query. Integrating the GP annotations into InterPro
                    makes the process of calculating a genome property for any given genome/proteome faster and more
                    accurate than by sequence comparison. The process is further streamlined by the fact that all
                    UniProt sequences, already come with InterPro matches calculated.
                    Each GP is defined as a numbered series of biochemical steps, which in turn have some form of
                    evidence determining the presence of the protein required for that step (usually a profile hidden
                    Markov model, or HMM). The property may include steps which are not strictly necessary, but often
                    take place within the process being described. In the calculation of a GP, the evidence for each
                    <em>required</em> step is tested against the genome/proteome under query. Where all steps can be
                    encoded by the query genome, the output is a YES. Where some (above a defined threshold level)
                    steps can be shown to be encoded, the output is a PARTIAL. Where no steps can be shown to be
                    encoded (or fewer than the threshold level), the output is a NO.
                </p>
                <p>
                    For more information about calculating Genome Properties, see
                    <a href="#calculating">here </a>.
                </p>
            <h3 id="howtoaccessgenomepropertiesdata">How to access Genome Properties data</h3>
                <p>
                    <strong>Browse by Genome Property:</strong>
                    You can browse to your GP of interest using the hierarchy browser. GPs are arranged into categories
                    and subcategories for easy naviagtion. Each GP contains a descriptive abstract describing the
                    property, as well as the individual steps comprising it. For more infomration on the content of
                    the GP files, see here (link to flatfile description).
                </p>
                <p>
                    You can also navigate to your GP of interest using the lists of various property types (PATHWAY,
                    SYSTEM, GUILD, etc) provided under the Browse tab.
                </p>
                <p>
                    <strong>Browse by Proteome/Genome:</strong>
                    You can browse GPs by species/genome/proteome using our customisable viewer. All GPs are calculated
                    against a representative set of proteomes as provided by UniProt. The output of each GP calculation
                    (yes, no or partial) is reported for each species, in the form of a colour coded matrix. This viewer
                    is easily customisable by the user to allow only specified species/proteoms of interest, as well as
                    GPs of interest, to be included and compared. This viewer allows you to quickly and easily compare
                    the overall "fingerprint" of GP content for a set of species, or indeed the species distribution of
                    a set of GPs.
                </p>
                <p>
                    <strong>Upload your data:</strong>
                    Further to the features of our interactive viewer already described, you are also able to upload
                    your own proteome data and compare this against the representative set of proteomes available. By
                    analysing your proteome of interest using InterProScan, an output file of InterPro matches is
                    produced. This file (tsv version) can be uploaded to the viewer page, allowing you to view the GP
                    results for your proteome of interest in the colour-coded matrix viewer alongside your chosen
                    comparison set of proteomes/species.
                </p>
            <h2 id="background">Background</h2>
                <p>
                    Genome Properties were developed at J. Craig Venter Institute within the TIGRFAM group
                    [<a href="http://doi.org/10.1093/bioinformatics/bti015">PMID:15347579 </a>,
                    <a href="http://doi.org/10.1093/nar/gks1234">PMID:23197656 </a>] as a way to improve the functional
                    annotation of proteins, as well as providing a resource to assist in comparative genomics. They were
                    based predominantly on TIGRFAM HMM models for step evidence, supplemented with some Pfam models.
                </p>
                <p>
                    One of the main benefits of integrating GP into InterPro is that through the InterPro system of
                    pulling together protein signatures from a range of member databases, there is now a very large
                    potential pool of protein models available to use as evidence for steps, including multiple levels
                    of specificity. In general, we use specific family models in the calculation of GP steps.
                </p>
        </section>
    );
};

export default AboutGenomeProperties;