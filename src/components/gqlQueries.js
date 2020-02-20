import { gql } from 'apollo-boost';

export const BY_TYPE = gql `
    query ($type: String!) {
        genomeProperties (type: $type) {
            edges {
                node {
                    accession
                    description
                }
            }
        }
    }
`;

export const HIERARCHY = gql `
 query ($accession: String!) {
    genomeProperties (accession: $accession) {
    edges {
      node {
        accession,
        description
        gpstepSet {
          edges {
            node {
              gpstepevidencegpSet {
                edges {
                  node {
                    gpAccession {
                      accession,
                      description
                      gpstepSet {
                        edges {
                          node {
                            gpstepevidencegpSet {
                              edges {
                                node {
                                  gpAccession {
                                    accession,
                                    description,
                                    gpstepSet {
                                      edges {
                                        node {
                                          gpstepevidencegpSet {
                                            edges {
                                              node {
                                                gpAccession {
                                                  accession,
                                                  description,
                                                  gpstepSet {
                                                    edges {
                                                      node {
                                                        gpstepevidencegpSet {
                                                          edges {
                                                            node {
                                                              gpAccession {
                                                                accession,
                                                                description
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
      }
    }
  }
 }
`;

export const GENOME_PROPERTY = gql `
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
