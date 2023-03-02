import {
  faUserCheck,
  faUserClock,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { AppContext } from "../../../../Context/AppContext";

export default function UserSearch(props) {
  const [isAdd, setIsAdd] = useState(false);
  const context = useContext(AppContext);
  return (
    <div className="flex w-full h-16 gap-2 items-center  rounded-3xl p-2 duration-300 hover:bg-slate-900 hover:bg-opacity-50 cursor-pointer">
      <img
        src={`${process.env.REACT_APP_CDN_URL}/images/avatar${
          JSON.parse(atob(props.element.setting)).avatar
        }`}
        className="w-12 h-12 rounded-full p-1 object-cover"
        alt="avatar"
      />
      <div className="flex text-white flex-col flex-1">
        <p>{props.element.username}</p>
        <div className="bg-gradient-to-l flex rounded-xl items-center justify-center w-fit">
          {(function () {
            switch (props.element.account_type) {
              case 0:
                return (
                  <small className="text-slate-200 font-semibold px-2">
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
                  <small className="text-slate-200 font-semibold px-2">
                    🥈 Silver
                  </small>
                );
            }
          })()}
        </div>
      </div>
      {context.friendList.some(
        (user) =>
          user.friend_id === props.element.id ||
          user.user_id === props.element.id
      ) ? (
        <FontAwesomeIcon
          icon={faUserCheck}
          className="text-slate-500 duration-300 text-lg"
          fixedWidth
        />
      ) : (
        <FontAwesomeIcon
          icon={isAdd ? faUserClock : faUserPlus}
          className="text-slate-500 duration-300 cursor-pointer hover:text-slate-100 text-lg"
          fixedWidth
          onClick={() => {
            if (!isAdd) {
              context.addFriend(props.element.id);
              setIsAdd(true);
            } else {
            }
          }}
        />
      )}
    </div>
  );
}
