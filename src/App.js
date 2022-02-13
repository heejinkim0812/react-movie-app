import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";

import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import Search from "./routes/Search";
import Detail from "./routes/Detail";
import Group from "./routes/Group";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/page/:group/:num" element={<Group />} />
          <Route path="/movie/:id" element={<Detail />} />
          <Route path="/search/:search" element={<Search />} />
          <Route path={process.env.PUBLIC_URL + "/"} element={<Home />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
