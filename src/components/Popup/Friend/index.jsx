import { faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import avatar from "../../../Page/Home/image/ava.jpg";

export default function AddFriend(props) {
  const [result] = useState(null);
  return (
    <div className="w-screen h-screen bg-slate-900 dark:bg-opacity-20 backdrop-blur-lg absolute z-50 flex items-center justify-center modalMain">
      <div className="flex bg-slate-900 rounded-3xl text-white w-[25rem] h-[35rem] bg-opacity-60 ">
        <div className="flex flex-col p-5 w-full">
          <h2 className="font-semibold text-2xl mb-5">Add Friend</h2>
          <div className="rounded-3xl w-full h-10 dark:bg-slate-900 dark:bg-opacity-20 backdrop-blur-lg p-4 flex items-center text-white group">
            <FontAwesomeIcon
              icon={faUser}
              className="text-slate-400 group-focus-within:text-white duration-300"
            />
            <input
              className="bg-transparent w-full outline-none mx-3 "
              placeholder="Search..."
            />
          </div>
          <div className="w-12 h-2 rounded-3xl bg-slate-500 self-center my-3">
            {" "}
          </div>
          <div className="h-full w-full overflow-auto flex flex-col gap-2">
            {result !== null ? (
              <>
                <div className="flex w-full h-14 gap-2 items-center  rounded-3xl p-2 duration-300 hover:bg-slate-900 hover:bg-opacity-50 cursor-pointer">
                  <img
                    src={avatar}
                    className="w-12 h-12 rounded-full p-1"
                    alt="avatar"
                  />
                  <div className="flex text-white flex-col flex-1">
                    <p>Lê Trực</p>
                    <p className="text-slate-500 text-sm">
                      Đẳng cấp là duy trì
                    </p>
                  </div>
                  <FontAwesomeIcon
                    icon={faUserPlus}
                    className="text-slate-500 duration-300 cursor-pointer hover:text-slate-100 text-lg"
                    fixedWidth
                  />
                </div>
                <div className="flex w-full h-14 gap-2 items-center  rounded-3xl p-2 duration-300 hover:bg-slate-900 hover:bg-opacity-50 cursor-pointer">
                  <img
                    src={avatar}
                    className="w-12 h-12 rounded-full p-1"
                    alt="avatar"
                  />
                  <div className="flex text-white flex-col flex-1">
                    <p>Lê Trực</p>
                    <p className="text-slate-500 text-sm">
                      Đẳng cấp là duy trì
                    </p>
                  </div>
                  <FontAwesomeIcon
                    icon={faUserPlus}
                    className="text-slate-500 duration-300 cursor-pointer hover:text-slate-100 text-lg"
                    fixedWidth
                  />
                </div>
                <div className="flex w-full h-14 gap-2 items-center  rounded-3xl p-2 duration-300 hover:bg-slate-900 hover:bg-opacity-50 cursor-pointer">
                  <img
                    src={avatar}
                    className="w-12 h-12 rounded-full p-1"
                    alt="avatar"
                  />
                  <div className="flex text-white flex-col flex-1">
                    <p>Lê Trực</p>
                    <p className="text-slate-500 text-sm">
                      Đẳng cấp là duy trì
                    </p>
                  </div>
                  <FontAwesomeIcon
                    icon={faUserPlus}
                    className="text-slate-500 duration-300 cursor-pointer hover:text-slate-100 text-lg"
                    fixedWidth
                  />
                </div>
                <div className="flex w-full h-14 gap-2 items-center  rounded-3xl p-2 duration-300 hover:bg-slate-900 hover:bg-opacity-50 cursor-pointer">
                  <img
                    src={avatar}
                    className="w-12 h-12 rounded-full p-1"
                    alt="avatar"
                  />
                  <div className="flex text-white flex-col flex-1">
                    <p>Lê Trực</p>
                    <p className="text-slate-500 text-sm">
                      Đẳng cấp là duy trì
                    </p>
                  </div>
                  <FontAwesomeIcon
                    icon={faUserPlus}
                    className="text-slate-500 duration-300 cursor-pointer hover:text-slate-100 text-lg"
                    fixedWidth
                  />
                </div>
                <div className="flex w-full h-14 gap-2 items-center  rounded-3xl p-2 duration-300 hover:bg-slate-900 hover:bg-opacity-50 cursor-pointer">
                  <img
                    src={avatar}
                    className="w-12 h-12 rounded-full p-1"
                    alt="avatar"
                  />
                  <div className="flex text-white flex-col flex-1">
                    <p>Lê Trực</p>
                    <p className="text-slate-500 text-sm">
                      Đẳng cấp là duy trì
                    </p>
                  </div>
                  <FontAwesomeIcon
                    icon={faUserPlus}
                    className="text-slate-500 duration-300 cursor-pointer hover:text-slate-100 text-lg"
                    fixedWidth
                  />
                </div>
                <div className="flex w-full h-14 gap-2 items-center  rounded-3xl p-2 duration-300 hover:bg-slate-900 hover:bg-opacity-50 cursor-pointer">
                  <img
                    src={avatar}
                    className="w-12 h-12 rounded-full p-1"
                    alt="avatar"
                  />
                  <div className="flex text-white flex-col flex-1">
                    <p>Lê Trực</p>
                    <p className="text-slate-500 text-sm">
                      Đẳng cấp là duy trì
                    </p>
                  </div>
                  <FontAwesomeIcon
                    icon={faUserPlus}
                    className="text-slate-500 duration-300 cursor-pointer hover:text-slate-100 text-lg"
                    fixedWidth
                  />
                </div>
                <div className="flex w-full h-14 gap-2 items-center  rounded-3xl p-2 duration-300 hover:bg-slate-900 hover:bg-opacity-50 cursor-pointer">
                  <img
                    src={avatar}
                    className="w-12 h-12 rounded-full p-1"
                    alt="avatar"
                  />
                  <div className="flex text-white flex-col flex-1">
                    <p>Lê Trực</p>
                    <p className="text-slate-500 text-sm">
                      Đẳng cấp là duy trì
                    </p>
                  </div>
                  <FontAwesomeIcon
                    icon={faUserPlus}
                    className="text-slate-500 duration-300 cursor-pointer hover:text-slate-100 text-lg"
                    fixedWidth
                  />
                </div>
                <div className="flex w-full h-14 gap-2 items-center  rounded-3xl p-2 duration-300 hover:bg-slate-900 hover:bg-opacity-50 cursor-pointer">
                  <img
                    src={avatar}
                    className="w-12 h-12 rounded-full p-1"
                    alt="avatar"
                  />
                  <div className="flex text-white flex-col flex-1">
                    <p>Lê Trực</p>
                    <p className="text-slate-500 text-sm">
                      Đẳng cấp là duy trì
                    </p>
                  </div>
                  <FontAwesomeIcon
                    icon={faUserPlus}
                    className="text-slate-500 duration-300 cursor-pointer hover:text-slate-100 text-lg"
                    fixedWidth
                  />
                </div>
                <div className="flex w-full h-14 gap-2 items-center  rounded-3xl p-2 duration-300 hover:bg-slate-900 hover:bg-opacity-50 cursor-pointer">
                  <img
                    src={avatar}
                    className="w-12 h-12 rounded-full p-1"
                    alt="avatar"
                  />
                  <div className="flex text-white flex-col flex-1">
                    <p>Lê Trực</p>
                    <p className="text-slate-500 text-sm">
                      Đẳng cấp là duy trì
                    </p>
                  </div>
                  <FontAwesomeIcon
                    icon={faUserPlus}
                    className="text-slate-500 duration-300 cursor-pointer hover:text-slate-100 text-lg"
                    fixedWidth
                  />
                </div>
                <div className="flex w-full h-14 gap-2 items-center  rounded-3xl p-2 duration-300 hover:bg-slate-900 hover:bg-opacity-50 cursor-pointer">
                  <img
                    src={avatar}
                    className="w-12 h-12 rounded-full p-1"
                    alt="avatar"
                  />
                  <div className="flex text-white flex-col flex-1">
                    <p>Lê Trực</p>
                    <p className="text-slate-500 text-sm">
                      Đẳng cấp là duy trì
                    </p>
                  </div>
                  <FontAwesomeIcon
                    icon={faUserPlus}
                    className="text-slate-500 duration-300 cursor-pointer hover:text-slate-100 text-lg"
                    fixedWidth
                  />
                </div>
                <div className="flex w-full h-14 gap-2 items-center  rounded-3xl p-2 duration-300 hover:bg-slate-900 hover:bg-opacity-50 cursor-pointer">
                  <img
                    src={avatar}
                    className="w-12 h-12 rounded-full p-1"
                    alt="avatar"
                  />
                  <div className="flex text-white flex-col flex-1">
                    <p>Lê Trực</p>
                    <p className="text-slate-500 text-sm">
                      Đẳng cấp là duy trì
                    </p>
                  </div>
                  <FontAwesomeIcon
                    icon={faUserPlus}
                    className="text-slate-500 duration-300 cursor-pointer hover:text-slate-100 text-lg"
                    fixedWidth
                  />
                </div>
              </>
            ) : (
              <div className="self-center text-slate-500 font-light mt-5">
                <p>There is no result</p>
              </div>
            )}
          </div>
          <div className="w-full h-16 flex justify-end gap-2 mt-4">
            <button
              className="p-4 rounded-2xl cursor-pointer duration-300 hover:text-red-600"
              onClick={() => {
                props.exit();
              }}
            >
              Cancel
            </button>
            <button className="bg-slate-900 p-4 rounded-2xl cursor-pointer duration-300 hover:text-indigo-600 hover:bg-opacity-50">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
