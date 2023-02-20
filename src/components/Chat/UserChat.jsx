import avatar from "../../Page/Home/image/giphy.jpg";
/* import { useState } from "react"; */

export default function UserChat(props) {
  return (
    <div
      className={`${props.class} flex p-2 items-center text-white gap-2 hover:bg-slate-900 rounded-3xl dark:bg-opacity-20 cursor-pointer item-user duration-500`}
      onClick={() => {
        props.Click(props.id);
      }}
    >
      {props.class ? (
        <div className="bg-indigo-500 w-1 h-7 rounded-3xl relative -left-2 transition-all duration-500"></div>
      ) : null}
      <img
        className="object-cover w-14 h-14 rounded-full relative -left-1"
        alt=""
        src={avatar}
      />
      <div className="flex flex-col duration-500">
        <h5 className="leading-none">Lê Trực</h5>
        <small className="text-slate-300 font-normal">test message</small>
      </div>
    </div>
  );
}
