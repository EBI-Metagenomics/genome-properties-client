import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { BY_TYPE } from "../../../../graphql/queries";
import Loading from "../../../Loading";

const ListByType = ({ type }: { type: string }) => {
  const { loading, error, data } = useQuery(BY_TYPE, {
    variables: { type },
  });

  if (loading) return <Loading />;
  if (error) return <p>Error!</p>;

  if (data?.genomeProperties?.edges?.length) {
    return data.genomeProperties.edges.map((edge: any) => {
      const { accession, description } = edge.node;
      return (
        <div key={accession}>
          <Link to={`/genome-property/${accession}`}>{accession}</Link> : {description}
        </div>
      );
    });
  }

  return <div>None</div>;
};

export default ListByType;
