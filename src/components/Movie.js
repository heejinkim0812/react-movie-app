import PropTypes from "prop-types";
import { Link } from "react-router-dom";
function Movie({ id, year, coverImg, title, summary, genres, style }) {
  //props 꺼내서 렌더링
  if (coverImg === "") {
    return null;
  }
  return (
    <div>
      <img src={coverImg} alt={title} />
      <div>
        <h2>
          <Link to={`/movie/${id}`}>
            {title.length > 50 ? `${title.slice(0, 50)}...` : title}
          </Link>
        </h2>
        <h3>{year}</h3>
        <p>{summary.length > 235 ? `${summary.slice(0, 235)}...` : summary}</p>
        <ul>{genres && genres.map((genre) => <li key={genre}>{genre}</li>)}</ul>
      </div>
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string),
};

export default Movie;
