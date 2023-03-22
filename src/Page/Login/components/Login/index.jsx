import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef } from "react";
import {
  faLock,
  faArrowRight,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { useValidator as Validator } from "../../../../Hooks/useValidator";
import {
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  auth,
  providerFacebook,
  providerGoogle,
} from "../../../../Firebase/config";

export default function LoginUI(props) {
  const navigate = useNavigate();

  const [isLogin, setLogin] = useState(false);
  /* const [account, setAccount] = useState("");
  const [password, setPassword] = useState(""); */

  const account = useRef();
  const password = useRef();

  const errorRef = useRef([]);

  function locdau(str) {
    /* eslint-disable no-useless-escape */
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(
      /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g,
      ""
    );
    str = str.replace(/-+-/g, "");
    str = str.replace(/^\-+|\-+$/g, "");
    return str;
  }

  async function handleFacebookLogin() {
    await signInWithPopup(auth, providerFacebook)
      .then((result) => {
        const user = result.user;
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

        console.table({
          phone: user.phoneNumber,
          name: locdau(user.displayName),
          email: user.email,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = FacebookAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage);
      });
  }

  async function handleGoogleLogin() {
    await signInWithPopup(auth, providerGoogle)
      .then((result) => {
        /*         const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken; */
        const user = result.user;
        console.table({
          phone: user.phoneNumber,
          name: locdau(user.displayName),
          email: user.email,
        });
        console.log(user.photoURL);
      })
      .catch((error) => {
        /*       const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error); */
      });
  }

  const Login = async (account, password) => {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    if (account?.trim().length > 0 && password?.trim().length > 0) {
      await axios
        .post(
          `${process.env.REACT_APP_API_ENDPOINT}/login`,
          { account: account, password: password },
          config
        )
        .then(function (response) {
          if (response.data.auth === true) {
            secureLocalStorage.setItem("accessToken", response.data.token);
            navigate("/home");
          } else {
            alert("Wrong username or password!");
          }
        })
        .catch(function (error) {
          alert("Connect to server failed!");
        });
    } else {
      alert("Please enter email and password!");
    }
    setLogin(false);
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center dark:text-white registerForm">
      <h1 className="font-bold text-2xl mb-6 text-black dark:text-white">
        WELCOME BACK!
      </h1>
      <div className="wrap-input p-3 bg-slate-200 dark:bg-slate-800 rounded-3xl m-2 w-3/4 flex items-center group  backdrop-blur-xl relative ">
        <FontAwesomeIcon
          icon={faUser}
          className="ml-3 text-slate-600 group-focus-within:text-white duration-300"
        />
        <Validator>
          <input
            type={"text"}
            placeholder="Account"
            ref={account}
            className="border-none outline-none bg-transparent px-4 w-full focus:ring-0"
          />
        </Validator>
      </div>
      <div className=" w-3/4 flex">
        <p className="text-red-600" ref={(eR) => errorRef.current.push(eR)}></p>
      </div>
      <div className="wrap-input p-3 bg-slate-200 dark:bg-slate-800 rounded-3xl m-3 w-3/4 flex items-center group  backdrop-blur-xl">
        <FontAwesomeIcon
          icon={faLock}
          className="ml-3 text-slate-600 group-focus-within:text-white duration-300"
        />
        <Validator>
          {" "}
          <input
            type={"password"}
            ref={password}
            placeholder="Password"
            className="border-none outline-none bg-transparent px-4 w-full focus:ring-0"
          />
        </Validator>
      </div>
      <div className=" w-3/4 flex">
        <p className="text-red-600" ref={(eR) => errorRef.current.push(eR)}></p>
      </div>
      <div className="wrap-button mt-6 font-bold w-3/4 text-white ">
        <button
          disabled={isLogin}
          className="bg-gradient-to-r from-violet-500 to-fuchsia-500 p-3 w-full rounded-3xl hover:opacity-50 hover:bg-gradient-to-l duration-300 disabled:opacity-25 disabled:cursor-wait"
          onClick={() => {
            setLogin(!isLogin);
            Login(account.current.value, password.current.value);
          }}
        >
          LOGIN
        </button>
      </div>

      <div className="flex w-3/4 text-center justify-center items-center">
        <hr className="w-16" />
        <p className="font-semibold p-2">OR</p>
        <hr className="w-16" />
      </div>

      <div className="flex justify-center items-center gap-2">
        <img
          src="https://img.icons8.com/color/48/null/facebook-new.png"
          alt="Facebook"
          className="w-12 h-12 object-center cursor-pointer hover:opacity-40 duration-300"
          onClick={() => {
            handleFacebookLogin();
          }}
        />
        <img
          src="https://img.icons8.com/color/48/null/google-logo.png"
          alt="Google"
          className="w-12 h-12 object-center cursor-pointer hover:opacity-40 duration-300"
          onClick={() => {
            handleGoogleLogin();
          }}
        />
      </div>
      <div className="text-center m-3">
        <span className="text-slate-900 dark:text-slate-300">
          Forgot{" "}
          <a
            href="/"
            className="text-slate-400 hover:text-indigo-700 duration-300"
          >
            Username / Password?
          </a>
        </span>
      </div>
      <div className="text-center text-slate-400 mt-10 hover:text-indigo-700 duration-300">
        <button
          onClick={() => {
            props.registerAccount();
          }}
        >
          Create your account <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
}
