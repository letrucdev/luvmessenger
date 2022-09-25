import "../Home/home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  faGear,
  faImage,
  faSmile,
  faPaperPlane,
  faSearch,
  faBars,
  faPhone,
  faVideo,
  faCloud,
  faTools,
  faMessage,
  faAddressBook,
  faPeopleGroup,
  faEnvelope,
  faBell as fasFaBell,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

import Tippy from "@tippyjs/react/headless";
import "tippy.js/animations/scale.css";

/* import { useSpring, motion } from "framer-motion"; */

import { library } from "@fortawesome/fontawesome-svg-core";

import {
  faBell as farFaBell,
  faMessage as farFaMessage,
  faAddressBook as farFaAddressBook,
} from "@fortawesome/free-regular-svg-icons";

import { useEffect, useState } from "react";

import UserChat from "../../components/Chat/UserChat";
import NavItem from "../../components/Nav/NavItem";
import Modal from "../../components/Modal";

library.add(farFaBell, fasFaBell, farFaMessage);

export default function Home() {
  const [userChat, setUserChat] = useState(1);
  const [menuSelected, setMenuItemSelected] = useState(1);
  const [modal, showModal] = useState(false);

  /* const springConfig = { damping: 15, stiffness: 300 };
  const initialScale = 0.5;
  const opacity = useSpring(0, springConfig);
  const scale = useSpring(initialScale, springConfig);

  function onMount() {
    setTimeout(() => {
      scale.set(1);
      opacity.set(1);
    }, 200);
  }

  function onHide({ unmount }) {
    const cleanup = scale.onChange((value) => {
      if (value <= initialScale) {
        cleanup();
        unmount();
      }
    });
    scale.set(initialScale);
    opacity.set(0);
  } */

  /*   const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false); */

  return (
    <div className="dark w-screen h-screen bg-gradient-to-l from-purple-800 to-indigo-600  flex justify-center items-center main">
      {modal ? (
        <Modal
          exit={() => {
            showModal(!modal);
          }}
        />
      ) : null}
      <div className="flex items-center p-5 w-full h-full justify-center">
        <div className="flex flex-col w-24 h-full max-w-[5rem] min-w-[5rem] dark:bg-slate-900 dark:bg-opacity-75 backdrop-blur-lg rounded-3xl rounded-r-none items-center  justify-between">
          <div className="flex flex-col w-full text-white items-center">
            <Tippy
              appendTo={document.body}
              interactive="true"
              placement={"right-start"}
              render={(attrs) => (
                <div
                  className="flex items-center flex-col-reverse text-white rounded-3xl bg-gradient-to-r from-purple-800 to-indigo-600  min-h-[16rem]  h-80  w-72 ml-4 relative bg-opacity-40 profilePreview"
                  {...attrs}
                >
                  <div className=" bg-slate-900 w-full h-[80%]  rounded-b-3xl bg-opacity-60 dark:bg-opacity-60 backdrop-blur-lg flex flex-col items-center">
                    <div className="flex flex-col items-center justify-center bg-gradient-to-r from-purple-800 to-indigo-600 rounded-full w-24 h-24 -translate-y-12 p-2">
                      <img
                        src={require("./image/ava.jpg")}
                        className="rounded-full object-cover w-20 h-20 cursor-pointer"
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col justify-center -translate-y-12 w-[90%]">
                      <h4 className="text-lg mt-1 font-semibold text-center mb-3">
                        Lê Trực
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
                            <h6>test@gmail.com</h6>
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
              <img
                src={require("./image/ava.jpg")}
                className="rounded-full object-cover w-14 h-14 my-4 cursor-pointer"
                alt=""
              />
            </Tippy>

            <NavItem
              Class={menuSelected === 1 ? "bg-slate-900" : ""}
              id={1}
              icon={farFaMessage}
              Click={(e) => {
                setMenuItemSelected(e);
              }}
            />

            <Tippy
              onClickOutside={() => {setMenuItemSelected(1)}}
              visible={menuSelected === 2 ? true : false}
              appendTo={document.body}
              interactive="true"
              placement={"right-start"}
              render={(attrs) => (
                <div
                  className="p-3 flex-col text-white bg-slate-900 rounded-3xl bg-opacity-60 backdrop-blur-lg notification"
                  {...attrs}
                >
                  <h2 className="text-2xl font-semibold mb-2 px-2">
                    Notification
                  </h2>
                  <div className="flex-col hover:overflow-auto overflow-hidden max-h-96 max-w-[28rem] w-96">
                    <div className="flex gap-2 px-2 w-full mt-2 hover:bg-slate-900 py-2 rounded-xl hover:bg-opacity-40 duration-300 cursor-pointer">
                      <div className="flex min-w-[4rem] h-16 justify-end">
                        <img
                          src={require("./image/ava.jpg")}
                          className="rounded-full object-cover min-w-[4rem] h-16 cursor-pointer absolute"
                          alt=""
                        />
                        <div className="self-end z-30 bg-slate-900 text-center w-6 h-6 rounded-full flex items-center justify-center bg-opacity-70 backdrop-blur-lg">
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
                    <div className="flex gap-2 px-2 w-full mt-2 hover:bg-slate-900 py-2 rounded-xl hover:bg-opacity-40 duration-300 cursor-pointer">
                      <div className="flex min-w-[4rem] h-16 justify-end">
                        <img
                          src={require("./image/ava.jpg")}
                          className="rounded-full object-cover min-w-[4rem] h-16 cursor-pointer absolute"
                          alt=""
                        />
                        <div className="self-end z-30 bg-slate-900 text-center w-6 h-6 rounded-full flex items-center justify-center bg-opacity-70 backdrop-blur-lg">
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
                Class={menuSelected === 2 ? "bg-slate-900" : ""}
                id={2}
                icon={farFaBell}
                Click={(e) => {
                  setMenuItemSelected(e);
                }}
              />
            </Tippy>

            <NavItem
              Class={menuSelected === 3 ? "bg-slate-900" : ""}
              id={3}
              icon={farFaAddressBook}
              Click={(e) => {
                setMenuItemSelected(e);
              }}
            />
          </div>

          <div className="flex flex-col w-full items-center text-white">
            <Tippy
              placement="right"
              render={(attrs) => (
                <div
                  {...attrs}
                  className=" h-9 flex items-center text-white  p-3 rounded-3xl bg-gradient-to-r from-purple-800 to-indigo-600 "
                >
                  <p>Cloud Data</p>
                </div>
              )}
            >
              <div className="w-full h-14 flex items-center justify-center hover:bg-slate-900 duration-500">
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
                  className=" h-9 flex items-center text-white  p-3 rounded-3xl bg-gradient-to-r from-purple-800 to-indigo-600"
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
                  className=" h-9 flex items-center text-white  p-3 rounded-3xl bg-gradient-to-r from-purple-800 to-indigo-600 "
                >
                  <p>Settings</p>
                </div>
              )}
            >
              <div
                className="w-full h-14 flex items-center justify-center hover:bg-slate-900 rounded-bl-3xl duration-500"
                onClick={() => {
                  showModal(true);
                }}
              >
                <FontAwesomeIcon
                  icon={faGear}
                  className="w-14 h-14 text-xl cursor-pointer"
                  fixedWidth
                />
              </div>
            </Tippy>
          </div>
        </div>

        <div className="flex flex-col w-96 h-full">
          <div className=" w-96 min-h-full dark:bg-slate-900 dark:bg-opacity-40 bg-opacity-40 backdrop-blur-lg p-4 flex flex-col rounded-none">
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
                  <div className=" h-9 flex items-center text-white  p-3 rounded-3xl bg-gradient-to-r from-purple-800 to-indigo-600">
                    <p>Add friend</p>
                  </div>
                )}
              >
                <div className="text-white">
                  <FontAwesomeIcon
                    icon={faUserPlus}
                    className="text-lg cursor-pointer hover:text-indigo-500 duration-500"
                  />
                </div>
              </Tippy>

              <Tippy
                placement={"bottom-end"}
                render={(attrs) => (
                  <div className=" h-9 flex items-center text-white  p-3 rounded-3xl bg-gradient-to-r from-purple-800 to-indigo-600">
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

            {/* List Message */}
            <div className="flex flex-col mt-3 w-full gap-2 overflow-hidden hover:overflow-auto relative ">
              <UserChat
                class={userChat === 1 ? "bg-slate-900" : ""}
                id={1}
                Click={(e) => {
                  setUserChat(e);
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full h-full">
          <div className="dark:bg-slate-900 w-full h-[93%] min-w-[50rem] dark:bg-opacity-60 dark:backdrop-blur-lg rounded-3xl flex flex-col p-3 rounded-l-none rounded-b-none">
            <div className=" w-full h-20  flex items-center gap-3 justify-between">
              <div className="flex items-center gap-3">
                <img
                  alt=""
                  className=" rounded-full object-cover w-16 h-16"
                  src={require("./image/ava.jpg")}
                />
                <div className="flex flex-col text-white">
                  <h4 className="leading-none">Lê Trực</h4>
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
                />
              </div>
            </div>
            <div className="w-full flex flex-col mt-3 gap-2 overflow-hidden hover:overflow-auto">
              <div className="w-fit max-w-sm rounded-3xl rounded-bl-none bg-slate-900 dark:bg-opacity-50 backdrop-blur-lg text-white flex items-center message-recived">
                <p className="max-w-sm break-all p-4 w-auto">
                  Paragraphs are the building blocks of papers. Many students
                  define paragraphs in terms of length: a paragraph is a group
                  of at least five sentences, a paragraph is half a page long,
                  etc. In reality, though, the unity and coherence of ideas
                  among sentences is what constitutes a paragraph. A paragraph
                  is defined as “a group of sentences or a single sentence that
                  forms a unit” (Lunsford and Connors 116). Length and
                  appearance do not determine whether a section in a paper is a
                  paragraph. For instance, in some styles of writing,
                  particularly journalistic styles, a paragraph can be just one
                  sentence long. Ultimately, a paragraph is a sentence or group
                  of sentences that support one main idea. In this handout, we
                  will refer to this as the “controlling idea,” because it
                  controls what happens in the rest of the paragraph.
                </p>
              </div>
              <div className="w-fit max-w-sm rounded-3xl rounded-br-none bg-slate-900 dark:bg-opacity-50 backdrop-blur-lg text-white flex items-center message-send self-end">
                <p className="max-w-sm break-all p-4 w-auto">
                  There are many different ways to organize a paragraph. The
                  organization you choose will depend on the controlling idea of
                  the paragraph. Below are a few possibilities for organization,
                  with links to brief examples: Narration: Tell a story.
                </p>
              </div>
              <div className="w-fit max-w-sm rounded-3xl rounded-bl-none bg-slate-900 dark:bg-opacity-50 backdrop-blur-lg text-white flex items-center message-recived">
                <p className="max-w-sm break-all p-4 w-auto">
                  Paragraphs are the building blocks of papers. Many students
                  define paragraphs in terms of length: a paragraph is a group
                  of at least five sentences, a paragraph is half a page long,
                  etc. In reality, though, the unity and coherence of ideas
                  among sentences is what constitutes a paragraph. A paragraph
                  is defined as “a group of sentences or a single sentence that
                  forms a unit” (Lunsford and Connors 116). Length and
                  appearance do not determine whether a section in a paper is a
                  paragraph. For instance, in some styles of writing,
                  particularly journalistic styles, a paragraph can be just one
                  sentence long. Ultimately, a paragraph is a sentence or group
                  of sentences that support one main idea. In this handout, we
                  will refer to this as the “controlling idea,” because it
                  controls what happens in the rest of the paragraph.
                </p>
              </div>
              <div className="w-fit max-w-sm rounded-3xl rounded-br-none bg-slate-900 dark:bg-opacity-50 backdrop-blur-lg text-white flex items-center message-send self-end">
                <p className="max-w-sm break-all p-4 w-auto">
                  There are many different ways to organize a paragraph. The
                  organization you choose will depend on the controlling idea of
                  the paragraph. Below are a few possibilities for organization,
                  with links to brief examples: Narration: Tell a story.
                </p>
              </div>
            </div>
          </div>

          <div className="dark:bg-slate-900 w-full  h-[7%] max-h-[7%] dark:bg-opacity-75 dark:backdrop-blur-lg rounded-3xl flex items-center text-white gap-2 px-5 relative rounded-t-none rounded-bl-none">
            <div className="flex items-center justify-center  rounded-2xl cursor-pointer text-xl h-10 w-10 hover:bg-indigo-500 duration-300">
              <FontAwesomeIcon icon={faImage} fixedWidth />
            </div>
            <div className="flex items-center justify-center  rounded-2xl cursor-pointer text-xl  h-10 w-10 hover:bg-indigo-500 duration-300">
              <FontAwesomeIcon icon={faSmile} fixedWidth />
            </div>
            <div className="w-full  flex items-center h-10 py-1 duration-300">
              <input
                className="bg-transparent w-full outline-none text-white"
                placeholder="Type your message..."
              />
            </div>
            <div className="flex items-center justify-center rounded-2xl cursor-pointer text-xl h-10 w-10 hover:bg-indigo-500 duration-300">
              <FontAwesomeIcon icon={faPaperPlane} fixedWidth />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
