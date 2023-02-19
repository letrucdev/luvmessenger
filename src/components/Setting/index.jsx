import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.css";
import {
  faGear,
  faLock,
  faBell,
  faPaintRoller,
  faMessage,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import General from "./components/General";
import Theme from "./components/Theme";
import { useState } from "react";
import Privacy from "./components/Privacy";
import Notification from "./components/Notification";
import Message from "./components/Message";

export default function Modal(props) {
  const [selectMenu, setMenu] = useState("General");

  return (
    <div className="w-screen h-screen bg-slate-900 dark:bg-opacity-20 backdrop-blur-lg absolute z-50 flex items-center justify-center modalMain">
      <div className="flex bg-slate-900 rounded-3xl text-white w-[90%] h-[90%] bg-opacity-60 select-none">
        <div className="bg-slate-900 w-[20%] h-full rounded-l-3xl bg-opacity-60 flex-col p-6 hidden md:flex">
          <div className="flex flex-col gap-2 items-center xl:items-stretch">
            {" "}
            {/* Nav Menu */}
            <h2 className="font-semibold text-2xl xl:text-3xl mb-3">
              Settings
            </h2>
            <span
              className={`${
                selectMenu === "General" ? "bg-slate-700" : ""
              } text-lg hover:bg-slate-700 hover:bg-opacity-20 p-3 cursor-pointer rounded-3xl flex items-center gap-2 duration-300 bg-opacity-20 justify-center md:justify-start`}
              onClick={() => {
                setMenu("General");
              }}
            >
              <FontAwesomeIcon icon={faGear} className="text-2xl" fixedWidth />{" "}
              <p className="hidden text-sm xl:text-base xl:block">General</p>
            </span>
            <span
              className={`${
                selectMenu === "Privacy" ? "bg-slate-700" : ""
              } text-lg hover:bg-slate-700 hover:bg-opacity-20 p-3 cursor-pointer rounded-3xl flex items-center gap-2 duration-300 bg-opacity-20`}
              onClick={() => {
                setMenu("Privacy");
              }}
            >
              <FontAwesomeIcon icon={faLock} className="text-2xl " fixedWidth />{" "}
              <p className="hidden text-sm xl:text-base xl:block">Privacy</p>
            </span>
            <span
              className={`${
                selectMenu === "Theme" ? "bg-slate-700" : ""
              } text-lg hover:bg-slate-700 hover:bg-opacity-20 p-3 cursor-pointer rounded-3xl flex items-center gap-2 duration-300 bg-opacity-20 `}
              onClick={() => {
                setMenu("Theme");
              }}
            >
              <FontAwesomeIcon
                icon={faPaintRoller}
                className="text-2xl "
                fixedWidth
              />{" "}
              <p className="hidden text-sm xl:text-base xl:block">Theme</p>
            </span>
            <span
              className={`${
                selectMenu === "Message" ? "bg-slate-700" : ""
              } text-lg hover:bg-slate-700 hover:bg-opacity-20 p-3 cursor-pointer rounded-3xl flex items-center gap-2 duration-300 bg-opacity-20 `}
              onClick={() => {
                setMenu("Message");
              }}
            >
              <FontAwesomeIcon
                icon={faMessage}
                className="text-2xl "
                fixedWidth
              />{" "}
              <p className="hidden text-sm xl:text-base xl:block">Message</p>
            </span>
            <span
              className={`${
                selectMenu === "Notifi" ? "bg-slate-700" : ""
              } text-lg hover:bg-slate-700 bg-opacity-20 hover:bg-opacity-20  p-3 cursor-pointer rounded-3xl flex items-center gap-2 duration-300`}
              onClick={() => {
                setMenu("Notifi");
              }}
            >
              <FontAwesomeIcon icon={faBell} className="text-2xl " fixedWidth />{" "}
              <p className="hidden text-sm xl:text-base xl:block">
                Notification
              </p>
            </span>
          </div>
        </div>

        <div className="w-[100%] h-full p-6 flex flex-col gap-2 duration-300 md:w-[80%]">
          <div className="flex justify-center items-center self-end w-10 h-10 mb-3">
            <FontAwesomeIcon
              icon={faClose}
              className="text-xl cursor-pointer hover:text-slate-500 duration-300"
              fixedWidth
              onClick={() => {
                props.exit();
              }}
            />
          </div>

          {selectMenu === "General" ? (
            <General />
          ) : null || selectMenu === "Theme" ? (
            <Theme />
          ) : null || selectMenu === "Privacy" ? (
            <Privacy />
          ) : null || selectMenu === "Notifi" ? (
            <Notification />
          ) : null || selectMenu === "Message" ? (
            <Message />
          ) : null}

          {/*  <Theme /> */}
        </div>
      </div>
    </div>
  );
}
