import "../Home/home.css";
import React, {
  useState,
  useRef,
  useEffect,
  Suspense,
  lazy,
  useContext,
} from "react";
import { createBrowserHistory } from "history";
import { useNavigate } from "react-router-dom";

import {
  faGear,
  faImage,
  faSmile,
  faPaperPlane,
  faSearch,
  faArrowDown,
  faBars,
  faPhone,
  faVideo,
  faCloud,
  faTools,
  faMessage,
  faPeopleGroup,
  faEnvelope,
  faBell as fasFaBell,
  faUserPlus,
  faCaretDown,
  faClose,
  faArrowLeft,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";

import Tippy from "@tippyjs/react/headless";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

import {
  faBell as farFaBell,
  faMessage as farFaMessage,
  faAddressBook as farFaAddressBook,
} from "@fortawesome/free-regular-svg-icons";

import NavItem from "../../components/Nav/NavItem";
import Setting from "../../components/Setting";
import Cloud from "../../components/Cloud";
import Message from "../../components/Chat/Message";
import AddFriend from "../../components/Popup/Friend";
import LoadingUserChat from "../../components/Chat/LoadingUserChat";
import { AppContext } from "../../Context/AppContext";

const UserChat = lazy(() => import("../../components/Chat/UserChat"));
const history = createBrowserHistory();

library.add(farFaBell, fasFaBell, farFaMessage);

export default function Home() {
  const navigate = useNavigate();
  const [userChat, setUserChat] = useState();
  const [menuSelected, setMenuItemSelected] = useState(1);
  const [previewProfile, showPreview] = useState(false);
  const [detailChat, showDetail] = useState(false);
  const [listImg, showListImg] = useState(false);
  const [listFile, showListFile] = useState(false);
  const [setting, showSetting] = useState(false);
  const [addFriend, showaddFriend] = useState(false);
  const [cloud, showCloud] = useState(false);
  const [scrollDown, showScrollButton] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const [blur, setBlur] = useState(false);
  /*   const [userData, setUserData] = useState({}); */

  const [mousePosition, setMousePosition] = useState();

  const bodyChatRef = useRef(null);
  const listUserChatRef = useRef(null);
  const container = useRef(null);

  const context = useContext(AppContext);

  const scrolltoBottom = () => {
    bodyChatRef.current?.scrollTo({
      behavior: "smooth",
      top: bodyChatRef.current?.scrollHeight,
    });
  };

  const closeChat = () => {
    const styless = window
      .getComputedStyle(listUserChatRef.current)
      .getPropertyValue("display");
    if (styless === "none") {
      setUserChat(0);
      setShowChat(!showChat);
    }
  };

  useEffect(() => {
    if (bodyChatRef.current) {
      setTimeout(() => {
        scrolltoBottom();
      }, 300);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showChat !== false]);

  useEffect(() => {
    history.replace("/");
    context.loadUserData();
    document.addEventListener("visibilitychange", () => {
      setMousePosition(0);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (context.background) {
      container.current.style.backgroundImage = `url('${process.env.REACT_APP_CDN_URL}/images/bg${context.background}')`;
    }
  }, [context.background]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setBlur(true);
    }, 300_000);
    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mousePosition]);

  return (
    <div
      className={`dark w-screen h-screen bg-gradient-to-l from-purple-800 to-indigo-600  flex justify-center items-center main`}
      ref={container}
      onMouseMove={(e) => {
        if (context.userSetting.autolock !== 0) {
          setBlur(false);
          setMousePosition(e.clientX + e.clientY);
        }
      }}
    >
      {context.isLoading ? (
        <img alt="" src={require("../../image/loading.gif")} />
      ) : (
        <>
          {setting ? (
            <Setting
              exit={() => {
                showSetting(!setting);
              }}
            />
          ) : null}

          {cloud ? (
            <Cloud
              exit={() => {
                showCloud(!cloud);
              }}
            />
          ) : null}

          {addFriend ? (
            <AddFriend
              exit={() => {
                showaddFriend(!addFriend);
              }}
            />
          ) : null}

          {blur ? (
            <div className="w-full h-full bg-slate-900 bg-opacity-40 backdrop-blur-3xl absolute z-50 duration-300 modalMain"></div>
          ) : null}

          <div className="flex items-center p-5 w-full h-full justify-center">
            <div className=" flex-col w-24 h-full max-w-[5rem] min-w-[5rem] bg-gradient-to-l from-purple-800 to-indigo-600 rounded-3xl rounded-r-none items-center  justify-between hidden sm:flex">
              {/* top nav */}
              <div className="flex flex-col w-full text-white items-center">
                <Tippy
                  onClickOutside={() => {
                    showPreview(false);
                  }}
                  visible={previewProfile}
                  appendTo={document.body}
                  interactive="true"
                  placement={"right-start"}
                  render={(attrs) => (
                    <div
                      className="flex items-center flex-col-reverse text-white rounded-3xl  bg-slate-900 min-h-[16rem]  h-80  w-72 ml-4 relative bg-opacity-25 backdrop-blur-lg profilePreview"
                      {...attrs}
                    >
                      <div className="w-full h-[80%]  rounded-b-3xl bg-opacity-90 dark:bg-opacity-90 backdrop-blur-lg flex flex-col items-center">
                        <div className="flex flex-col items-center justify-center bg-slate-900 bg-opacity-40 rounded-full w-24 h-24 -translate-y-12 p-2">
                          <img
                            src={`${process.env.REACT_APP_CDN_URL}/images/avatar${context.userSetting.avatar}`}
                            className="rounded-full object-cover w-20 h-20 cursor-pointer"
                            alt=""
                          />
                        </div>
                        <div className="flex flex-col justify-center -translate-y-12 w-[90%]">
                          <h4 className="text-lg mt-1 font-semibold text-center mb-3">
                            {context.username}
                          </h4>
                          <div className="flex flex-col justify-self-start text-slate-100 font-medium gap-1">
                            <h5>Contact</h5>
                            <span className="flex items-center gap-2">
                              <FontAwesomeIcon
                                icon={faEnvelope}
                                fixedWidth
                                className="text-2xl"
                              />
                              <div className="flex flex-col">
                                <h6>{context.email}</h6>
                                <small className="text-slate-300">Email</small>
                              </div>
                            </span>
                            <span className="flex items-center gap-2">
                              <FontAwesomeIcon
                                icon={faPhone}
                                fixedWidth
                                className="text-2xl"
                              />
                              <div className="flex flex-col">
                                <h6>+84123456789</h6>
                                <small className="text-slate-300">Phone</small>
                              </div>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                >
                  <Tippy
                    placement="right-end"
                    render={(attrs) => (
                      <div
                        {...attrs}
                        className="h-9 flex items-center text-white  p-3 rounded-3xl bg-gradient-to-r from-purple-800 to-indigo-600  tooltip"
                      >
                        <p>{context.username}</p>
                      </div>
                    )}
                  >
                    <img
                      src={`${process.env.REACT_APP_CDN_URL}/images/avatar${context.userSetting.avatar}`}
                      className="rounded-full object-cover w-14 h-14 my-4 cursor-pointer"
                      alt=""
                      onClick={() => {
                        showPreview(!previewProfile);
                      }}
                    />
                  </Tippy>
                </Tippy>

                <NavItem
                  Class={menuSelected === 1 ? "bg-slate-900 bg-opacity-50" : ""}
                  id={1}
                  icon={farFaMessage}
                  Click={(e) => {
                    setMenuItemSelected(e);
                    closeChat();
                  }}
                />

                <Tippy
                  onClickOutside={() => {
                    setMenuItemSelected(1);
                  }}
                  visible={menuSelected === 2 ? true : false}
                  appendTo={document.body}
                  interactive="true"
                  placement={"right-start"}
                  render={(attrs) => (
                    <div
                      className="p-3 flex-col text-white bg-slate-900 rounded-3xl bg-opacity-60 backdrop-blur-lg notification hidden sm:flex"
                      {...attrs}
                    >
                      <h2 className="text-2xl font-semibold mb-2 px-2">
                        Notification
                      </h2>
                      <div className="flex-col hover:overflow-auto overflow-hidden  max-w-[28rem] w-96 max-h-80">
                        <div className="flex gap-2 px-2 w-full mt-2 hover:bg-slate-900 py-2 rounded-xl hover:bg-opacity-40 duration-300 cursor-pointer relative">
                          <div className="flex min-w-[4rem] h-16 justify-end">
                            <img
                              src={require("./image/ava.jpg")}
                              className="rounded-full object-cover min-w-[4rem] h-16 cursor-pointer "
                              alt=""
                            />
                            <div className="self-end z-30 bg-slate-900 text-center w-6 h-6 rounded-full flex items-center justify-center bg-opacity-70 backdrop-blur-lg absolute">
                              <FontAwesomeIcon
                                icon={faMessage}
                                className="text-xs rounded-full text-indigo-500"
                                fixedWidth
                              />
                            </div>
                          </div>

                          <div className="flex-col overflow-hidden ">
                            <h2 className=" line-clamp-3 leading-tight">
                              <b>Lê Trực</b> sent you a new message
                            </h2>
                            <small className="text-indigo-400">
                              30 minutes ago
                            </small>
                          </div>
                        </div>

                        <div className="flex gap-2 px-2 w-full mt-2 hover:bg-slate-900 py-2 rounded-xl hover:bg-opacity-40 duration-300 cursor-pointer relative">
                          <div className="flex min-w-[4rem] h-16 justify-end">
                            <img
                              src={require("./image/ava.jpg")}
                              className="rounded-full object-cover min-w-[4rem] h-16 cursor-pointer "
                              alt=""
                            />
                            <div className="self-end z-30 bg-slate-900 text-center w-6 h-6 rounded-full flex items-center justify-center bg-opacity-70 backdrop-blur-lg absolute">
                              <FontAwesomeIcon
                                icon={faMessage}
                                className="text-xs rounded-full text-indigo-500"
                                fixedWidth
                              />
                            </div>
                          </div>

                          <div className="flex-col overflow-hidden ">
                            <h2 className=" line-clamp-3 leading-tight">
                              <b>Lê Trực</b> sent you a new message
                            </h2>
                            <small className="text-indigo-400">
                              30 minutes ago
                            </small>
                          </div>
                        </div>

                        <div className="flex gap-2 px-2 w-full mt-2 hover:bg-slate-900 py-2 rounded-xl hover:bg-opacity-40 duration-300 cursor-pointer relative">
                          <div className="flex min-w-[4rem] h-16 justify-end">
                            <img
                              src={require("./image/ava.jpg")}
                              className="rounded-full object-cover min-w-[4rem] h-16 cursor-pointer "
                              alt=""
                            />
                            <div className="self-end z-30 bg-slate-900 text-center w-6 h-6 rounded-full flex items-center justify-center bg-opacity-70 backdrop-blur-lg absolute">
                              <FontAwesomeIcon
                                icon={faMessage}
                                className="text-xs rounded-full text-indigo-500"
                                fixedWidth
                              />
                            </div>
                          </div>

                          <div className="flex-col overflow-hidden ">
                            <h2 className=" line-clamp-3 leading-tight">
                              <b>Lê Trực</b> sent you a new message
                            </h2>
                            <small className="text-indigo-400">
                              30 minutes ago
                            </small>
                          </div>
                        </div>

                        <div className="flex gap-2 px-2 w-full mt-2 hover:bg-slate-900 py-2 rounded-xl hover:bg-opacity-40 duration-300 cursor-pointer relative">
                          <div className="flex min-w-[4rem] h-16 justify-end">
                            <img
                              src={require("./image/ava.jpg")}
                              className="rounded-full object-cover min-w-[4rem] h-16 cursor-pointer "
                              alt=""
                            />
                            <div className="self-end z-30 bg-slate-900 text-center w-6 h-6 rounded-full flex items-center justify-center bg-opacity-70 backdrop-blur-lg absolute">
                              <FontAwesomeIcon
                                icon={faMessage}
                                className="text-xs rounded-full text-indigo-500"
                                fixedWidth
                              />
                            </div>
                          </div>

                          <div className="flex-col overflow-hidden ">
                            <h2 className=" line-clamp-3 leading-tight">
                              <b>Lê Trực</b> sent you a new message
                            </h2>
                            <small className="text-indigo-400">
                              30 minutes ago
                            </small>
                          </div>
                        </div>

                        <div className="flex gap-2 px-2 w-full mt-2 hover:bg-slate-900 py-2 rounded-xl hover:bg-opacity-40 duration-300 cursor-pointer relative">
                          <div className="flex min-w-[4rem] h-16 justify-end">
                            <img
                              src={require("./image/ava.jpg")}
                              className="rounded-full object-cover min-w-[4rem] h-16 cursor-pointer "
                              alt=""
                            />
                            <div className="self-end z-30 bg-slate-900 text-center w-6 h-6 rounded-full flex items-center justify-center bg-opacity-70 backdrop-blur-lg absolute">
                              <FontAwesomeIcon
                                icon={faMessage}
                                className="text-xs rounded-full text-indigo-500"
                                fixedWidth
                              />
                            </div>
                          </div>

                          <div className="flex-col overflow-hidden ">
                            <h2 className=" line-clamp-3 leading-tight">
                              <b>Lê Trực</b> sent you a new message
                            </h2>
                            <small className="text-indigo-400">
                              30 minutes ago
                            </small>
                          </div>
                        </div>

                        <div className="flex gap-2 px-2 w-full mt-2 hover:bg-slate-900 py-2 rounded-xl hover:bg-opacity-40 duration-300 cursor-pointer relative">
                          <div className="flex min-w-[4rem] h-16 justify-end">
                            <img
                              src={require("./image/ava.jpg")}
                              className="rounded-full object-cover min-w-[4rem] h-16 cursor-pointer "
                              alt=""
                            />
                            <div className="self-end z-30 bg-slate-900 text-center w-6 h-6 rounded-full flex items-center justify-center bg-opacity-70 backdrop-blur-lg absolute">
                              <FontAwesomeIcon
                                icon={faMessage}
                                className="text-xs rounded-full text-indigo-500"
                                fixedWidth
                              />
                            </div>
                          </div>

                          <div className="flex-col overflow-hidden ">
                            <h2 className=" line-clamp-3 leading-tight">
                              <b>Lê Trực</b> sent you a new message
                            </h2>
                            <small className="text-indigo-400">
                              30 minutes ago
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                >
                  <NavItem
                    Class={
                      menuSelected === 2 ? "bg-slate-900 bg-opacity-50" : ""
                    }
                    id={2}
                    icon={farFaBell}
                    Click={(e) => {
                      setMenuItemSelected(e);
                    }}
                  />
                </Tippy>

                <NavItem
                  Class={menuSelected === 3 ? "bg-slate-900 bg-opacity-50" : ""}
                  id={3}
                  icon={farFaAddressBook}
                  Click={(e) => {
                    setMenuItemSelected(e);
                  }}
                />
              </div>

              {/* bottom nav */}
              <div className="flex flex-col w-full items-center text-white">
                <Tippy
                  placement="right"
                  render={(attrs) => (
                    <div
                      {...attrs}
                      className=" h-9 flex items-center text-white  p-3 rounded-3xl bg-gradient-to-r from-purple-800 to-indigo-600 tooltip"
                    >
                      <p>Cloud Data</p>
                    </div>
                  )}
                >
                  <div
                    className="w-full h-14 flex items-center justify-center hover:bg-slate-900 duration-500"
                    onClick={() => {
                      showCloud(!cloud);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faCloud}
                      className="w-14 h-14 text-xl cursor-pointer "
                      fixedWidth
                    />
                  </div>
                </Tippy>

                <Tippy
                  placement="right"
                  render={(attrs) => (
                    <div
                      {...attrs}
                      className=" h-9 flex items-center text-white  p-3 rounded-3xl bg-gradient-to-r from-purple-800 to-indigo-600 tooltip"
                    >
                      <p>Tools</p>
                    </div>
                  )}
                >
                  <div className="w-full h-14 flex items-center justify-center hover:bg-slate-900 duration-500">
                    <FontAwesomeIcon
                      icon={faTools}
                      className="w-14 h-14 text-xl cursor-pointer "
                      fixedWidth
                    />
                  </div>
                </Tippy>

                <Tippy
                  placement="right"
                  render={(attrs) => (
                    <div
                      {...attrs}
                      className=" h-9 flex items-center text-white  p-3 rounded-3xl bg-gradient-to-r from-purple-800 to-indigo-600 tooltip"
                    >
                      <p>Settings</p>
                    </div>
                  )}
                >
                  <div
                    className="w-full h-14 flex items-center justify-center hover:bg-slate-900 duration-500"
                    onClick={() => {
                      showSetting(true);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faGear}
                      className="w-14 h-14 text-xl cursor-pointer"
                      fixedWidth
                    />
                  </div>
                </Tippy>
                <Tippy
                  placement="right"
                  render={(attrs) => (
                    <div
                      {...attrs}
                      className=" h-9 flex items-center text-white  p-3 rounded-3xl bg-gradient-to-r from-purple-800 to-indigo-600 tooltip"
                    >
                      <p>Logout</p>
                    </div>
                  )}
                >
                  <div
                    className="w-full h-14 flex items-center justify-center hover:bg-slate-900 rounded-bl-3xl duration-500"
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faSignOut}
                      className="w-14 h-14 text-xl cursor-pointer"
                      fixedWidth
                    />
                  </div>
                </Tippy>
              </div>
            </div>

            <div
              className={`duration-300 flex-col w-full h-full xl:flex xl:w-96 ${
                showChat ? `hidden` : `flex`
              }`}
              ref={listUserChatRef}
            >
              <div className="w-full xl:w-96 min-h-full dark:bg-slate-900 dark:bg-opacity-70 backdrop-blur-lg p-4 flex flex-col xl:rounded-none sm:rounded-l-none rounded-3xl">
                {/*  Search Box */}
                <div className="flex items-center gap-3">
                  <div className="rounded-3xl w-full h-10 dark:bg-slate-900 dark:bg-opacity-20 backdrop-blur-lg flex items-center p-4 text-white group">
                    <FontAwesomeIcon
                      icon={faSearch}
                      className="text-slate-400 group-focus-within:text-white duration-300"
                    />
                    <input
                      className="bg-transparent w-full outline-none mx-3 "
                      placeholder="Search..."
                    />
                  </div>
                  <Tippy
                    placement={"bottom"}
                    render={(attrs) => (
                      <div className=" h-9 flex items-center text-white  p-3 rounded-3xl bg-gradient-to-r from-purple-800 to-indigo-600 tooltip">
                        <p>Add friend</p>
                      </div>
                    )}
                  >
                    <div className="text-white">
                      <FontAwesomeIcon
                        icon={faUserPlus}
                        className="text-lg cursor-pointer hover:text-indigo-500 duration-500"
                        onClick={() => {
                          showaddFriend(!addFriend);
                        }}
                      />
                    </div>
                  </Tippy>

                  <Tippy
                    placement={"bottom-end"}
                    render={(attrs) => (
                      <div className=" h-9 flex items-center text-white  p-3 rounded-3xl bg-gradient-to-r from-purple-800 to-indigo-600 tooltip">
                        <p>Create group</p>
                      </div>
                    )}
                  >
                    <div className="text-white">
                      <FontAwesomeIcon
                        icon={faPeopleGroup}
                        className="text-lg cursor-pointer hover:text-indigo-500 duration-500"
                      />
                    </div>
                  </Tippy>
                </div>

                {/* List User Message */}
                <div className="flex flex-col mt-3 w-full h-full gap-2 overflow-hidden hover:overflow-auto relative select-none">
                  <Suspense fallback={<LoadingUserChat />}>
                    <UserChat
                      class={userChat === 1 ? "bg-slate-900" : ""}
                      id={1}
                      Click={(e) => {
                        setShowChat(true);
                        setUserChat(e);
                      }}
                    />
                  </Suspense>
                </div>

                <div className="flex self-end w-full  bg-slate-800 bg-opacity-10 backdrop-blur-xl rounded-3xl mt-5 justify-between px-8 sm:hidden items-center">
                  <FontAwesomeIcon
                    icon={farFaMessage}
                    className="w-14 h-14 text-lg text-white "
                    fixedWidth
                  />
                  <FontAwesomeIcon
                    icon={farFaBell}
                    className="w-14 h-14 text-lg text-white "
                    fixedWidth
                  />
                  <div className="flex w-16 h-16 -translate-y-5 justify-center bg-slate-900 bg-opacity-60 backdrop-blur-3xl items-center rounded-full">
                    <img
                      src={require("./image/ava.jpg")}
                      className="rounded-full object-cover w-14 h-14 cursor-pointer  p-1 drop-shadow-2xl"
                      alt=""
                    />
                  </div>
                  <FontAwesomeIcon
                    icon={faCloud}
                    className="w-14 h-14 text-lg text-white "
                    fixedWidth
                  />
                  <FontAwesomeIcon
                    icon={faTools}
                    className="w-14 h-14 text-lg text-white "
                    fixedWidth
                  />
                </div>
              </div>
            </div>
            {showChat ? (
              <div className={`w-full h-full gap-3 relative flex`}>
                <div className="flex-col w-full h-full">
                  {/* Chat Body */}
                  <div className="dark:bg-slate-900 w-full h-[93%] md:min-w-[35rem] dark:bg-opacity-60 dark:backdrop-blur-lg rounded-3xl flex flex-col p-3 sm:rounded-l-none rounded-b-none duration-300">
                    <div className=" w-full h-20  flex items-center gap-3 justify-between z-50">
                      <div className="flex items-center gap-3">
                        <FontAwesomeIcon
                          icon={faArrowLeft}
                          fixedWidth
                          className="text-white text-xl cursor-pointer duration-300 hover:text-indigo-600 sm:hidden"
                          onClick={() => {
                            closeChat();
                          }}
                        />
                        <img
                          alt=""
                          className=" rounded-full object-cover w-16 h-16"
                          src={require("./image/giphy.jpg")}
                        />
                        <div className="flex flex-col text-white">
                          <h4 className="leading-none">Lê Trực</h4>
                          <small className="text-slate-300">
                            Đang hoạt động
                          </small>
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
                      className="w-full h-full flex flex-col mt-3 gap-2 overflow-hidden hover:overflow-auto"
                      onScroll={(e) => {
                        if (e.currentTarget.scrollTop === 0) {
                          showScrollButton(true);
                        } else {
                          showScrollButton(false);
                        }
                      }}
                      ref={bodyChatRef}
                    >
                      {scrollDown ? (
                        <div className="flex absolute w-full items-center justify-center bottom-0 mb-5 duration-300 transition-all">
                          <div
                            className="h-10 w-10 text-white z-30 bg-slate-900 justify-center items-center flex rounded-full self-center hover:cursor-pointer transition-all duration-300 hover:opacity-70 animate-bounce"
                            onClick={() => scrolltoBottom()}
                          >
                            <FontAwesomeIcon icon={faArrowDown} />
                          </div>
                        </div>
                      ) : null}
                      <Message type="recived" />
                      <Message type="recived" />
                      <Message type="recived" />
                      <Message type="send" />
                      <Message type="recived" />
                    </div>
                  </div>
                  {/* Chat Footer */}
                  <div className="dark:bg-slate-900 w-full  h-[7%] dark:bg-opacity-75 dark:backdrop-blur-lg rounded-3xl flex items-center text-white gap-2 px-5 relative rounded-t-none sm:rounded-bl-none duration-300">
                    <div className="flex items-center justify-center  rounded-2xl cursor-pointer text-xl h-10 w-10 duration-300">
                      <FontAwesomeIcon
                        icon={faImage}
                        fixedWidth
                        className="hover:text-indigo-600 duration-300"
                      />
                    </div>
                    <div className="flex items-center justify-center  rounded-2xl cursor-pointer text-xl  h-10 w-10  duration-300">
                      <FontAwesomeIcon
                        icon={faSmile}
                        fixedWidth
                        className="hover:text-indigo-600 duration-300"
                      />
                    </div>
                    <div className="w-full  flex items-center h-full py-1 duration-300">
                      <input
                        className="bg-transparent w-full outline-none text-white"
                        placeholder="Type your message..."
                      />
                    </div>
                    <div className="flex items-center justify-center rounded-2xl cursor-pointer text-xl h-10 w-10  duration-300">
                      <FontAwesomeIcon
                        icon={faPaperPlane}
                        fixedWidth
                        className="hover:text-indigo-600 duration-300"
                      />
                    </div>
                  </div>
                </div>
                {/* Detail chat */}
                {detailChat ? (
                  <div className="absolute right-0 2xl:relative flex flex-col h-full w-96 min-w-[24rem] dark:bg-slate-900 dark:bg-opacity-60 dark:backdrop-blur-lg rounded-3xl p-3 items-center gap-2 detailChat overflow-y-auto select-none">
                    <FontAwesomeIcon
                      icon={faClose}
                      fixedWidth
                      className="text-white absolute left-0 p-4 hover:text-red-600 cursor-pointer transition-all duration-300 2xl:hidden"
                      onClick={() => {
                        showDetail(!detailChat);
                      }}
                    />
                    <img
                      src={require("./image/ava.jpg")}
                      className="rounded-full object-cover w-20 h-20 cursor-pointer"
                      alt=""
                    />
                    <h2 className="text-white font-semibold">Lê Trực</h2>

                    <div className="flex items-center justify-center gap-9 my-3">
                      <div className="flex flex-col text-white items-center justify-center w-14 cursor-pointer group">
                        <div className="flex text-white text-lg bg-slate-900 w-9 h-9 rounded-full items-center justify-center mb-2 group-hover:bg-slate-800 duration-300">
                          <FontAwesomeIcon icon={fasFaBell} fixedWidth />
                        </div>
                        <h2 className="text-sm text-center select-none">
                          Turn off notify
                        </h2>
                      </div>

                      <div className="flex flex-col text-white items-center justify-center w-14 cursor-pointer group">
                        <div className="flex text-white text-lg bg-slate-900 w-9 h-9 rounded-full items-center justify-center mb-2 group-hover:bg-slate-800 duration-300">
                          <FontAwesomeIcon icon={faPeopleGroup} fixedWidth />
                        </div>
                        <h2 className="text-sm text-center select-none">
                          Create group
                        </h2>
                      </div>

                      <div className="flex flex-col text-white items-center justify-center w-14 cursor-pointer group">
                        <div className="flex text-white text-lg bg-slate-900 w-9 h-9 rounded-full items-center justify-center mb-2 group-hover:bg-slate-800 duration-300">
                          <FontAwesomeIcon icon={faSearch} fixedWidth />
                        </div>
                        <h2 className="text-sm text-center select-none">
                          Find message
                        </h2>
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
                          className={`${
                            listImg ? "" : "-rotate-90"
                          } duration-300`}
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
                          className={`${
                            listFile ? "" : "-rotate-90"
                          } duration-300`}
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
                ) : null}
              </div>
            ) : (
              <div
                className={`select-none w-full h-full gap-3 relative hidden xl:flex duration-300`}
              >
                <div className="dark:bg-slate-900 w-full h-full md:min-w-[35rem] dark:bg-opacity-60 dark:backdrop-blur-lg rounded-3xl flex flex-col p-3 sm:rounded-l-none duration-300 justify-center items-center">
                  <div className="flex flex-col justify-center items-center ">
                    <img
                      src={require("../../image/chat3d.png")}
                      alt=""
                      className="w-96"
                    />
                    <p className="font-bold text-transparent text-xl bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-400 text-center">
                      Free and secure messaging <br /> with RSA end-to-end
                      encryption technology
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
