import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef } from "react";
import secureLocalStorage from "react-secure-storage";

import axios from "axios";
import UserSearch from "./Components/UserSearch";

export default function AddFriend(props) {
  const [result, setResult] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  const userSearch = useRef();

  const searchUser = async () => {
    const token = secureLocalStorage.getItem("accessToken");
    const config = {
      method: "post",
      url: `${process.env.REACT_APP_API_ENDPOINT}/searchUser`,
      data: {
        username: userSearch.current.value.trim(),
      },
      timeout: 10000,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    await axios(config)
      .then(async (res) => {
        if (res.data.length > 0) {
          setResult(res.data);
        } else {
          setResult(null);
        }
      })
      .catch((err) => {
        alert(err);
      });
    setIsSearch(false);
  };

  return (
    <div className="w-screen h-screen bg-slate-900 dark:bg-opacity-20 backdrop-blur-lg absolute z-50 flex items-center justify-center modalMain">
      <div className="flex bg-slate-900 rounded-3xl text-white w-[25rem] h-[35rem] bg-opacity-60 select-none">
        <div className="flex flex-col p-5 w-full">
          <h2 className="font-semibold text-2xl mb-5">Add Friend</h2>
          <div className="rounded-3xl w-full h-10 dark:bg-slate-900 dark:bg-opacity-20 backdrop-blur-lg p-4 flex items-center text-white group">
            <FontAwesomeIcon
              icon={faUser}
              className="text-slate-400 group-focus-within:text-white duration-300"
            />
            <input
              ref={userSearch}
              className="bg-transparent w-full outline-none mx-3 "
              placeholder="Search..."
            />
          </div>
          <div className="w-12 h-2 rounded-3xl bg-slate-500 self-center my-3">
            {" "}
          </div>
          <div className="h-full w-full overflow-auto flex flex-col gap-2">
            {result !== null ? (
              result.map((element, index) => {
                return <UserSearch element={element} key={index} />;
              })
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
            <button
              disabled={isSearch}
              className="bg-slate-900 p-4 rounded-2xl cursor-pointer duration-300 hover:text-indigo-600 hover:bg-opacity-50 disabled:opacity-20 disabled:cursor-wait"
              onClick={() => {
                if (userSearch.current.value.trim() !== "") {
                  setIsSearch(true);
                  searchUser();
                }
              }}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
