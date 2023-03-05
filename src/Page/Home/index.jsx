import "../Home/home.css";
import React, { useState, useRef, useEffect, useContext } from "react";
import { createBrowserHistory } from "history";
import { useNavigate } from "react-router-dom";

import {
  faGear,
  faSearch,
  faPhone,
  faCloud,
  faTools,
  faPeopleGroup,
  faEnvelope,
  faBell as fasFaBell,
  faUserPlus,
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
import AddFriend from "../../components/Popup/Friend";
import { AppContext } from "../../Context/AppContext";
import UpdateUserAvatar from "../../components/Setting/components/UpdateUser/Avatar";

import FriendsList from "../../components/FriendsList";
import Notification from "../../components/Notification";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import HistoryChat from "../../components/HistoryChat";
import BodyChat from "../../components/Chat/BodyChat";

const history = createBrowserHistory();

library.add(farFaBell, fasFaBell, farFaMessage);

export default function Home() {
  const navigate = useNavigate();
  const [menuSelected, setMenuItemSelected] = useState(1);
  const [previewProfile, showPreview] = useState(false);
  const [setting, showSetting] = useState(false);
  const [addFriend, showaddFriend] = useState(false);
  const [cloud, showCloud] = useState(false);

  const [blur, setBlur] = useState(false);
  /*   const [userData, setUserData] = useState({}); */

  const [mousePosition, setMousePosition] = useState(0);

  const listUserChatRef = useRef(null);
  const container = useRef(null);

  const context = useContext(AppContext);

  const closeChat = () => {
    const styless = window
      .getComputedStyle(listUserChatRef.current)
      .getPropertyValue("display");
    if (styless === "none") {
      context.setShowChat(!context.showChat);
    }
  };

  /*  useEffect(() => {
    if (bodyChatRef.current) {
      setTimeout(() => {
        
      }, 300);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showChat !== false]); */

  useEffect(() => {
    history.replace("/");
    context.loadUserData();
    document.addEventListener("visibilitychange", () => {
      setMousePosition(0);
    });
    TimeAgo.addDefaultLocale(en);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (context.background) {
      container.current.style.backgroundImage = `url('${process.env.REACT_APP_CDN_URL}/images/bg${context.background}')`;
    }
  }, [context.background]);

  useEffect(() => {
    if (
      context?.userSetting?.autolock !== 0 &&
      context?.userSetting?.autolock !== undefined
    ) {
      const timeout = setTimeout(() => {
        setBlur(true);
      }, 600_000);
      return () => {
        clearTimeout(timeout);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mousePosition]);

  return (
    <div
      className={`dark w-screen h-screen bg-gradient-to-l from-purple-800 to-indigo-600  flex justify-center items-center main`}
      ref={container}
      onMouseMove={(e) => {
        if (
          context?.userSetting?.autolock !== 0 &&
          context?.userSetting?.autolock !== undefined
        ) {
          setBlur(false);
          setMousePosition(e.clientX);
        }
      }}
    >
      {context.isLoading ? (
        <img alt="" src={require("../../image/loading.gif")} />
      ) : (
        <React.Fragment>
          {context.updateProfile ? <UpdateUserAvatar /> : null}
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
                  render={() => <Notification />}
                >
                  <div className="flex relative w-full items-center justify-center select-none">
                    <div
                      className={`absolute w-4 h-4 bg-indigo-600 rounded-full text-center justify-center items-center text-xs right-5 top-2 ${
                        context.countNotification > 0 ? "flex" : "hidden"
                      }`}
                    >
                      {context.countNotification}
                    </div>
                    <NavItem
                      Class={
                        menuSelected === 2 ? "bg-slate-900 bg-opacity-50" : ""
                      }
                      id={2}
                      icon={farFaBell}
                      Click={(e) => {
                        context.readNotification();
                        setMenuItemSelected(e);
                      }}
                    />
                  </div>
                </Tippy>

                <Tippy
                  onClickOutside={() => {
                    setMenuItemSelected(1);
                  }}
                  visible={menuSelected === 3 ? true : false}
                  appendTo={document.body}
                  interactive="true"
                  placement={"right-start"}
                  render={() => <FriendsList />}
                >
                  <NavItem
                    Class={
                      menuSelected === 3 ? "bg-slate-900 bg-opacity-50" : ""
                    }
                    id={3}
                    icon={farFaAddressBook}
                    Click={(e) => {
                      setMenuItemSelected(e);
                    }}
                  />
                </Tippy>
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
                      context.ClearData();
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
                context.showChat ? `hidden` : `flex`
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
                <HistoryChat />

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
            {context.showChat ? (
              <BodyChat />
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
        </React.Fragment>
      )}
    </div>
  );
}
