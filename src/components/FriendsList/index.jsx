import { useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faUserMinus } from "@fortawesome/free-solid-svg-icons";

export default function FriendsList() {
  const context = useContext(AppContext);
  return (
    <div className="p-3 flex-col text-white bg-slate-900 rounded-3xl bg-opacity-60 backdrop-blur-lg notification hidden sm:flex">
      <h2 className="text-2xl font-semibold mb-2 px-2">Friends</h2>
      <div className="flex-col hover:overflow-auto overflow-hidden  max-w-[28rem] w-96 max-h-80">
        {context.friendList.length > 0 ? (
          context.friendList.map((element, index) => {
            return (
              <div
                className="flex items-center rounded-xl  p-2 duration-300 hover:bg-slate-900 hover:bg-opacity-60 cursor-pointer justify-between"
                key={index}
              >
                <div className="flex gap-2">
                  <img
                    src={`${process.env.REACT_APP_CDN_URL}/images/avatar/${
                      JSON.parse(atob(element.setting)).avatar
                    }`}
                    alt=""
                    className="rounded-full w-14 h-14 object-cover"
                  />
                  <div className="flex flex-col">
                    <p className="font-semibold">{element.username}</p>
                    <div className="bg-gradient-to-l from-purple-800 to-indigo-600 flex rounded-xl items-center justify-center w-fit">
                      {(function () {
                        switch (element.account_type) {
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
                              <small className="text-slate-200 font-semibold px-2">
                                🥈 Silver
                              </small>
                            );
                        }
                      })()}
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <FontAwesomeIcon
                    icon={faMessage}
                    className="text-lg hover:text-indigo-800 duration-300"
                    fixedWidth
                    onClick={() => {
                      context.setUserChat({
                        id: element.friend_id,
                        user_chat_name: element.username,
                        user_chat_setting: JSON.parse(atob(element.setting)),
                      });
                    }}
                  />
                  <FontAwesomeIcon
                    icon={faUserMinus}
                    className="text-lg hover:text-indigo-800 duration-300"
                    fixedWidth
                    onClick={() => {
                      context.unFriend(
                        context.userData.id !== element.user_id
                          ? element.user_id
                          : element.friend_id
                      );
                    }}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <p className="px-2 text-slate-500 font-light">You have no friends</p>
        )}
      </div>
    </div>
  );
}
