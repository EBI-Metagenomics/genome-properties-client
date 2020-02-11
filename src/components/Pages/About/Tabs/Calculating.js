import React from 'react';

const Calculating = () => {
    return (
        <section>
            <h2 id="calculatinggenomeproperties">Calculating Genome Properties</h2>
                <p>
                    The presence or absence of genome properties (GPs) within a given proteome, is calculated based on
                    the matches to the relevant InterPro entries and their associated protein signatures. The evidence
                    (HMM) for each constituent step is tested against the proteome in question, and each step defined as
                    a hit or a miss. The total number of hits is then compared with the threshold level defined for the
                    GP, to determine if the GP resolves to a YES (all required steps are present), NO (too few required
                    steps are present) or PARTIAL (the number of required steps present is greater than the threshold,
                    indicating that some evidence of the presence of the GP can be assumed).
                </p>
                <p>
                    It is possible for users to calculate the GPs results for any novel proteome either using the website
                    viewer, or by running the analysis locally using a script available from the GitHub repository. In
                    either case, users begin with their own query "proteome" in the form of a list of protein sequences
                    in FASTA format. The InterProScan matches for this proteome must then be calculated. This can either
                    be done using EBI webservices, or by downloading InterProScan and running the calculation locally.
                    By either method, the InterProScan matches must be output as TSV format. For more information on
                    using InterProScan, please see <a href="https://www.ebi.ac.uk/interpro/interproscan.html">here </a>.
                </p>
                <h3 id="websiteviewermethod">Website/Viewer method</h3>
                <p>
                    To display the GPs results for your proteome, navigate to the <a href="#viewer">Viewer </a> page, and
                    upload the TSV file using the Browse/Choose File button at the top left of the page. The GPs results
                    will be loaded into the matrix (with the file name displayed in red) allowing easy comparison of the
                    pattern of assertions for the user-defined proteome, with the set of representative species results.
                </p>
                <h3 id="localanalysismethod">Local analysis method</h3>
                <p>
                    To calculate the GPs results for your proteome locally, you must first either clone, or download and
                    uncompress a release bundle, from the <a href="https://github.com/ebi-pf-team/genome-properties">GitHub
                    repository</a>, and ensure that the perl modules are in the PERL5LIB (i.e $ export
                    PERL5LIB=$PERL5LIB:
                    <path to="" gps="" clone="">/code/modules). It is then possible to
                        run <code>assign_genome_properties.pl</code> using the TSV file as the input, and specifying the
                        required output (outfiles) format.
                    </path>
                </p>
                <p>The various flags/options are described here:</p>
                <pre>
                    <code>
{` == Sequence set ==
   One or both of these two options:
   matches &lt;filename|TSV content&gt; : TSV file of InterProScan5 output.
   match_source &lt;file|inline&gt; : file or inline. Default is to assume file.

   == Calculation options ==
   One of the following three:
   all                      : Calculate against all Genome Properties
   property &lt;accession&gt;     : Calculate against
   list     &lt;filename&gt;      : Filename containing a list of Genome Properties that need
                                                       : to be evaluatated.

   == Genome Properties files ==
   Both of these are required:
   gpdir &lt;directory name&gt;   : Genome Properties release directory
   gpff  &lt;filename&gt;         : Name of the flatfile

   Optional:
   eval_order &lt;filename&gt;    : File containing an optimal evaluation order.

   == Output options ==
   name &lt;name&gt;              : Output file tag name (required). This will be prefixed
                                    depending on the outputs requested.
   outdir &lt;directory name&gt;  : Name of the output directory (optional, default pwd).
   outfiles &lt;format&gt;        : Format can be one of the following [summary|long|table|match|web_json]
                                  : To get multiple output files use option multiple times


  Example command executed from within /code/scripts/

  $ ./assign_genome_properties.pl -matches INPUT_FILE.tsv -all -name OUTPUT_FILE -gpdir ../../flatfiles/ -gpff genomeProperties.txt -outdir ~user/analysis/ -outfiles summary
`}                    </code>
                </pre>
                <div style={{margin: '10px auto'}}>
                    <table className="from-md">
                        <tbody>
                        <tr>
                            <td>Description of available output formats</td>
                        </tr>

                        <tr>
                            <td>summary</td>
                            <td> lists only GPs results (YES/NO)</td>
                        </tr>

                        <tr>
                            <td>table</td>
                            <td> includes individual step results (1/0) as well as GPs results (YES/NO)</td>
                        </tr>

                        <tr>
                            <td>web_json</td>
                            <td> includes individual step results (1/0) as well as GPs results (YES/NO) in json format
                            </td>
                        </tr>

                        <tr>
                            <td>long</td>
                            <td> includes individual step information and results (YES/NO) as well as GPs results
                                (YES/NO)
                            </td>
                        </tr>

                        <tr>
                            <td>match</td>
                            <td> lists only those evidences and GPs with protein matches</td>
                        </tr>

                        </tbody>
                    </table>
                </div>
        </section>
    );
};

export default Calculating;