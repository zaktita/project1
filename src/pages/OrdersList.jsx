import React, { useEffect, useState } from "react";
import { Button, Select, Space, Table, Tag } from "antd";
import { Input } from "antd";
import { AiFillEye } from "react-icons/ai";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNotificationContext } from "../Contexts/NotificationContext";
import axiosClient from "../axios_client";

const { Search } = Input;
const current = new Date();
const date = `${current.getDate()}/${
  current.getMonth() + 1
}/${current.getFullYear()}`;

function OrdersList() {


  const [Orders, setOrders] = useState([]);
  const [Status, setStatus] = useState("");
  const { addNotification } = useNotificationContext(); // Access the addNotification function

  // Function to fetchOrdersFromServer categories from the server
  const fetchOrdersFromServer = async () => {
    try {
      const response = await axiosClient.get("/orders");
      setOrders(response.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrdersFromServer();
  }, []);

  const updateStatus = async (id, value) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    };
    try {
      const response = await axiosClient.post(
        `/orders/${id}`,
        {
          status: value,
          _method: "PUT",
        },
        { headers: config.headers }
      );

      fetchOrdersFromServer();
    } catch (error) {
      console.log(error);
    }
  };
  const tagRender = (props) => {
    const { label, value, closable, onClose, color } = props;
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    return (
      <Tag
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{
          marginRight: 3,
          color: { color },
        }}
      >
        {label}
      </Tag>
    );
  };

  const columns = [
    {
      title: "Number",
      dataIndex: "order_id",
    },
    {
      title: "Date",
      dataIndex: "Date",
      render: () => date,
    },

    {
      title: "Items",
      dataIndex: "order_items_count",
    },
    {
      title: "Total",
      dataIndex: "total_price",
    },

    {
      title: "Paid",
      key: "Paid",
      render: () => <Tag color="success">Paid</Tag>,
    },

    {
      title: "Status",
      key: "Status",
      render: (text, record) => (
        <Select
          tagRender={tagRender}
          placeholder="Select an option"
          // optionFilterProp="children"
          onChange={(value) => {
            updateStatus(record.order_id, value);
          }}
          defaultValue={record.status}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={[
            {
              color: "warning",
              value: "Shipped",
              label: "Shipped",
            },
            {
              color: "warning",
              value: "Pending",
              label: "Pending",
            },
            {
              color: "success",
              value: "Delivered",
              label: "Delivered",
            },
          ]}
        />
      ),
    },
    {
      title: "details",
      key: "details",
      render: (text, record) => (
        <Link to={`/OrdersDetail/${record.order_id}`}>
          <AiFillEye size={20} />
        </Link>
      ),
    },
  ];

  return (
    <div className="mt-4">
      <h3 className="mb-5 title">Orders</h3>
      <Table columns={columns} dataSource={Orders} rowKey="order_id"/>
    </div>
  );
}

export default OrdersList;
