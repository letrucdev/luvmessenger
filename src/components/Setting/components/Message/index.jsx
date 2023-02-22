export default function Message(props) {
  return (
    <div className="w-full h-full flex flex-col gap-3 px-3 overflow-auto message">
      <div className="flex-col">
        <h2 className="text-bold text-3xl mb-6">Message</h2>

        <div className="w-full bg-slate-800 p-4 rounded-xl bg-opacity-50 flex justify-between items-center mt-4">
          <div className="flex-col">
            <h2 className="font-semibold mb-1 text-lg leading-none">
              Typing message
            </h2>
            <small className="text-slate-300">
              Whoever chats with you can see you're typing
            </small>
          </div>
          <div className="theme-option flex items-center  bg-white dark:bg-slate-900 w-14 h-9 m-5 rounded-2xl">
            <input
              type={"checkbox"}
              className="opacity-0 relative inputCheck z-30 w-full cursor-pointer"
              onClick={(e) => {
                if (!e.target.checked) {
                  props.setting.typing = 0;
                  localStorage.setItem("user_setting", JSON.stringify(props.setting));
                } else {
                  props.setting.typing = 1;
                  localStorage.setItem("user_setting", JSON.stringify(props.setting));
                }
              }}
              defaultChecked={props?.setting?.typing === 1 ? true : false}
            />
            <div className="wrapper flex items-center justify-between absolute p-2">
              <div className="ball rounded-full absolute dark:bg-slate-800  bg-slate-800 w-5 h-5 transition-all duration-300"></div>
            </div>
          </div>
        </div>

        <div className="w-full bg-slate-800 p-4 rounded-xl bg-opacity-50 flex justify-between items-center mt-4">
          <div className="flex-col">
            <h2 className="font-semibold mb-1 text-lg leading-none">
              Hide preview image
            </h2>
            <small className="text-slate-300">
                Blur the preview image you receive
            </small>
          </div>
          <div className="theme-option flex items-center  bg-white dark:bg-slate-900 w-14 h-9 m-5 rounded-2xl">
            <input
              type={"checkbox"}
              className="opacity-0 relative inputCheck z-30 w-full cursor-pointer"
              onClick={(e) => {
                if (!e.target.checked) {
                  props.setting.hide_prev_image = 0;
                  localStorage.setItem("user_setting", JSON.stringify(props.setting));
                } else {
                  props.setting.hide_prev_image = 1;
                  localStorage.setItem("user_setting", JSON.stringify(props.setting));
                }
              }}
              defaultChecked={props.setting.hide_prev_image === 1 ? true : false}
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
