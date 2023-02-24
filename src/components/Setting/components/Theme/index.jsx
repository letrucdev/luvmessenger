import "./index.css";
import { useState, useContext } from "react";
import { AppContext } from "../../../../Context/AppContext";

export default function Theme() {
  const context = useContext(AppContext);
  const [currentBackground, setBackground] = useState(
    `${context.userSetting.theme}`
  );

  const ApplyTheme = (theme) => {
    context.userSetting.theme = theme;
    context.SaveSetting(context.userSetting);
  };

  return (
    <div className="w-full h-full flex-col gap-3 px-3 overflow-auto theme">
      <div className="flex-col w-full mb-6">
        <h2 className="text-bold text-3xl mb-6">Theme</h2>
        <div className="flex flex-wrap gap-10">
          <div className="flex-col">
            <div className="w-72 h-40 bg-slate-900 rounded-2xl theme-purple mb-2 cursor-pointer flex items-center justify-center group">
              <div
                className="w-full h-full rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 bg-slate-900 bg-opacity-60 duration-300"
                onClick={() => {
                  setBackground(`/bg.jpg`);
                  ApplyTheme(`/bg.jpg`);
                }}
              >
                <h2 className="font-semibold text-xl  duration-300">
                  Apply theme
                </h2>
              </div>
            </div>
            <h2 className="font-semibold text-lg">Flat purple</h2>
          </div>

          <div className="flex-col">
            <div className="w-72 h-40 bg-slate-900 rounded-2xl theme-galaxy mb-2 cursor-pointer flex items-center justify-center group">
              <div
                className="w-full h-full rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 bg-slate-900 bg-opacity-60 duration-300"
                onClick={() => {
                  setBackground(`/bg2.jpg`);
                  ApplyTheme(`/bg2.jpg`);
                }}
              >
                <h2 className="font-semibold text-xl  duration-300">
                  Apply theme
                </h2>
              </div>
            </div>
            <h2 className="font-semibold text-lg">Galaxy Flat Design</h2>
          </div>

          <div className="flex-col">
            <div className="w-72 h-40 bg-slate-900 rounded-2xl theme-gradiant mb-2 cursor-pointer flex items-center justify-center group bg-gradient-to-l from-purple-800 to-indigo-600">
              <div className="w-full h-full rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 bg-slate-900 bg-opacity-60 duration-300">
                <h2 className="font-semibold text-xl  duration-300">
                  Apply theme
                </h2>
              </div>
            </div>
            <h2 className="font-semibold text-lg">Gradiant Purple</h2>
          </div>
        </div>
      </div>

      <div className="flex-col w-full">
        <h2 className="text-bold text-3xl mb-4">Wallpaper</h2>
        <small className="font-semibold">Current wallparper</small>
        <img
          src={`${process.env.REACT_APP_CDN_URL}/images/bg/${currentBackground}`}
          className="w-72 h-40 object-cover my-2 rounded-2xl"
          alt=""
        />
        <div className="bg-slate-900 w-24 flex items-center justify-center rounded-xl p-2 bg-opacity-40 text-lg font-semibold mt-3 hover:bg-opacity-75 duration-300">
          <button>Upload</button>
        </div>
      </div>
    </div>
  );
}

