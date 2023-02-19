import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

export default function RegisterUI(props) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center dark:text-white registerForm">
      <h1 className="font-bold text-2xl mb-6 text-black dark:text-white">
        SIGN UP
      </h1>
      <div className="wrap-input p-3 bg-slate-200 dark:bg-slate-800 rounded-3xl m-2 w-3/4 flex items-center group  backdrop-blur-xl">
        <FontAwesomeIcon
          icon={faEnvelope}
          className="ml-3 text-slate-600 group-focus-within:text-white duration-300"
        />
        <input
          type={"email"}
          placeholder="Email"
          className="border-none outline-none bg-transparent px-4 w-full focus:ring-0"
        />
      </div>
      <div className="wrap-input p-3 bg-slate-200 dark:bg-slate-800 rounded-3xl m-3 w-3/4 flex items-center group  backdrop-blur-xl">
        <FontAwesomeIcon
          icon={faLock}
          className="ml-3 text-slate-600 group-focus-within:text-white duration-300"
        />
        <input
          type={"password"}
          placeholder="Password"
          className="border-none outline-none bg-transparent px-4 w-full focus:ring-0"
        />
      </div>
      <div className="wrap-button mt-6 font-bold w-3/4 text-white ">
        <button className="bg-gradient-to-r from-violet-500 to-fuchsia-500 p-3 w-full rounded-3xl hover:opacity-50 hover:bg-gradient-to-l duration-300">
          REGISTER
        </button>
      </div>
      <div className="text-center text-slate-400 mt-5 hover:text-indigo-700 duration-300">
        <button
          onClick={() => {
            props.loginAccount();
          }}
        >
          Already have account <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
}
