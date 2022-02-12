function Point({
  backgroundImg,
  coverImg,
  url,
  title,
  rating,
  runtime,
  genres,
  downloads,
  summary,
}) {
  return (
    <div>
      <img src={backgroundImg} />
      <div>
        <img src={coverImg} />
        <div>
          <h1>
            <a herf={url} target="_blank">
              {title}
            </a>
          </h1>
          <ul>
            <li>Rating {rating}</li>
            <li>Runtime {runtime}</li>
            <li>Download {downloads}</li>
            <li>
              Genre
              <ul>{genres && genres.map((g) => <li key={g}>{g}</li>)}</ul>
            </li>
            <li> {summary}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Point;
