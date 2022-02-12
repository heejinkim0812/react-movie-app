import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";

import Loading from "../components/Loading";
import Movie from "../components/Movie";
import { listPageReLoading, focusNav } from "../atom/Atoms";

const listNums = [...Array(10)].map((_, i) => i + 1);

function Group() {
  const { num, detail } = useParams();
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [reloading, setReloading] = useRecoilState(listPageReLoading);
  const focusPage = useSetRecoilState(focusNav);

  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?page=${num}&${detail}&sort_by=year`
      )
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
    setReloading(false);
    setLoading(true);
    focusPage(detail);
  }, [reloading]);

  console.log(movies);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {movies.map((movie) => {
            <Movie
              key={movie.id}
              id={movie.id}
              year={movie.year}
              coverImg={movie.medium_cover_image}
              title={movie.title}
              summary={movie.summary}
              genres={movie.genres}
            />;
          })}
        </div>
      )}
      <ul>
        {loading
          ? null
          : listNums.map((listNum) => {
              return (
                <li key={listNum}>
                  <Link
                    key={listNum}
                    to={`/page/${detail}/${listNum}`}
                    onClick={() => setReloading(true)}
                  >
                    {listNum}
                  </Link>
                </li>
              );
            })}
      </ul>
    </div>
  );
}
export default Group;
