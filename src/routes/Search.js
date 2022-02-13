import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Loading from "../components/Loading";
import MovieInfo from "../components/MovieInfo";
import styles from "./routesCSS/Group.module.css";

function Search() {
  const { search } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [movArr, setMovArr] = useState([]);

  const getMovies = () => {
    for (let i = 1; i <= 100; i++) {
      setLoading(true);
      setMovies([]);
      fetch(`https://yts.mx/api/v2/list_movies.json?page=${i}&sort_by=rating`)
        .then((res) => res.json())
        .then((json) => setMovies(json.data.movies));
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    setMovArr([]);
    getMovies();
    return;
  }, [search]);

  useEffect(() => {
    if (movies.length === 0) {
      return <Loading />;
    } else {
      setMovArr(
        [
          movArr,
          ...[
            movies.filter(
              (movie) =>
                movie.summary.toLowerCase().indexOf(search.toLowerCase()) !==
                  -1 ||
                movie.description_full
                  .toLowerCase()
                  .indexOf(search.toLowerCase()) !== -1 ||
                movie.title.toLowerCase().indexOf(search.toLowerCase()) !== -1
            ),
          ],
        ]
          .flat()
          .map((movie, i, arr) => {
            for (let j = i + 1; j < arr.length; j++) {
              if (
                movie.id === arr[j].id &&
                arr[j] !== undefined &&
                movie !== undefined
              ) {
                arr.splice(j, 1);
                j -= 1;
              }
            }
            return movie;
          })
          .sort((a, b) => b["rating"] - a["rating"])
      );
    }
  }, [movies]);

  return (
    <div className={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.movies}>
          {movArr.map((movie) => (
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
    </div>
  );
}

export default Search;
