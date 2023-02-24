import { createContext, useState, useEffect } from "react";
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
  const [avatar, setAvatar] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      loadSetting();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  const loadSetting = () => {
    const settingEncoded = userData.setting;
    const userSettings = atob(settingEncoded);
    setUsername(userData.username);
    setUseremail(userData.email);
    setUserSetting(JSON.parse(userSettings));
    setBackground(JSON.parse(userSettings).theme);
    setAvatar(
      `${process.env.REACT_APP_CDN_URL}/images/avatar${
        JSON.parse(userSettings).avatar
      }`
    );
    setLoading(false);
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

  const value = {
    userSetting,
    userData,
    username,
    email,
    avatar,
    background,
    setUsername,
    setUseremail,
    loadUserData,
    SaveSetting,
    isLoading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
