import "./App.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faArrowRight,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";

function Login() {
  const [theme, setTheme] = useState(true);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      
    }, 2000);
  }, []);

  return ( 
    <div className=" w-screen h-screen bg-gradient-to-l from-purple-800 to-indigo-600  flex justify-center items-center">
      {isLoading ? (
        <img alt="" src={require("../../image/loading.gif")} />
      ) : (
        <>
          <div className="theme-option flex items-center absolute z-10 top-0 left-0 bg-white dark:bg-slate-900 w-14 h-9 m-5 rounded-2xl">
            <input
              type={"checkbox"}
              className="opacity-0 absolute inputCheck z-30 w-full cursor-pointer"
              onClick={() => {
                setTheme(!theme);
              }}
            />
            <div className="wrapper flex items-center justify-between relative p-2 w-full">
              <FontAwesomeIcon
                icon={faSun}
                className="text-amber-500 dark:text-white w-3 h-3"
                fixedWidth
              />
              <FontAwesomeIcon
                icon={faMoon}
                className="text-white dark:text-amber-500  w-3 h-3"
                fixedWidth
              />
              <div className="ball rounded-full absolute  bg-slate-800 w-5 h-5 transition-all duration-300 -translate-x-0"></div>
            </div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 w-[65rem] p-10 rounded-2xl flex transition-all duration-500">
            <div className="flex flex-1 items-center justify-center">
              <img
                alt=""
                src={require("../../image/Wavy_Gen-01_Single-07.png")}
                className="object-contain w-[20rem]"
              />
            </div>
            <div className="flex flex-1 flex-col items-center justify-center dark:text-white">
              <h1 className="font-bold text-2xl mb-6 text-black dark:text-white">
                WELCOME BACK!
              </h1>
              <div className="wrap-input p-3 bg-slate-200 dark:bg-slate-800 rounded-3xl m-2 w-3/4 flex items-center">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="ml-3 text-slate-600"
                />
                <input
                  type={"email"}
                  placeholder="Email"
                  className="border-none outline-none bg-transparent px-4 w-full focus:ring-0"
                />
              </div>
              <div className="wrap-input p-3 bg-slate-200 dark:bg-slate-800 rounded-3xl m-3 w-3/4 flex items-center">
                <FontAwesomeIcon
                  icon={faLock}
                  className="ml-3 text-slate-600"
                />
                <input
                  type={"password"}
                  placeholder="Password"
                  className="border-none outline-none bg-transparent px-4 w-full focus:ring-0"
                />
              </div>
              <div className="wrap-button mt-6 font-bold w-3/4 text-white ">
                <button className="bg-indigo-600 p-3 w-full rounded-3xl hover:bg-indigo-800 duration-300">
                  LOGIN
                </button>
              </div>
              <div className="text-center m-3">
                <span className="text-slate-900 dark:text-slate-300">
                  Forgot{" "}
                  <a
                    href="#"
                    className="text-slate-500 hover:text-indigo-700 duration-300"
                  >
                    Username / Password?
                  </a>
                </span>
              </div>
              <div className="text-center text-slate-500 mt-10 hover:text-indigo-700 duration-300">
                <a href="#">
                  Create your account <FontAwesomeIcon icon={faArrowRight} />
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Login;
