import React, { useEffect, useState } from "react";
import { Button, Space, Table } from "antd";
import fakedata from "./data.json";
import { Input } from "antd";
import {FaTrash,FaEdit} from 'react-icons/fa'
const { Search } = Input;

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Status",
    dataIndex: "staus",
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <Space size="middle">        
        <a href="">
            <FaEdit/>
            </a>
            <a href="">
        <FaTrash/>
            </a>
      </Space>
    ),
  },
];
const data1 = [];
for (let i = 0; i < 46; i++) {
  data1.push({
    key: i,
    name: `Edward King ${i}`,
    product: i + 33,
    staus: `London, Park Lane no. ${i}`,
  });
}
function ProductList() {
  const onSearch = (value) => console.log(value);
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(fakedata);
  }, []);
  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between">
        <h3 className="mb-5 title">Product List</h3>
        <Button type="primary">Add New Product</Button>
      </div>
      <div>
        <Search
          placeholder="search categories"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
          status="success"
          className="mb-4"

        />

        <Table columns={columns} dataSource={data1}/>
      </div>
    </div>
  );
}

export default ProductList;
