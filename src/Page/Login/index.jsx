/* eslint-disable jsx-a11y/anchor-is-valid */
import "./App.css";
import { useEffect, useState, lazy, Suspense } from "react";
import { createBrowserHistory } from "history";

const LoginUI = lazy(() => import("./components/Login"));
const RegisterUI = lazy(() => import("./components/Register"));

function Login() {
  /* const [theme, setTheme] = useState(true); */
  const [isLoading, setLoading] = useState(false);
  const [isLoginUI, setLoginUI] = useState(true);
  const history = createBrowserHistory();

  /*   useEffect(() => {
    const root = window.document.documentElement;
    if (theme) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]); */

  useEffect(() => {
    history.replace("/");
    localStorage.clear();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="dark w-screen h-screen bg-bgLogin flex justify-center items-center bg-cover select-none">
      {isLoading ? (
        <img alt="" src={require("../../image/loading.gif")} />
      ) : (
        <div className="flex transition-all duration-300">
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
