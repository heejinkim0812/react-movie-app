import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";

import Loading from "../components/Loading";
import MovieInfo from "../components/MovieInfo";
import { listPageReLoading, focusNav } from "../atom/Atoms";
import styles from "./routesCSS/Group.module.css";

const listNums = [...Array(10)].map((_, i) => i + 1);

function Group() {
  const { group, num } = useParams();
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [reloading, setReloading] = useRecoilState(listPageReLoading);
  const focusPage = useSetRecoilState(focusNav);

  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?page=${num}&${group}&sort_by=year`
      )
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    setReloading(false);
    setLoading(true);
    focusPage(group);

    getMovies();
  }, [reloading]);

  return (
    <div className={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.movies}>
          {movies.map((movie) => (
            <MovieInfo
              key={movie.id}
              id={movie.id}
              year={movie.year}
              coverImg={movie.medium_cover_image}
              title={movie.title}
              summary={movie.summary}
              genres={movie.genres}
            />
          ))}
        </div>
      )}
      <ul className={styles.footer}>
        {loading
          ? null
          : listNums.map((listNum) => {
              return (
                <li>
                  <Link
                    to={`/page/${group}/${listNum}`}
                    onClick={() => setReloading(true)}
                    className={listNum == num ? styles.focusing : null}
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
