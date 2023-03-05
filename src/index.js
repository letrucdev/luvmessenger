import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Login from "./Page/Login";
import Home from "./Page/Home";
/* import axios from "axios"; */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppProvider } from "./Context/AppContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

console.log("%cLUV MESSENGER", "color: #818cf8; font-size: 50px;");
console.log(
  "%cDự án được phát triển bởi Lê Trực",
  "color: #a5b4fc; font-size: 25px;"
);
console.log(
  "%cSử dụng ReactJs, Tailwindcss cho Frontend và NodeJS cho Backend",
  "color: #c7d2fe; font-size: 20px;"
);

root.render(
  <Router>
    <Routes>
      <Route
        element={
          <AppProvider>
            <Home />
          </AppProvider>
        }
        path="*"
      />
      <Route
        element={
          <AppProvider>
            <Home />
          </AppProvider>
        }
        path="/home"
      />
      <Route element={<Login />} path="/login" />
    </Routes>
  </Router>

  /* <App /> */
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
