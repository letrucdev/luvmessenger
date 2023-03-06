import { createContext, useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [userSetting, setUserSetting] = useState({});
  const [background, setBackground] = useState();
  const [userData, setUserData] = useState();
  const [username, setUsername] = useState();
  const [email, setUseremail] = useState();
  const [avatar, setAvatar] = useState(null);
  const [updateProfile, showUpdateProfile] = useState(false);
  const [friendList, setFriendList] = useState([]);
  const [notification, setNotification] = useState([]);
  const [countNotification, setCountNotification] = useState(0);
  const [userChat, setUserChat] = useState({});
  const [historyChat, setHistoryChat] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [listMessage, setListMessage] = useState([]);

  const socketRef = useRef();

  const navigate = useNavigate();

  const initSocket = () => {
    socketRef.current = io(process.env.REACT_APP_SOCKET_SERVER);
    socketRef.current.emit("add_user_online", {
      user_id: userData.id,
      username: userData.username,
    });
    socketRef.current.on("connect", () => {
      /*  alert("OK") */
    });
    socketRef.current.on("server_msg", (data) => {
      alert(data);
    });
    socketRef.current.on("accepted_request", (data) => {
      loadFriendList();
    });
    socketRef.current.on("new_notification", (data) => {
      loadNotification();
    });
    socketRef.current.on("is_sent_request", (data) => {
      alert("This user sent you a friend request");
    });

    socketRef.current.on("is_read_notification", (data) => {
      setCountNotification(0);
    });

    socketRef.current.on("return_message", (data) => {
      setListMessage((prevArray) => [...prevArray, data]);
      getHistoryChat();
    });

    socketRef.current.on("new_history_chat", (data) => {
      getHistoryChat();
    });
  };

  useEffect(() => {
    if (userData) {
      initSocket();
      loadNotification();
      loadSetting();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  useEffect(() => {
    const count = notification.filter((obj) => obj.isRead === 0).length;
    setCountNotification(count);
  }, [notification]);

  useEffect(() => {
    if (Object.keys(userChat).length > 0) {
      getChat(userChat.id);
      setShowChat(true);
    }
    /*  alert(JSON.stringify(userChat)); */
  }, [userChat]);

  useEffect(() => {
    if (!showChat) {
      setListMessage([]);
      setUserChat({});
    }
  }, [showChat]);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("new_message_from_user", (data) => {
        if (data.sent_id === userChat.id) {
          setListMessage((prevArray) => [...prevArray, data]);
        }
      });
      return () => {
        socketRef.current.off("new_message_from_user");
      };
    }
  }, [userChat]);

  const ClearData = () => {
    /*     socketRef.current.off("return_message");
    socketRef.current.off("new_history_chat");
    socketRef.current.off("is_read_notification");
    socketRef.current.off("is_sent_request");
    socketRef.current.off("new_notification");
    socketRef.current.off("accepted_request"); */
    /*  socketRef.current.disconnect();
    setShowChat(false);
    setUserChat({});
    setListMessage([]);
    setHistoryChat([]);
    setUserData(); */
    socketRef.current.disconnect();
  };

  const loadSetting = () => {
    const settingEncoded = userData.setting;
    const userSettings = atob(settingEncoded);
    if (JSON.parse(userSettings).avatar !== "") {
      setAvatar(
        `${process.env.REACT_APP_CDN_URL}/images/avatar${
          JSON.parse(userSettings).avatar
        }`
      );
    } else {
      showUpdateProfile(true);
    }
    setUsername(userData.username);
    setUseremail(userData.email);
    setUserSetting(JSON.parse(userSettings));
    setBackground(JSON.parse(userSettings).theme);
    getHistoryChat();
    loadFriendList();
  };

  const loadUserData = async () => {
    const token = secureLocalStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios
      .get(`${process.env.REACT_APP_API_ENDPOINT}/getUserData`, config)
      .then(function (response) {
        setUserData(response.data);
      })
      .catch(function (error) {
        navigate("/login");
      });
  };

  const loadFriendList = async () => {
    const token = secureLocalStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios
      .get(`${process.env.REACT_APP_API_ENDPOINT}/getFriendList`, config)
      .then(function (response) {
        setFriendList(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        navigate("/login");
      });
  };

  const loadNotification = async () => {
    const token = secureLocalStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios
      .get(`${process.env.REACT_APP_API_ENDPOINT}/getNotification`, config)
      .then(function (response) {
        setNotification(response.data.notification);
      })
      .catch(function (error) {
        navigate("/login");
      });
  };

  const readNotification = async () => {
    socketRef.current.emit("read_notification", { userId: userData.id });
  };

  const getHistoryChat = async () => {
    const token = secureLocalStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios
      .get(`${process.env.REACT_APP_API_ENDPOINT}/getHistoryChat`, config)
      .then(function (response) {
        setHistoryChat(response.data.history_chat);
      })
      .catch(function (error) {
        /*  navigate("/login"); */
      });
  };

  const getChat = async (recivedId) => {
    const token = secureLocalStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios
      .get(`${process.env.REACT_APP_API_ENDPOINT}/getChat/${recivedId}`, config)
      .then(function (response) {
        setListMessage(response.data.list_message);
      })
      .catch(function (error) {
        /*  navigate("/login"); */
      });
  };

  const ReadMessage = (user_chat_id) => {
    socketRef.current.emit("read_message", {
      user_id: userData.id,
      user_chat_id: user_chat_id,
    });
  };

  const sendMessage = (to_user_id, content, files) => {
    if (files.length > 0) {
      uploadFiles(files)
        .then((result) => {
          result.forEach((element, index) => {
            if (index >= 1) {
              socketRef.current.emit("send_private_message", {
                from_user_id: userData.id,
                to_user_id: to_user_id,
                content: "",
                files: `/${userData.id}/${element.filename}`,
              });
            } else {
              socketRef.current.emit("send_private_message", {
                from_user_id: userData.id,
                to_user_id: to_user_id,
                content: content,
                files: `/${userData.id}/${element.filename}`,
              });
            }
          });
        })
        .catch((err) => {
          throw err;
        });
    } else {
      socketRef.current.emit("send_private_message", {
        from_user_id: userData.id,
        to_user_id: to_user_id,
        content: content,
        files: "",
      });
    }
  };

  const sendImages = (to_user_id, images) => {
    if (images.length > 0) {
      socketRef.current.emit("send_private_message_images", {
        from_user_id: userData.id,
        to_user_id: to_user_id,
        images: images,
      });
    }
    /*   socketRef.current.emit("send_private_message", {
      from_user_id: userData.id,
      to_user_id: to_user_id,
      content: content,
    }); */
  };

  const SaveSetting = async (setting) => {
    const token = secureLocalStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios
      .put(
        `${process.env.REACT_APP_API_ENDPOINT}/updateSetting`,
        { setting: JSON.stringify(setting) },
        config
      )
      .then((res) => {
        setUserSetting(setting);
        setBackground(userSetting.theme);
        setAvatar(
          `${process.env.REACT_APP_CDN_URL}/images/avatar${userSetting.avatar}`
        );
      })
      .catch((err) => {
        alert("Failed");
      });
  };

  const uploadFiles = async (files) => {
    const token = secureLocalStorage.getItem("accessToken");
    const formData = new FormData();
    files.forEach((element) => {
      formData.append("upload_files", element);
    });
    const config = {
      method: "post",
      url: `${process.env.REACT_APP_API_ENDPOINT}/uploadMultiFiles`,
      data: formData,
      timeout: 10000,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await axios(config)
      .then(async (res) => {
        /*         userSetting.avatar = `/${res.data.upload.filedir}`; */
        /*         await SaveSetting(userSetting); */
        return res.data.upload.files;
      })
      .catch((err) => {
        alert("Upload failed!");
        return false;
      });
  };

  const uploadImage = async (image) => {
    const token = secureLocalStorage.getItem("accessToken");
    const formData = new FormData();
    formData.append("upload_file", image);
    const config = {
      method: "post",
      url: `${process.env.REACT_APP_API_ENDPOINT}/upload`,
      data: formData,
      timeout: 10000,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await axios(config)
      .then(async (res) => {
        userSetting.avatar = `/${res.data.upload.filedir}`;
        await SaveSetting(userSetting);
        return true;
      })
      .catch((err) => {
        alert("Upload failed!");
        return false;
      });
  };

  const addFriend = async (to_user_id) => {
    const settingEncoded = userData.setting;
    const userSettings = atob(settingEncoded);
    socketRef.current.emit("add_friend", {
      to_user_id: to_user_id,
      from_user_id: userData.id,
      user_avatar: JSON.parse(userSettings).avatar,
      from_user: userData.username,
    });
  };

  const unFriend = async (friend_id) => {
    const token = secureLocalStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios
      .delete(
        `${process.env.REACT_APP_API_ENDPOINT}/unFriend/${friend_id}`,
        config
      )
      .then((res) => {
        if (res.data.unfriend > 0) {
          loadFriendList();
        }
      })
      .catch((err) => {
        return false;
      });
  };

  const deleteNotification = async (notifiId) => {
    const token = secureLocalStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await axios
      .delete(
        `${process.env.REACT_APP_API_ENDPOINT}/deleteNotification/${notifiId}`,
        config
      )
      .then((res) => {
        /* return true; */
        loadNotification();
      })
      .catch((err) => {
        return false;
      });
  };

  const acceptRequest = async (friendId, username, notifiId) => {
    const settingEncoded = userData.setting;
    const userSettings = atob(settingEncoded);
    const token = secureLocalStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios
      .post(
        `${process.env.REACT_APP_API_ENDPOINT}/acceptFriend`,
        { friendId: friendId, username: username, notifiId: notifiId },
        config
      )
      .then((res) => {
        if (res?.data?.accept) {
          loadNotification();
          socketRef.current.emit("accept_request", {
            to_user_id: res?.data?.friend_id,
            from_user_id: res?.data?.from_user_id,
            from_user_name: userData.username,
            from_user_avatar: JSON.parse(userSettings).avatar,
          });
        }

        /* alert(res.data); */
      })
      .catch((err) => {
        alert("Failed");
      });
  };

  const value = {
    userSetting,
    userData,
    addFriend,
    friendList,
    unFriend,
    acceptRequest,
    username,
    email,
    avatar,
    notification,
    setCountNotification,
    countNotification,
    readNotification,
    deleteNotification,
    getChat,
    getHistoryChat,
    setHistoryChat,
    historyChat,
    setUserChat,
    userChat,
    showChat,
    setShowChat,
    listMessage,
    ReadMessage,
    sendMessage,
    sendImages,
    showUpdateProfile,
    updateProfile,
    background,
    setUsername,
    setUseremail,
    loadUserData,
    SaveSetting,
    uploadImage,
    isLoading,
    ClearData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
