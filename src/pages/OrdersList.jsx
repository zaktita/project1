import React, { useEffect, useState } from "react";
import { Button, Select, Space, Table, Tag } from "antd";
import { Input } from "antd";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";

const { Search } = Input;
const current = new Date();
const date = `${current.getDate()}/${
  current.getMonth() + 1
}/${current.getFullYear()}`;

function OrdersList() {
  const onSearch = (value) => console.log(value);

  const [Orders, setOrders] = useState([]);
  const [Status, setStatus] = useState("");
  // Function to fetchOrdersFromServer categories from the server
  const fetchOrdersFromServer = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/orders");
      setOrders(response.data.orders);
      console.log(response.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrdersFromServer();
  }, []);


  const updateStatus = async (id, value) => {
    console.log(value);
    const config = {
      headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
      },
  };
    try {
      const response = await axios.post(
        `http://000000000:8000/api/orders/${id}`,
        {
          status: value,
          '_method': 'PUT'
        },
        { headers: config.headers}
      );
      console.log(response.data);
      fetchOrdersFromServer();
    } catch (error) {
      console.log(error);
    }
  }
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
          onChange={(value)=> {updateStatus(record.order_id, value)}}
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
  ];

  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between">
        <h3 className="mb-5 title">Orders</h3>
        <Button type="primary">Add New Order</Button>
      </div>
      <div>
        <Search
          placeholder="search Orders"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
          status="success"
          className="mb-4"
        />

        <Table columns={columns} dataSource={Orders} />
      </div>
    </div>
  );
}

export default OrdersList;
