import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faArrowRight,
  faUser,
  faSignature,
} from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
import axios from "axios";
import { useValidator as Validator } from "../../../../Hooks/useValidator";

export default function RegisterUI(props) {
  const [email, setEmail] = useState("");
  const [account, setAccount] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setRegister] = useState(false);

  const Register = async (email, password, username, account) => {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    if (
      email?.trim().length > 0 &&
      password?.trim().length > 0 &&
      username?.trim().length > 0 &&
      account?.trim().length > 0
    ) {
      await axios
        .post(
          `${process.env.REACT_APP_API_ENDPOINT}/register`,
          {
            account: account,
            password: password,
            email: email,
            username: username,
          },
          config
        )
        .then(function (response) {
          if (response.data.auth === true) {
            alert("Register account success!");
            props.loginAccount();
          } else {
            alert("Register account failed!");
          }
        })
        .catch(function (error) {
          alert("Connect to server failed!");
        });
    } else {
      alert("Please fill in all required information");
    }
    setRegister(false);
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center dark:text-white registerForm ">
      <h1 className="font-bold text-2xl mb-6 text-black dark:text-white">
        SIGN UP
      </h1>
      <div className="wrap-input p-3 bg-slate-200 dark:bg-slate-800 rounded-3xl m-2 w-3/4 flex items-center group  backdrop-blur-xl z-40">
        <FontAwesomeIcon
          icon={faEnvelope}
          className="ml-3 text-slate-600 group-focus-within:text-white duration-300"
        />
        <Validator>
          <input
            maxLength={35}
            type={"email"}
            placeholder="Email"
            className="border-none outline-none bg-transparent px-4 w-full focus:ring-0"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Validator>
      </div>

      <div className="flex w-3/4 gap-2 z-30">
        <div className="wrap-input p-3 bg-slate-200 dark:bg-slate-800 rounded-3xl  w-3/4 flex items-center group  backdrop-blur-xl">
          <FontAwesomeIcon
            icon={faUser}
            className="ml-3 text-slate-600 group-focus-within:text-white duration-300"
          />
          <Validator>
            <input
              type={"text"}
              maxLength={25}
              placeholder="Account"
              className="border-none outline-none bg-transparent px-4 w-full focus:ring-0"
              onChange={(e) => setAccount(e.target.value)}
            />
          </Validator>
        </div>
        <div className="wrap-input p-3 bg-slate-200 dark:bg-slate-800 rounded-3xl  w-3/4 flex items-center group  backdrop-blur-xl">
          <FontAwesomeIcon
            icon={faSignature}
            className="ml-3 text-slate-600 group-focus-within:text-white duration-300"
          />
          <Validator>
            <input
              type={"text"}
              maxLength={25}
              placeholder="Your name"
              className="border-none outline-none bg-transparent px-4 w-full focus:ring-0"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Validator>
        </div>
      </div>

      <div className="wrap-input p-3 bg-slate-200 dark:bg-slate-800 rounded-3xl m-3 w-3/4 flex items-center group  backdrop-blur-xl">
        <FontAwesomeIcon
          icon={faLock}
          className="ml-3 text-slate-600 group-focus-within:text-white duration-300"
        />
        <Validator>
          <input
            type={"password"}
            placeholder="Password"
            className="border-none outline-none bg-transparent px-4 w-full focus:ring-0"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Validator>
      </div>
      <div className="wrap-button mt-6 font-bold w-3/4 text-white ">
        <button
          disabled={isRegister}
          className="bg-gradient-to-r from-violet-500 to-fuchsia-500 p-3 w-full rounded-3xl hover:opacity-50 hover:bg-gradient-to-l duration-300 disabled:opacity-25 disabled:cursor-wait"
          onClick={() => {
            setRegister(!isRegister);
            Register(email, password, username, account);
          }}
        >
          REGISTER
        </button>
      </div>
      <div className="text-center text-slate-400 mt-5 hover:text-indigo-700 duration-300">
        <button
          onClick={() => {
            props.loginAccount();
          }}
        >
          Already have account <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
}
