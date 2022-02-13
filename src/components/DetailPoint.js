import styles from "./componentsCSS/DetailPoint.module.css";

function Point({
  backgroundImg,
  coverImg,
  url,
  title,
  rating,
  runtime,
  genres,
  downloads,
}) {
  return (
    <div>
      <img className={styles.bg} src={backgroundImg} />
      <div className={styles.show}>
        <img className={styles.img} src={coverImg} />
        <div className={styles.textbox}>
          <h1 className={styles.title}>
            <a href={url} target="_blank">
              {title}
            </a>
          </h1>
          <ul>
            <li>Rating {rating}</li>
            <li>Runtime {runtime}</li>
            <li>Download {downloads}</li>
            <li>
              Genres
              <ul>
                {genres.map((genre) => (
                  <li>{genre}</li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Point;
