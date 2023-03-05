import React, { useContext, useEffect } from "react";
import { AppContext } from "../../Context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import ReactTimeAgo from "react-time-ago";

export default function Notification() {
  const context = useContext(AppContext);
  return (
    <div className="p-3 flex-col text-white bg-slate-900 rounded-3xl bg-opacity-60 backdrop-blur-lg notification hidden sm:flex">
      <h2 className="text-2xl font-semibold mb-2 px-2">Notification</h2>
      <div className="flex-col hover:overflow-auto overflow-hidden  max-w-[28rem] w-96 max-h-80">
        {context.notification.length > 0 ? (
          context.notification.map((element, index) => {
            return (
              <div
                key={index}
                className="flex gap-2 px-2 w-full mt-2 hover:bg-slate-900 py-2 rounded-xl hover:bg-opacity-40 duration-300 cursor-pointer relative"
              >
                {(function () {
                  switch (element.type) {
                    case 0:
                      return (
                        <React.Fragment>
                          <div className="flex min-w-[4rem] w-16 h-16 justify-end">
                            <img
                              src={`${process.env.REACT_APP_CDN_URL}/images/avatar/${element.image}`}
                              className="rounded-full object-cover min-w-[4rem] w-16 h-16 cursor-pointer "
                              alt=""
                            />
                            <div className="self-end z-30 bg-slate-900 text-center w-6 h-6 rounded-full flex items-center justify-center bg-opacity-70 backdrop-blur-lg absolute">
                              <FontAwesomeIcon
                                icon={faUserPlus}
                                className="text-xs rounded-full text-indigo-500"
                                fixedWidth
                              />
                            </div>
                          </div>
                          <div className="flex-col overflow-hidden ">
                            <h2 className=" line-clamp-3 leading-tight">
                              You have new friend request from{" "}
                              {element.from_user}
                            </h2>
                            <div className="flex gap-2 my-2">
                              <button
                                className="bg-gradient-to-l from-purple-800 to-indigo-600 p-2 rounded-lg font-semibold hover:bg-gradient-to-r duration-300 hover:opacity-80"
                                onClick={() => {
                                  context.acceptRequest(
                                    element.from_user_id,
                                    element.from_user,
                                    element.id
                                  );
                                }}
                              >
                                Accept
                              </button>
                              <button
                                className="duration-300 hover:text-red-500"
                                onClick={() => {
                                  context.deleteNotification(element.id);
                                }}
                              >
                                Decliend
                              </button>
                            </div>
                            <small className="text-indigo-400">
                              <ReactTimeAgo
                                date={
                                  element.at !== undefined
                                    ? Date.parse(element.at)
                                    : 0
                                }
                                locale="en-US"
                              />
                            </small>
                          </div>
                        </React.Fragment>
                      );
                    case 1:
                      return (
                        <React.Fragment>
                          <div className="flex justify-center items-center gap-2">
                            <div className="flex min-w-[4rem] w-16 h-16 justify-end">
                              <img
                                src={`${process.env.REACT_APP_CDN_URL}/images/avatar/${element.image}`}
                                className="rounded-full object-cover min-w-[4rem] w-16 h-16 cursor-pointer "
                                alt=""
                              />
                              <div className="self-end z-30 bg-slate-900 text-center w-6 h-6 rounded-full flex items-center justify-center bg-opacity-70 backdrop-blur-lg absolute">
                                <FontAwesomeIcon
                                  icon={faUserPlus}
                                  className="text-xs rounded-full text-indigo-500"
                                  fixedWidth
                                />
                              </div>
                            </div>
                            <div className="flex-col overflow-hidden">
                              <h2 className=" line-clamp-3 leading-tight">
                                {element.from_user} accepted your request
                              </h2>
                              <small className="text-indigo-400">
                                <ReactTimeAgo
                                  date={element.at}
                                  locale="en-US"
                                />
                              </small>
                            </div>
                          </div>
                        </React.Fragment>
                      );
                    default:
                      return (
                        <React.Fragment>
                          <div className="flex min-w-[4rem] w-16 h-16 justify-end">
                            <img
                              src={`${process.env.REACT_APP_CDN_URL}/images/avatar/${element.image}`}
                              className="rounded-full object-cover min-w-[4rem] w-16 h-16 cursor-pointer "
                              alt=""
                            />
                            <div className="self-end z-30 bg-slate-900 text-center w-6 h-6 rounded-full flex items-center justify-center bg-opacity-70 backdrop-blur-lg absolute">
                              <FontAwesomeIcon
                                icon={faUserPlus}
                                className="text-xs rounded-full text-indigo-500"
                                fixedWidth
                              />
                            </div>
                          </div>
                          <div className="flex-col overflow-hidden ">
                            <h2 className=" line-clamp-3 leading-tight">
                              {element.content}
                            </h2>
                            <small className="text-indigo-400">
                              <ReactTimeAgo date={element.at} locale="en-US" />
                            </small>
                          </div>
                        </React.Fragment>
                      );
                  }
                })()}
              </div>
            );
          })
        ) : (
          <p className="px-2 text-slate-500 font-light">There is no notification</p>
        )}
      </div>
    </div>
  );
}
