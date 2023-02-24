import { useContext } from "react";
import { AppContext } from "../../../../Context/AppContext";

export default function Privacy() {
  const context = useContext(AppContext);
  return (
    <div className="w-full h-full flex flex-col gap-3 px-3 overflow-auto privacy">
      <div className="flex-col">
        <h2 className="text-bold text-3xl mb-6">Privacy</h2>

        <div className="w-full bg-slate-800 p-4 rounded-xl bg-opacity-50 flex justify-between items-center mt-4">
          <div className="flex-col">
            <h2 className="font-semibold mb-1 text-lg leading-none">
              Active status
            </h2>
            <small className="text-slate-300">
              People can see you online when turn it on
            </small>
          </div>
          <div className="theme-option flex items-center  bg-white dark:bg-slate-900 min-w-[3.5rem] h-9 sm:m-5 rounded-2xl relative">
            <input
              type={"checkbox"}
              className="opacity-0 relative inputCheck z-30 w-full cursor-pointer"
              onClick={(e) => {
                if (!e.target.checked) {
                  context.userSetting.status = 0;
                } else {
                  context.userSetting.status = 1;
                }
                context.SaveSetting(context.userSetting);
              }}
              defaultChecked={context.userSetting.status === 1 ? true : false}
            />
            <div className="wrapper flex items-center justify-between absolute p-2">
              <div className="ball rounded-full absolute dark:bg-slate-800  bg-slate-800 w-5 h-5 transition-all duration-300"></div>
            </div>
          </div>
        </div>

        <div className="w-full bg-slate-800 p-4 rounded-xl bg-opacity-50 flex justify-between items-center mt-4">
          <div className="flex-col">
            <h2 className="font-semibold mb-1 text-lg leading-none">
              Friend request
            </h2>
            <small className="text-slate-300">
              Anyone can send me a friend request
            </small>
          </div>
          <div className="theme-option flex items-center  bg-white dark:bg-slate-900 min-w-[3.5rem] h-9 sm:m-5 rounded-2xl relative">
            <input
              type={"checkbox"}
              className="opacity-0 relative inputCheck z-30 w-full cursor-pointer"
              onClick={(e) => {
                if (!e.target.checked) {
                  context.userSetting.friendrequest = 0;
                } else {
                  context.userSetting.friendrequest = 1;
                }
                context.SaveSetting(context.userSetting);
              }}
              defaultChecked={
                context.userSetting.friendrequest === 1 ? true : false
              }
            />
            <div className="wrapper flex items-center justify-between absolute p-2">
              <div className="ball rounded-full absolute dark:bg-slate-800  bg-slate-800 w-5 h-5 transition-all duration-300"></div>
            </div>
          </div>
        </div>

        <div className="w-full bg-slate-800 p-4 rounded-xl bg-opacity-50 flex justify-between items-center mt-4">
          <div className="flex-col">
            <h2 className="font-semibold mb-1 text-lg leading-none">
              Lock app
            </h2>
            <small className="text-slate-300">
              Auto lock app after 10 minutes when you leave
            </small>
          </div>
          <div className="theme-option flex items-center  bg-white dark:bg-slate-900 min-w-[3.5rem] h-9 sm:m-5 rounded-2xl relative">
            <input
              type={"checkbox"}
              className="opacity-0 relative inputCheck z-30 w-full cursor-pointer"
              onClick={(e) => {
                if (!e.target.checked) {
                  context.userSetting.autolock = 0;
                } else {
                  context.userSetting.autolock = 1;
                }
                context.SaveSetting(context.userSetting);
              }}
              defaultChecked={context.userSetting.autolock === 1 ? true : false}
            />
            <div className="wrapper flex items-center justify-between absolute p-2">
              <div className="ball rounded-full absolute dark:bg-slate-800  bg-slate-800 w-5 h-5 transition-all duration-300"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
