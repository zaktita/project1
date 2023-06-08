
import React from "react";
import { Button, Select, Space, Table,Tag } from "antd";
import { Input } from "antd";
import {FaTrash,FaEdit} from 'react-icons/fa'
const { Search } = Input;
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  const tagRender = (props) => {
    const { label, value, closable, onClose,color } = props;
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
          color:{color}
        }}
      >
        {label}
      </Tag>
    );
  };
const columns = [
  {
    title: "Number",
    dataIndex: "Number",
  },
  {
    title: "Date",
    dataIndex: "Date",
    render:()=>(
      date
      )
  },

  {
    title: "Items",
    dataIndex: "Items",
  },
  {
    title: "Total",
    dataIndex: "Total",
  },

  {
    title: 'Paid',
    key: 'Paid',
    render:()=>(
      <Tag color="success">Paid</Tag>
      )
  },
 
  {
    title: 'Status',
    key: 'Status',
    render:()=>(
      <Select
      tagRender={tagRender}
      placeholder="Select an option"
      // optionFilterProp="children"
      // onChange={onChange}
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      
      options={[
        {
          color:'warning',
          value: 'Shipped',
          label: 'Shipped',
        },
        {
          color:'warning',
          value: 'Pending',
          label: 'Pending',
        },
        {
          color:'success',
          value: 'Delivered',
          label: 'Delivered',
        },
      ]}
    />
      )
  },
];
const data1 = [];
for (let i = 0; i < 46; i++) {
  data1.push({
    key: i,
    Number: `${i}`,
    Items: `3 items`,
    Total: `3 000 dh`,
    
  });
}
function OrdersList() {
  const onSearch = (value) => console.log(value);
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

        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
}

export default OrdersList;
