import React from 'react';

const Species = () => {
    return (
        <section>
            <br/>
            <h2 id="representativespecies">Representative Species</h2>
            <p>
                Genome Properties results are calculated for a representative set of species for each release. This data
                is available within the viewer, either by browsing the taxonomic tree, or by searching for a particular
                species name or taxonomic ID.
            </p>
            <p>The list of species currently included in this set can be found within the GitHub repository, here:
                <a href="https://github.com/ebi-pf-team/genome-properties/blob/master/flatfiles/proteome_list.csv">
                    proteome_list.csv
                </a>.
            </p>
        </section>
    );
};

export default Species;