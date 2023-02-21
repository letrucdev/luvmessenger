import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
  faLock,
  faArrowRight,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

export default function LoginUI(props) {
  const navigate = useNavigate();

  const [isLogin, setLogin] = useState(false);
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  const Login = async (account, password) => {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    if (account?.trim().length > 0 && password?.trim().length > 0) {
      await axios
        .post(
          `${process.env.REACT_APP_API_ENDPOINT}/login`,
          { account: account, password: password },
          config
        )
        .then(function (response) {
          if (response.data.auth === true) {
            secureLocalStorage.setItem("accessToken", response.data.token);
            navigate("/home");
          } else {
            alert("Wrong username or password!");
          }
        })
        .catch(function (error) {
          alert("Connect to server failed!");
        });
    } else {
      alert("Please enter email and password!");
    }
    setLogin(false);
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center dark:text-white registerForm">
      <h1 className="font-bold text-2xl mb-6 text-black dark:text-white">
        WELCOME BACK!
      </h1>
      <div className="wrap-input p-3 bg-slate-200 dark:bg-slate-800 rounded-3xl m-2 w-3/4 flex items-center group  backdrop-blur-xl">
        <FontAwesomeIcon
          icon={faUser}
          className="ml-3 text-slate-600 group-focus-within:text-white duration-300"
        />
        <input
          type={"text"}
          placeholder="Account"
          className="border-none outline-none bg-transparent px-4 w-full focus:ring-0"
          onChange={(e) => {
            setAccount(e.target.value);
          }}
        />
      </div>
      <div className="wrap-input p-3 bg-slate-200 dark:bg-slate-800 rounded-3xl m-3 w-3/4 flex items-center group  backdrop-blur-xl">
        <FontAwesomeIcon
          icon={faLock}
          className="ml-3 text-slate-600 group-focus-within:text-white duration-300"
        />
        <input
          type={"password"}
          placeholder="Password"
          className="border-none outline-none bg-transparent px-4 w-full focus:ring-0"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div className="wrap-button mt-6 font-bold w-3/4 text-white ">
        <button
          disabled={isLogin}
          className="bg-gradient-to-r from-violet-500 to-fuchsia-500 p-3 w-full rounded-3xl hover:opacity-50 hover:bg-gradient-to-l duration-300 disabled:opacity-25 disabled:cursor-wait"
          onClick={() => {
            setLogin(!isLogin);
            Login(account, password);
          }}
        >
          LOGIN
        </button>
      </div>
      <div className="text-center m-3">
        <span className="text-slate-900 dark:text-slate-300">
          Forgot{" "}
          <a
            href="/"
            className="text-slate-400 hover:text-indigo-700 duration-300"
          >
            Username / Password?
          </a>
        </span>
      </div>
      <div className="text-center text-slate-400 mt-10 hover:text-indigo-700 duration-300">
        <button
          onClick={() => {
            props.registerAccount();
          }}
        >
          Create your account <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
}
