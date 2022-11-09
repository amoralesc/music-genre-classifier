import { Routes, Route } from "react-router-dom";

import "./App.css";

import Home from "./components/Home/Home";
import About from "./components/About/About";

const App = () => {
  return (
    <div className="App">
      <div className="card">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
