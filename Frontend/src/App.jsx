import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import Home from "./components/Home.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Auth from "./components/Auth.jsx";
import Navbar from "./components/AppNavbar.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
