/* eslint-disable jsx-a11y/anchor-is-valid */
import "./App.css";
import { useEffect, useState, lazy, Suspense } from "react";
import { createBrowserHistory } from "history";

const LoginUI = lazy(() => import("./components/Login"));
const RegisterUI = lazy(() => import("./components/Register"));

function Login() {
  /* const [theme, setTheme] = useState(true); */
  const [isLoading, setLoading] = useState(true);
  const [isLoginUI, setLoginUI] = useState(true);


  /*   useEffect(() => {
    const root = window.document.documentElement;
    if (theme) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]); */

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="dark w-screen h-screen bg-bgLogin flex justify-center items-center bg-cover select-none">
      {isLoading ? (
        <img alt="" src={require("../../image/loading.gif")} />
      ) : (
        <div className="flex transition-all duration-300">
          {/* <div className="theme-option flex items-center absolute z-10 top-0 left-0 bg-white dark:bg-slate-900 w-14 h-9 m-5 rounded-2xl">
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
          </div> */}
          <div className="bg-slate-50 dark:bg-slate-900 xl:w-[65rem] p-10 rounded-2xl flex transition-all duration-300 dark:bg-opacity-60 dark:backdrop-blur-md">
            <div className=" hidden sm:flex flex-1 items-center justify-center">
              <img
                alt=""
                src={require("../../image/Wavy_Gen-01_Single-07.png")}
                className="object-contain w-[20rem]"
              />
            </div>
            <Suspense>
              {isLoginUI ? (
                <LoginUI
                  registerAccount={() => {
                    setLoginUI(!isLoginUI);
                  }}
                />
              ) : (
                <RegisterUI
                  loginAccount={() => {
                    setLoginUI(!isLoginUI);
                  }}
                />
              )}
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
