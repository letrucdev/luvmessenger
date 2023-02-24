import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Login from "./Page/Login";
import Home from "./Page/Home";
/* import axios from "axios"; */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppProvider } from "./Context/AppContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

/* const verifyLogin = () => {
  if (localStorage.getItem("accessToken")) {
    return true;
  }
  return false;
}; */

root.render(
  /*  localStorage.getItem("account") ? <Home /> : <Login /> */
  <React.StrictMode>
    <Router>
      <AppProvider>
        <Routes>
          <Route element={<Home />} path="*" />
          <Route element={<Home />} path="/home" />
          <Route element={<Login />} path="/login" />
        </Routes>
      </AppProvider>
    </Router>
  </React.StrictMode>

  /* <App /> */
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
