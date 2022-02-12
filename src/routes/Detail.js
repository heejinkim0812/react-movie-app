import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Point from "../components/Point";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [datas, setDatas] = useState({});

  useEffect(() => {
    fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
      .then((response) => response.json())
      .then((json) => {
        setDatas(json.data.movie);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Point
          backgroundImg={datas.background_image_original}
          coverImg={datas.medium_cover_image}
          url={datas.url}
          title={datas.title_long}
          rating={datas.rating}
          runtime={datas.runtime}
          genres={datas.genres}
          downloads={datas.download_count}
          summary={datas.description_intro}
        />
      )}
    </div>
  );
}
export default Detail;
