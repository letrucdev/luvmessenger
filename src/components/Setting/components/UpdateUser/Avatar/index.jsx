import { faCamera, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import unknowAvatar from "../../../../../image/stranger.png";
import { useState, useRef, useContext } from "react";
import { AppContext } from "../../../../../Context/AppContext";
import { useNavigate } from "react-router-dom";

export default function UpdateUserAvatar(props) {
  const [avatar, setAvatar] = useState(unknowAvatar);
  const [avatarUpload, setUpload] = useState(null);

  const inputFile = useRef();

  const context = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen bg-slate-900 dark:bg-opacity-20 backdrop-blur-lg absolute z-50 flex items-center justify-center modalMain">
      <div className=" bg-slate-900 bg-opacity-20 rounded-3xl flex flex-col p-5 gap-5 backdrop-blur-3xl select-none">
        <div className="flex gap-20">
          <div className="flex flex-col">
            <h3 className="text-white font-semibold text-2xl">
              Upload your avatar
            </h3>
            <p className="text-slate-500 text-sm">
              Your profile picture helps people recognize you
            </p>
          </div>
          {/*  <FontAwesomeIcon
            icon={faClose}
            className="text-white text-xl cursor-pointer hover:opacity-20 duration-300"
            fixedWidth
            onClick={() => {
              props.exit();
            }}
          /> */}
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-center items-center p-2 bg-slate-900 bg-opacity-40  w-24 h-24 rounded-full self-center group">
            <div
              className="bg-slate-900  w-20 h-20 z-40 absolute rounded-full opacity-0 group-hover:opacity-80 duration-300 flex items-center justify-center text-xl text-white cursor-pointer"
              onClick={() => {
                inputFile.current.click();
              }}
            >
              <input
                type={"file"}
                className="hidden"
                ref={inputFile}
                accept={".png, .jpg, .jpeg"}
                onChange={(e) => {
                  var filetypes = /jpeg|jpg|png/;
                  var mimetype = filetypes.test(e.target.files[0].type);
                  if (e.target.files[0] !== undefined && mimetype) {
                    setAvatar(URL.createObjectURL(e.target.files[0]));
                    setUpload(e.target.files[0]);
                  } else {
                    alert("File type not accepted!");
                  }
                }}
              />
              <FontAwesomeIcon icon={faCamera} fixedWidth />
            </div>

            <img
              src={avatar}
              alt="Avatar"
              className="object-cover rounded-full w-full h-full"
            />
          </div>
        </div>
        <div className="flex justify-end w-full gap-2 text-white">
          <button
            className="bg-slate-900 p-4 rounded-2xl cursor-pointer duration-300 hover:text-indigo-600 hover:bg-opacity-50"
            onClick={async () => {
              if (avatarUpload !== null) {
                const upload = await context.uploadImage(avatarUpload);
                if (upload) {
                  context.showUpdateProfile(false);
                } else {
                }
              }
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
