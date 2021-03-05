import React from "react";
import { Link, withRouter } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { BY_TYPE } from "../../../gqlQueries";
import Loading from "components/Loading";

const ListByType = ({ type }) => {
  const { loading, error, data } = useQuery(BY_TYPE, {
    variables: { type: type },
  });

  if (loading) return <Loading />;
  if (error) return <p>Error! </p>;

  if (data.genomeProperties?.edges?.length) {
    return data.genomeProperties.edges.map((edge) => {
      const { accession, description } = edge.node;
      return (
        <div key={accession}>
          <Link to={`/genome-property/${accession}`}>{accession}</Link> :{" "}
          {description}
        </div>
      );
    });
  }

  return <div>None</div>;
};

export default withRouter(ListByType);
