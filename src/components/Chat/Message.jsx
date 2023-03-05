import { faSmile, faReply } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react/headless";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Message(props) {
  const linkRegex = new RegExp(
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
  );
  return (
    <>
      {props.type === "recived" ? (
        <Tippy
          interactive="true"
          placement="right"
          render={(attrs) => (
            <div
              {...attrs}
              className=" h-9 flex items-center text-white  p-3 rounded-xl bg-slate-900 bg-opacity-20 backdrop-blur-lg gap-3 tooltip"
            >
              <FontAwesomeIcon
                icon={faSmile}
                className="hover:text-indigo-500 duration-300 cursor-pointer"
              />
              <FontAwesomeIcon
                icon={faReply}
                className="hover:text-indigo-500 duration-300 cursor-pointer"
              />
            </div>
          )}
        >
          <div className="w-fit max-w-md rounded-3xl rounded-bl-none bg-slate-900 dark:bg-opacity-50 backdrop-blur-lg text-white flex items-center message">
            {linkRegex.test(props.content) ? (
              <div className="flex flex-col gap-2 p-4">
                <a
                  href={props.content}
                  target="_blank"
                  className="text-indigo-500"
                  rel="noreferrer"
                >
                  {props.content}
                </a>
              </div>
            ) : (
              <p className=" break-all p-4 w-fit max-w-[15rem] md:w-auto md:max-w-sm">
                {props.content}
              </p>
            )}
          </div>
        </Tippy>
      ) : (
        <Tippy
          placement="left"
          interactive="true"
          render={(attrs) => (
            <div
              {...attrs}
              className=" h-9 flex items-center text-white  p-3 rounded-xl bg-slate-900 bg-opacity-20 backdrop-blur-lg gap-3 tooltip"
            >
              <FontAwesomeIcon
                icon={faSmile}
                className="hover:text-indigo-500 duration-300 cursor-pointer"
              />
              <FontAwesomeIcon
                icon={faReply}
                className="hover:text-indigo-500 duration-300 cursor-pointer"
              />
            </div>
          )}
        >
          <div className="w-fit max-w-md rounded-3xl rounded-br-none bg-slate-900 dark:bg-opacity-50 backdrop-blur-lg text-white flex items-center self-end message">
            {linkRegex.test(props.content) ? (
              <div className="flex flex-col gap-2 p-4">
                <a
                  href={props.content}
                  target="_blank"
                  className="text-indigo-500"
                  rel="noreferrer"
                >
                  {props.content}
                </a>
              </div>
            ) : (
              <p className=" break-all p-4 w-fit max-w-[15rem] md:w-auto md:max-w-sm">
                {props.content}
              </p>
            )}
          </div>
        </Tippy>
      )}
    </>
  );
}
