export default function Notification(props) {
  return (
    <div className="w-full h-full flex flex-col gap-3 px-3 overflow-auto notification">
      <div className="flex-col">
        <h2 className="text-bold text-3xl mb-6">Notification</h2>

        <div className="w-full bg-slate-800 p-4 rounded-xl bg-opacity-50 flex justify-between items-center mt-4">
          <div className="flex-col">
            <h2 className="font-semibold mb-1 text-lg leading-none">
              Enable notification
            </h2>
          </div>
          <div className="theme-option flex items-center  bg-white dark:bg-slate-900 w-14 h-9 m-5 rounded-2xl">
            <input
              type={"checkbox"}
              className="opacity-0 relative inputCheck z-30 w-full cursor-pointer"
              onClick={(e) => {
                if (!e.target.checked) {
                  props.setting.notification = 0;
                  localStorage.setItem("user_setting", JSON.stringify(props.setting));
                } else {
                  props.setting.notification = 1;
                  localStorage.setItem("user_setting", JSON.stringify(props.setting));
                }
              }}
              defaultChecked={props.setting.notification === 1 ? true : false}
            />
            <div className="wrapper flex items-center justify-between absolute p-2">
              <div className="ball rounded-full absolute dark:bg-slate-800  bg-slate-800 w-5 h-5 transition-all duration-300"></div>
            </div>
          </div>
        </div>

        <div className="w-full bg-slate-800 p-4 rounded-xl bg-opacity-50 flex justify-between items-center mt-4">
          <div className="flex-col">
            <h2 className="font-semibold mb-1 text-lg leading-none">
              Notification sounds
            </h2>
            <small className="text-slate-300">
              Play sound when you have notification
            </small>
          </div>
          <div className="theme-option flex items-center  bg-white dark:bg-slate-900 w-14 h-9 m-5 rounded-2xl">
            <input
              type={"checkbox"}
              className="opacity-0 relative inputCheck z-30 w-full cursor-pointer"
              onClick={(e) => {
                if (!e.target.checked) {
                  props.setting.notification_sounds = 0;
                  localStorage.setItem("user_setting", JSON.stringify(props.setting));
                } else {
                  props.setting.notification_sounds = 1;
                  localStorage.setItem("user_setting", JSON.stringify(props.setting));
                }
              }}
              defaultChecked={
                props.setting.notification_sounds === 1 ? true : false
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
              Hide notification content
            </h2>
            <small className="text-slate-300">
              Your notification content will be hidden
            </small>
          </div>
          <div className="theme-option flex items-center  bg-white dark:bg-slate-900 w-14 h-9 m-5 rounded-2xl">
            <input
              type={"checkbox"}
              className="opacity-0 relative inputCheck z-30 w-full cursor-pointer"
              onClick={(e) => {
                if (!e.target.checked) {
                  props.setting.hide_notification_content = 0;
                  localStorage.setItem("user_setting", JSON.stringify(props.setting));
                } else {
                  props.setting.hide_notification_content = 1;
                  localStorage.setItem("user_setting", JSON.stringify(props.setting));
                }
              }}
              defaultChecked={
                props.setting.hide_notification_content === 1 ? true : false
              }
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
