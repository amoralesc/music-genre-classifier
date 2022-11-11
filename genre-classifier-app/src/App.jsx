import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import { fetchModel } from "./reducers/modelReducer";

import Home from "./components/Home/Home";
import About from "./components/About/About";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchModel());
  }, [dispatch]);

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
