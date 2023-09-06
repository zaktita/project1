// NotificationContext.js

import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../axios_client";

const NotificationContext = createContext();

export const useNotificationContext = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotification = async() => {
    try {
      const response = await axiosClient.get("/notifications");
      setNotifications(response.data.notifications);
      // console.log(response.data.notifications);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchNotification();
  },[]);


  const removeNotification = async (index,id) => {
    const updatedNotifications = [...notifications];
    updatedNotifications.splice(index, 1);
    setNotifications(updatedNotifications);
    try {
      const response = await axiosClient.delete(`/notifications/${id}`);
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }


  const clearAllNotifications = async() => {
    setNotifications([]);
    try {
      const response = await axiosClient.delete(`/notifications`);
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const dateConverter = (datetoconvert) => {
    let date = new Date(datetoconvert);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let newDate = `${day}-${month}-${year}`;
    return newDate;
  };

  const contextValue = {
    notifications,
    fetchNotification,
    removeNotification,
    clearAllNotifications,
    dateConverter,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};
