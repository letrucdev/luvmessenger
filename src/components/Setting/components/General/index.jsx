import { faEdit, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import "./index.css";

export default function General(props) {
  let phoneNumber = "+84123456789";

  const [eye, setEye] = useState(faEye);

  const [phone, phoneHide] = useState(true);

  const [myphone, setPhone] = useState();

  useEffect(() => {
    if (phone === true) {
      setPhone(phoneNumber.replace(phoneNumber.substring(0, 8), "*******"));
      setEye(faEye);
    } else {
      setPhone(phoneNumber);
      setEye(faEyeSlash);
    }
  }, [phone, phoneNumber]);

  return (
    <div className="w-full h-full flex flex-col gap-3 px-3 overflow-auto general">
      <div className="flex-col ">
        <h2 className="text-bold text-3xl mb-6">Account</h2>
        <div className="flex items-center gap-2">
          <img
            src={`${process.env.REACT_APP_CDN_URL}/images${props.setting.avatar}`}
            alt=""
            className=" object-cover w-20 h-20 rounded-full"
          />
          <div className="flex-col">
            <h2 className="text-lg font-semibold ">{props.userdata.username}</h2>
            <div className="bg-gradient-to-l flex rounded-xl items-center justify-center">
              {(function () {
                switch (props.userdata.account_type) {
                  case 0:
                    return (
                      <small className="text-slate-200 font-semibold  px-2">
                        🥈 Silver
                      </small>
                    );
                  case 1:
                    return (
                      <small className="text-amber-300 font-semibold leading-5 px-2">
                        🪙 Gold
                      </small>
                    );
                  case 2:
                    return (
                      <small className="text-cyan-200 font-semibold leading-5 px-2">
                        💎 Diamond
                      </small>
                    );
                  default:
                    return (
                      <small className="text-slate-200 font-semibold  px-2">
                        🥈 Silver
                      </small>
                    );
                }
              })()}
            </div>
          </div>
        </div>

        <div className="w-full bg-slate-800 p-4 rounded-xl bg-opacity-50 flex items-center mt-4 justify-between">
          <div className="flex-col">
            <h2 className="font-semibold mb-1 text-lg">Username</h2>
            <input
              type={"text"}
              className="bg-transparent outline-none border-none focus-within:border-none focus:border-none focus:ring-0 p-0"
              value={props.userdata.username}
              disabled
            />
          </div>
          <div className="bg-slate-900 rounded-xl bg-opacity-75 hover:bg-opacity-30 duration-300 ">
            <button className="p-2 w-24 hidden sm:block">Edit</button>
            <FontAwesomeIcon
              icon={faEdit}
              fixedWidth
              className="text-xl p-2 sm:hidden"
            />
          </div>
        </div>

        <div className="w-full bg-slate-800 p-4 rounded-xl bg-opacity-50 flex justify-between items-center mt-4">
          <div className="flex-col">
            <h2 className="font-semibold mb-1 text-lg">Email</h2>
            <input
              type={"email"}
              className="bg-transparent outline-none border-none focus-within:border-none focus:border-none focus:ring-0 p-0"
              value={props.userdata.email}
              disabled
            />
          </div>
          <div className="bg-slate-900 rounded-xl bg-opacity-75 hover:bg-opacity-30 duration-300">
            <button className="p-2 w-24 hidden sm:block">Edit</button>
            <FontAwesomeIcon
              icon={faEdit}
              fixedWidth
              className="text-xl p-2 sm:hidden"
            />
          </div>
        </div>

        <div className="w-full bg-slate-800 p-4 rounded-xl bg-opacity-50 flex justify-between items-center mt-4">
          <div className="flex-col">
            <h2 className="font-semibold mb-1 text-lg">Phone number</h2>
            <div className="flex items-center w-auto gap-2">
              <span className="tel-phone">{myphone}</span>
              <FontAwesomeIcon
                icon={eye}
                className="cursor-pointer hover:text-indigo-600 duration-300"
                fixedWidth
                onClick={() => {
                  phoneHide(!phone);
                }}
              />
            </div>
          </div>
          <div className="bg-slate-900 rounded-xl bg-opacity-75 hover:bg-opacity-30 duration-300">
            <button className="p-2 w-24 hidden sm:block">Edit</button>
            <FontAwesomeIcon
              icon={faEdit}
              fixedWidth
              className="text-xl p-2 sm:hidden"
            />
          </div>
        </div>
      </div>

      {/*  <div className="flex-col">
        <h2 className="text-bold text-3xl mb-6">Language</h2>
        <small className="font-semibold">Select a language</small>

        <div className="w-full bg-slate-800 p-4 mt-4 rounded-xl bg-opacity-50">
          <span className="gap-2 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <input
                id="vi"
                name="radio-group"
                type={"radio"}
                className="w-4 h-4 focus:ring-0 border-none  duration-500 text-indigo-700"
              />{" "}
              <label htmlFor="vi">Tiếng Việt</label>
            </div>
            <img src={require("./vn.png")} alt="" className="w-10 h-10" />
          </span>
        </div>

        <div className="w-full bg-slate-800 p-4 mt-4 rounded-xl bg-opacity-50">
          <span className="gap-2 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <input
                value=""
                id="enus"
                name="radio-group"
                type={"radio"}
                className="w-4 h-4 focus:ring-0 border-none duration-500 text-indigo-700 outline-none"
                defaultChecked={true}
              />{" "}
              <label htmlFor="enus">English, US</label>
            </div>
            <img src={require("./us.png")} alt="" className="w-10 h-10" />
          </span>
        </div>

        <div className="w-full bg-slate-800 p-4 mt-4 rounded-xl bg-opacity-50">
          <span className="gap-2 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <input
                value=""
                id="germ"
                name="radio-group"
                type={"radio"}
                className="w-4 h-4 focus:ring-0 border-none duration-500 text-indigo-700 outline-none"
              />{" "}
              <label htmlFor="germ">Deutsch</label>
            </div>
            <img src={require("./german.png")} alt="" className="w-10 h-10" />
          </span>
        </div>
      </div> */}
    </div>
  );
}
