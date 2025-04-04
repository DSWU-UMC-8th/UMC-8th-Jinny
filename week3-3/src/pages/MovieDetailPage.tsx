import { useParams } from "react-router-dom";

const MovieDetailPage = () => {
  const param = useParams();

  console.log(param);
  return <div>detail</div>;
};

export default MovieDetailPage;
