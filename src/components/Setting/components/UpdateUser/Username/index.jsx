import {
  faClose,
  faLock,
  faSignature,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useContext } from "react";
import secureLocalStorage from "react-secure-storage";
import { AppContext } from "../../../../../Context/AppContext";
import axios from "axios";

export default function UpdateUserName(props) {
  const context = useContext(AppContext);
  const [username, setUsername] = useState(context.username);
  const [password, setPassword] = useState("");

  const updateName = () => {
    const token = secureLocalStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .put(
        `${process.env.REACT_APP_API_ENDPOINT}/updateUsername`,
        {
          username: username.trim(),
          password: password.trim(),
        },
        config
      )
      .then((res) => {
        context.setUsername(username);
        props.exit();
      })
      .catch((err) => props.exit());
  };
  return (
    <div className="w-screen h-screen bg-slate-900 dark:bg-opacity-20 backdrop-blur-lg absolute z-50 flex items-center justify-center modalMain">
      <div className=" bg-slate-900 bg-opacity-20 rounded-3xl flex flex-col p-5 gap-5 backdrop-blur-3xl select-none">
        <div className="flex gap-20">
          <div className="flex flex-col">
            <h3 className="text-white font-semibold text-2xl">
              Change your username
            </h3>
            <p className="text-slate-500 text-sm">
              Enter a new username and your existing password
            </p>
          </div>
          <FontAwesomeIcon
            icon={faClose}
            className="text-white text-xl cursor-pointer hover:opacity-20 duration-300"
            fixedWidth
            onClick={() => {
              props.exit();
            }}
          />
        </div>
        <div className="flex flex-col gap-3">
          <div className="bg-slate-900 bg-opacity-50 backdrop-blur-3xl w-full h-10 rounded-xl flex p-5 items-center gap-1 group">
            <FontAwesomeIcon
              icon={faSignature}
              fixedWidth
              className="text-slate-500 text-lg group-focus-within:text-white duration-300"
            />
            <input
              placeholder="Your name"
              value={username}
              className="outline-none border-none bg-transparent text-white w-full focus:ring-0"
              type={"text"}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="bg-slate-900 bg-opacity-50 backdrop-blur-3xl w-full h-10 rounded-xl flex p-5 items-center gap-1 group">
            <FontAwesomeIcon
              icon={faLock}
              fixedWidth
              className="text-slate-500 text-lg group-focus-within:text-white duration-300"
            />
            <input
              placeholder="Password"
              className="outline-none border-none bg-transparent text-white w-full focus:ring-0"
              type={"password"}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex justify-end w-full gap-2 text-white">
          <button
            className="p-4 rounded-2xl cursor-pointer duration-300 hover:text-red-600"
            onClick={() => {
              props.exit();
            }}
          >
            Cancel
          </button>
          <button
            className="bg-slate-900 p-4 rounded-2xl cursor-pointer duration-300 hover:text-indigo-600 hover:bg-opacity-50"
            onClick={() => {
              if (
                props.username !== username &&
                username?.trim() !== "" &&
                password?.trim() !== ""
              ) {
                updateName();
              } else {
                props.exit();
              }
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
