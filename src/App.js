import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";

import Home from "./routes/Home";
import Detail from "./routes/Detail";
import Group from "./routes/Group";
import Nav from "./components/Nav";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Nav />
        <Routes>
          <Route path="/page/:detail/:num" element={<Group />} />
          <Route path="/movie/:id" element={<Detail />} />
          <Route path={process.env.PUBLIC_URL + "/"} element={<Home />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}
export default App;
