import { useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import ReactTimeAgo from "react-time-ago";
/* import { useState } from "react"; */

export default function UserChat(props) {
  const context = useContext(AppContext);
  return (
    <div
      className={`${
        context.userChat.id === props.id ? "bg-slate-900" : null
      } flex p-2 items-center text-white hover:bg-slate-900 gap-2 rounded-3xl dark:bg-opacity-20 cursor-pointer item-user duration-500`}
      onClick={() => {
        context.setUserChat({
          id: props.id,
          user_chat_name: props.user_chat_name,
          user_chat_setting: props.user_chat_setting,
        });
        context.ReadMessage(props.id);
      }}
    >
      {context.userChat.id === props.id ? (
        <div className="bg-indigo-500 w-1 h-7 rounded-3xl relative -left-2 transition-all duration-500"></div>
      ) : null}
      <img
        className="object-cover w-14 h-14 rounded-full relative -left-1"
        alt=""
        src={`${process.env.REACT_APP_CDN_URL}/images/avatar/${props.user_chat_setting.avatar}`}
      />
      <div className="flex flex-col duration-500">
        <h5 className="leading-none truncate">{props.user_chat_name}</h5>
        <div className="flex items-center gap-2 overflow-hidden w-60">
          <small className="text-slate-300 font-normal truncate">
            {JSON.parse(props?.last_message).from_user_id === props.id
              ? `${props?.user_chat_name}: ${
                  JSON.parse(props?.last_message).content
                }`
              : `You: ${JSON.parse(props?.last_message).content}`}
          </small>
          <ReactTimeAgo
            className="text-sm text-slate-500"
            date={props?.at}
            locale="en-US"
          />
        </div>
      </div>
      <div
        className={`w-3 h-3 rounded-full bg-indigo-500 absolute right-2 duration-300 ${
          props?.isRead === 0 ? "block" : "hidden"
        }`}
      ></div>
    </div>
  );
}
