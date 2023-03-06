import LoadingUserChat from "../Chat/LoadingUserChat";
import React, { Suspense, lazy, useContext } from "react";
import { AppContext } from "../../Context/AppContext";
const UserChat = lazy(() => import("../../components/HistoryChat/UserChat"));

export default function HistoryChat() {
  const context = useContext(AppContext);
  return (
    <div className="flex flex-col mt-3 w-full h-full gap-2 overflow-hidden hover:overflow-auto relative select-none truncate text-ellipsis">
      {context.historyChat.map((element, index) => {
        return (
          <Suspense fallback={<LoadingUserChat />} key={index}>
            <UserChat
              key={index}
              id={element.user_chat_id}
              last_message={element.last_message}
              user_chat_name={element.username}
              user_chat_setting={JSON.parse(atob(element.setting))}
              at={element.at}
              isRead={element.isRead}
            />
          </Suspense>
        );
      })}
    </div>
  );
}
