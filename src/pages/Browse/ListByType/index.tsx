import { Link } from "react-router-dom";
import { useApi, type GenomePropertySummary } from "@/api";
import Loading from "@/components/Loading";

const ListByType = ({ type }: { type: string }) => {
  const { loading, error, data } = useApi<GenomePropertySummary[]>(
    `/v1/genome-properties?type=${encodeURIComponent(type)}`,
  );

  if (loading) return <Loading />;
  if (error) return <p>Error!</p>;

  if (data?.length) {
    return data.map(({ accession, description }) => (
      <div key={accession}>
        <Link to={`/genome-property/${accession}`}>{accession}</Link> : {description}
      </div>
    ));
  }

  return <div>None</div>;
};

export default ListByType;
