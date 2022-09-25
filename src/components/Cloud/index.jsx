import { faClose, faFile, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Cloud(props) {
  return (
    <div className="w-screen h-screen bg-slate-900 dark:bg-opacity-20 backdrop-blur-lg absolute z-50 flex items-center justify-center cloudMain">
      <div className="flex flex-col bg-slate-900 rounded-3xl text-white w-[90%] h-[90%] bg-opacity-60 p-6">
        <div className="flex justify-between">
          <div className="flex items-baseline gap-3">
            <h2 className="text-3xl font-semibold">Cloud storage</h2>
            <FontAwesomeIcon
              icon={faUpload}
              className="duration-300 hover:text-slate-500 cursor-pointer text-xl"
              fixedWidth
            />
          </div>

          <div className="flex justify-center items-center self-end w-10 h-10">
            <FontAwesomeIcon
              icon={faClose}
              className="text-xl cursor-pointer hover:text-slate-500 duration-300"
              fixedWidth
              onClick={() => {
                props.exit();
              }}
            />
          </div>
        </div>
        <small className="text-slate-400 my-1">
          Save anything you want here
        </small>
        <div className="flex flex-wrap mt-7 cursor-pointer">
          <div className="flex flex-col w-44 h-44 bg-slate-900 rounded-xl bg-opacity-40 items-center">
            <FontAwesomeIcon
              icon={faFile}
              className="text-5xl flex-1"
              fixedWidth
            />
            <div className=" bg-slate-900 w-full h-14 rounded-b-xl bg-opacity-60 flex flex-col p-2">
              <h2 className="line-clamp-1">File name asdasd adsd dasdasda</h2>
              <small className="text-xs text-slate-400">1 kb</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
