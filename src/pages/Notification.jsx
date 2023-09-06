import React, { useState } from "react";
import "./notification.css";
import { useNotificationContext } from "../Contexts/NotificationContext";

function Notification({ order, onClose, index }) {
  const { dateConverter } = useNotificationContext();
  return (
    <div
      className="notification-item"
      style={{ backgroundColor: index % 2 === 0 ? "#c2def7" : "#e0f1fd" }}
    >
      <span>
        <h6>{dateConverter(order.created_at)}</h6>
        <h3>{order.index}</h3>
        <h3 onClick={onClose} className="clear">
          clear
        </h3>
      </span>
      <span>
        <h3>
          {" "}
          order N° #{order.order_id} | amount: {order.total_price} DH
        </h3>
      </span>
    </div>
  );
}

export default Notification;
