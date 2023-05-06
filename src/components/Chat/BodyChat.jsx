import {
  faArrowDown,
  faArrowLeft,
  faBars,
  faBell,
  faCaretDown,
  faClose,
  faImage,
  faPaperPlane,
  faPeopleGroup,
  faPhone,
  faSearch,
  faSmile,
  faTrash,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useContext, useEffect } from "react";
import EmojiPicker, { Theme, EmojiStyle } from "emoji-picker-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppContext } from "../../Context/AppContext";
import Message from "./Message";

export default function BodyChat() {
  const [scrollDown, showScrollButton] = useState(false);
  const [detailChat, showDetail] = useState(false);
  const [listFile, showListFile] = useState(false);
  const [listImg, showListImg] = useState(false);
  const [isShowEmoji, setShowEmoji] = useState(false);
  const [isShowListImg, setShowListImg] = useState(false);
  const [listFileSend, setListFileSend] = useState([]);
  const bodyChatRef = useRef(null);
  const inputChat = useRef(null);
  const inputFile = useRef(null);

  useEffect(() => {
    if (listFileSend.length > 0) {
      setShowListImg(true);
    } else {
      inputFile.current.value = "";
      setShowListImg(false);
    }
  }, [listFileSend]);

  const context = useContext(AppContext);

  const scrolltoBottom = () => {
    bodyChatRef.current?.scrollTo({
      behavior: "smooth",
      top: bodyChatRef.current?.scrollHeight,
    });
  };

  const handleSendMessage = () => {
    if (inputChat.current.value.trim() !== "") {
      context.sendMessage(
        context.userChat.id,
        inputChat.current.value.trim(),
        listFileSend
      );
    } else if (
      inputChat.current.value.trim() === "" &&
      listFileSend.length > 0
    ) {
      context.sendMessage(
        context.userChat.id,
        inputChat.current.value.trim(),
        listFileSend
      );
    } else {
      inputChat.current.focus();
    }
    inputChat.current.value = "";
    setListFileSend([]);
  };

  const handleDeleteFile = (index) => {
    const newListImg = [...listFileSend];
    newListImg.splice(index, 1);
    setListFileSend(newListImg);
  };

  const onFileChange = (e) => {
    const files = e.currentTarget.files;
    for (let i = 0; i < files.length; i++) {
      setListFileSend((prevList) => [...prevList, files.item(i)]);
    }
  };

  return (
    <div className={`w-full h-full gap-3 flex relative`}>
      <div className="flex flex-col w-full h-full overflow-hidden">
        {/* Chat Body */}
        <div className=" w-full  h-full md:min-w-[35rem]  rounded-3xl flex flex-col sm:rounded-l-none rounded-b-none duration-300 relative overflow-y-hidden">
          <div className=" w-full h-20  flex items-center gap-3 justify-between z-20 p-3 dark:bg-slate-900 dark:bg-opacity-60 dark:backdrop-blur-lg rounded-tr-3xl">
            <div className="flex items-center gap-3">
              <FontAwesomeIcon
                icon={faArrowLeft}
                fixedWidth
                className="text-white text-xl cursor-pointer duration-300 hover:text-indigo-600 sm:hidden"
                onClick={() => {
                  context.setShowChat(!context.showChat);
                }}
              />
              <img
                alt=""
                className=" rounded-full object-cover w-16 h-16"
                src={`${process.env.REACT_APP_CDN_URL}/images/avatar/${context.userChat.user_chat_setting.avatar}`}
              />
              <div className="flex flex-col text-white">
                <h4 className="leading-none">
                  {context.userChat.user_chat_name}
                </h4>
                <small className="text-slate-300">Đang hoạt động</small>
              </div>
            </div>

            <div className="flex text-white gap-3 text-xl items-center">
              <FontAwesomeIcon
                icon={faPhone}
                fixedWidth
                className="cursor-pointer hover:text-indigo-600 duration-300"
              />
              <FontAwesomeIcon
                icon={faVideo}
                fixedWidth
                className="cursor-pointer hover:text-indigo-600 duration-300"
              />
              <FontAwesomeIcon
                icon={faBars}
                fixedWidth
                className="cursor-pointer hover:text-indigo-600 duration-300"
                onClick={() => {
                  showDetail(!detailChat);
                }}
              />
            </div>
          </div>
          <div
            className="w-full flex flex-col-reverse grow
           gap-2 overflow-hidden hover:overflow-y-auto p-3 dark:bg-slate-900 dark:bg-opacity-60 dark:backdrop-blur-lg relative"
            onScroll={(e) => {
              if (e.currentTarget.scrollTop < -250) {
                showScrollButton(true);
              } else {
                showScrollButton(false);
              }
            }}
            ref={bodyChatRef}
          >
            {context.listMessage
              .sort((a, b) => b.id - a.id)
              .map((element) => {
                return (
                  <Message
                    key={element.id}
                    content={element.content}
                    file={element.file}
                    type={`${
                      element.sent_id !== context.userData.id
                        ? "recived"
                        : "send"
                    }`}
                  />
                );
              })}
          </div>
          {scrollDown && (
            <div className="flex  items-center bottom-10 mb-5 duration-300 transition-all absolute shrink right-0 left-0 justify-center">
              <div
                className="h-10 w-10 text-white z-30 bg-slate-900 justify-center items-center flex rounded-full self-center hover:cursor-pointer transition-all duration-300 hover:opacity-70 animate-bounce"
                onClick={() => scrolltoBottom()}
              >
                <FontAwesomeIcon icon={faArrowDown} />
              </div>
            </div>
          )}
          {/* Chat Footer */}
          <div className="dark:bg-slate-900 w-full p-2 h-16  grow-0 dark:bg-opacity-75 dark:backdrop-blur-lg rounded-3xl flex items-center text-white gap-2 px-5  rounded-t-none sm:rounded-bl-none duration-300">
            {isShowListImg && (
              <div className="flex dark:bg-slate-900 absolute bottom-16 rounded-3xl dark:bg-opacity-40 dark:backdrop-blur-lg p-4 select-none">
                <div className="flex overflow-x-auto gap-4 max-w-md py-2">
                  {listFileSend.map((element, index) => {
                    return (
                      <div
                        className="flex justify-center items-center rounded-3xl min-w-fit h-48 cursor-pointer  group relative"
                        key={element.name}
                      >
                        <div className="w-full h-full absolute z-10 rounded-3xl flex items-center justify-center bg-slate-900 bg-opacity-0 group-hover:bg-opacity-40 duration-300">
                          <FontAwesomeIcon
                            fixedWidth
                            className="text-3xl opacity-0 group-hover:opacity-100 duration-300 hover:text-red-500"
                            icon={faTrash}
                            onClick={() => handleDeleteFile(index)}
                          />
                        </div>
                        <img
                          src={URL.createObjectURL(element)}
                          alt=""
                          className="rounded-3xl w-48 h-48 object-cover"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            <div className="flex items-center justify-center  rounded-2xl cursor-pointer text-xl h-10 w-10 duration-300">
              <input
                multiple={true}
                type={"file"}
                className="hidden"
                ref={inputFile}
                accept={".png, .jpg, .jpeg, .gif"}
                onChange={onFileChange}
              />
              <FontAwesomeIcon
                icon={faImage}
                fixedWidth
                className="hover:text-indigo-600 duration-300"
                onClick={() => {
                  inputFile.current.click();
                  /* setShowListImg(!isShowListImg); */
                }}
              />
            </div>
            {isShowEmoji && (
              <div className="absolute bottom-16">
                <EmojiPicker
                  width={300}
                  height={450}
                  theme={Theme.DARK}
                  emojiStyle={EmojiStyle.GOOGLE}
                  lazyLoadEmojis={true}
                  onEmojiClick={(e) => {
                    inputChat.current.value += e.emoji;
                  }}
                />
              </div>
            )}
            <div className="flex items-center justify-center  rounded-2xl cursor-pointer text-xl  h-10 w-10  duration-300">
              <FontAwesomeIcon
                icon={faSmile}
                fixedWidth
                className="hover:text-indigo-600 duration-300"
                onClick={() => {
                  setShowEmoji(!isShowEmoji);
                }}
              />
            </div>
            <div className="w-full  flex items-center h-full py-1 duration-300">
              <input
                ref={inputChat}
                className="bg-transparent w-full outline-none text-white"
                placeholder="Type your message..."
                maxLength={512}
                onFocus={() => {
                  context.ReadMessage(context.userChat.id);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
              />
            </div>
            <div className="flex items-center justify-center rounded-2xl cursor-pointer text-xl h-10 w-10  duration-300">
              <FontAwesomeIcon
                icon={faPaperPlane}
                fixedWidth
                className="hover:text-indigo-600 duration-300"
                onClick={() => {
                  handleSendMessage();
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Detail chat */}
      {detailChat && (
        <div className="absolute right-0 2xl:relative flex flex-col h-full w-96 min-w-[24rem] dark:bg-slate-900 dark:bg-opacity-60 dark:backdrop-blur-lg rounded-3xl p-3 items-center gap-2 detailChat overflow-y-auto select-none z-30">
          <FontAwesomeIcon
            icon={faClose}
            fixedWidth
            className="text-white absolute left-0 p-4 hover:text-red-600 cursor-pointer transition-all duration-300 2xl:hidden"
            onClick={() => {
              showDetail(!detailChat);
            }}
          />
          <img
            src={`${process.env.REACT_APP_CDN_URL}/images/avatar/${context.userChat.user_chat_setting.avatar}`}
            className="rounded-full object-cover w-20 h-20 cursor-pointer"
            alt=""
          />
          <h2 className="text-white font-semibold">
            {context.userChat.user_chat_name}
          </h2>

          <div className="flex items-center justify-center gap-9 my-3">
            <div className="flex flex-col text-white items-center justify-center w-14 cursor-pointer group">
              <div className="flex text-white text-lg bg-slate-900 w-9 h-9 rounded-full items-center justify-center mb-2 group-hover:bg-slate-800 duration-300">
                <FontAwesomeIcon icon={faBell} fixedWidth />
              </div>
              <h2 className="text-sm text-center select-none">
                Turn off notify
              </h2>
            </div>

            <div className="flex flex-col text-white items-center justify-center w-14 cursor-pointer group">
              <div className="flex text-white text-lg bg-slate-900 w-9 h-9 rounded-full items-center justify-center mb-2 group-hover:bg-slate-800 duration-300">
                <FontAwesomeIcon icon={faPeopleGroup} fixedWidth />
              </div>
              <h2 className="text-sm text-center select-none">Create group</h2>
            </div>

            <div className="flex flex-col text-white items-center justify-center w-14 cursor-pointer group">
              <div className="flex text-white text-lg bg-slate-900 w-9 h-9 rounded-full items-center justify-center mb-2 group-hover:bg-slate-800 duration-300">
                <FontAwesomeIcon icon={faSearch} fixedWidth />
              </div>
              <h2 className="text-sm text-center select-none">Find message</h2>
            </div>
          </div>

          <div className="flex flex-col w-full bg-slate-900 rounded-xl bg-opacity-50">
            <div
              className="w-full p-4 rounded-xl flex justify-between items-center text-white cursor-pointer select-none"
              onClick={() => {
                showListImg(!listImg);
              }}
            >
              <h2>Image / Video</h2>
              <FontAwesomeIcon
                icon={faCaretDown}
                className={`${listImg ? "" : "-rotate-90"} duration-300`}
              />
            </div>

            {listImg ? (
              <div className="flex w-full bg-slate-900 bg-opacity-40 rounded-xl rounded-t-none flex-wrap p-4 gap-6">
                <img
                  src={require("../../image/bg.jpg")}
                  className="object-cover w-16 h-16 rounded-xl cursor-pointer"
                  alt=""
                />
                <img
                  src={require("../../image/bg.jpg")}
                  className="object-cover w-16 h-16 rounded-xl cursor-pointer"
                  alt=""
                />
                <img
                  src={require("../../image/bg.jpg")}
                  className="object-cover w-16 h-16 rounded-xl cursor-pointer"
                  alt=""
                />
                <img
                  src={require("../../image/bg.jpg")}
                  className="object-cover w-16 h-16 rounded-xl cursor-pointer"
                  alt=""
                />
                <img
                  src={require("../../image/bg.jpg")}
                  className="object-cover w-16 h-16 rounded-xl cursor-pointer"
                  alt=""
                />
                <img
                  src={require("../../image/bg.jpg")}
                  className="object-cover w-16 h-16 rounded-xl cursor-pointer"
                  alt=""
                />
                <img
                  src={require("../../image/bg.jpg")}
                  className="object-cover w-16 h-16 rounded-xl cursor-pointer"
                  alt=""
                />
                <img
                  src={require("../../image/bg.jpg")}
                  className="object-cover w-16 h-16 rounded-xl cursor-pointer"
                  alt=""
                />
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="flex flex-col w-full bg-slate-900 rounded-xl bg-opacity-50">
            <div
              className="w-full p-4 rounded-xl flex justify-between items-center text-white cursor-pointer select-none"
              onClick={() => {
                showListFile(!listFile);
              }}
            >
              <h2>File</h2>
              <FontAwesomeIcon
                icon={faCaretDown}
                className={`${listFile ? "" : "-rotate-90"} duration-300`}
              />
            </div>
            {listFile ? (
              <div className="flex flex-col w-full bg-slate-900 bg-opacity-40 rounded-xl rounded-t-none flex-wrap p-4 gap-6">
                <h2 className="text-slate-600 select-none">
                  No files shared yet
                </h2>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="flex flex-col w-full bg-slate-900 rounded-xl bg-opacity-50">
            <div className="w-full p-4 rounded-xl flex justify-between items-center text-white cursor-pointer group">
              <h2 className="group-hover:text-red-600 duration-300 select-none">
                Delete this chat
              </h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
