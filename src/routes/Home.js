import { Link } from "react-router-dom";
import HomeSlide from "../components/HomeSlide";
import NavList from "../atom/NavList";
import styles from "./routesCSS/Home.module.css";

function Home() {
  return (
    <div className={styles.container}>
      {NavList.map((slide) => {
        return (
          <div className={styles.slide__box}>
            <h3 className={styles.title}>
              <Link to={`/page/${slide.path}/1`}>
                <i class="fas fa-external-link-alt"></i>
                <span>{slide.title} Movie</span>
              </Link>
            </h3>
            <HomeSlide
              ytsApi={`https://yts.mx/api/v2/list_movies.json?limit=10&${slide.path}&sort_by=year`}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Home;
