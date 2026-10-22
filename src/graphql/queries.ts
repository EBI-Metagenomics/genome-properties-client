import { gql } from "@apollo/client";

export const BY_TYPE = gql`
  query GenomePropertiesByType($type: String!) {
    genomeProperties(type: $type) {
      edges {
        node {
          accession
          description
        }
      }
    }
  }
`;

export const BASIC_HIERARCHY = gql`
  query BasicHierarchy($accession: String!) {
    genomeProperties(accession: $accession) {
      edges {
        node {
          accession
          description
          gpstepSet {
            edges {
              node {
                gpstepevidencegpSet {
                  edges {
                    node {
                      gpAccession {
                        accession
                        description
                        gpstepSet {
                          edges {
                            node {
                              gpstepevidencegpSet {
                                edges {
                                  node {
                                    gpAccession {
                                      accession
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
`;

export const HIERARCHY = gql`
  query FullHierarchy($accession: String!) {
    genomeProperties(accession: $accession) {
      edges {
        node {
          accession
          description
          gpstepSet {
            edges {
              node {
                gpstepevidencegpSet {
                  edges {
                    node {
                      gpAccession {
                        accession
                        description
                        gpstepSet {
                          edges {
                            node {
                              gpstepevidencegpSet {
                                edges {
                                  node {
                                    gpAccession {
                                      accession
                                      description
                                      gpstepSet {
                                        edges {
                                          node {
                                            gpstepevidencegpSet {
                                              edges {
                                                node {
                                                  gpAccession {
                                                    accession
                                                    description
                                                    gpstepSet {
                                                      edges {
                                                        node {
                                                          gpstepevidencegpSet {
                                                            edges {
                                                              node {
                                                                gpAccession {
                                                                  accession
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

export const GENOME_PROPERTY = gql`
  query GenomePropertyDetail($accession: String!) {
    genomeProperties(accession: $accession) {
      edges {
        node {
          accession
          type
          author
          description
          threshold
          comment
          gplitrefSet {
            edges {
              node {
                literatureReferencePmid {
                  pmid
                  title
                  author
                  journal
                }
                listOrder
              }
            }
          }
          gpdatabaselinkSet {
            edges {
              node {
                dbId
                dbLink
                comment
                otherParams
              }
            }
          }
          gpstepSet {
            edges {
              node {
                autoStep
                stepId
                stepNumber
                required
                gpstepevidencegpSet {
                  edges {
                    node {
                      gpAccession {
                        accession
                      }
                    }
                  }
                }
                gpstepevidenceiprSet {
                  edges {
                    node {
                      interproAcc
                      signatureAcc
                      autoIprStep
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
