import React from "react";
import { PlusOutlined, InboxOutlined } from "@ant-design/icons";
import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Tag,
} from "antd";
import { useRef, useState } from "react";

import { message, Upload } from "antd";
import ImageUploader from "../Component/ImageUploader";
import FormItemLabel from "antd/es/form/FormItemLabel";
const { Dragger } = Upload;

const { Option } = Select;
let index = 0;
const { TextArea } = Input;

const options = [
  {
    value: "gold",
  },
  {
    value: "lime",
  },
  {
    value: "green",
  },
  {
    value: "cyan",
  },
];
const tagRender = (props) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={value}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{
        alignItems: "center",
      }}
    >
      {label}
    </Tag>
  );
};

const props = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};
function Addproduct() {
  const [items, setItems] = useState(["jack", "lucy"]);
  const [name, setName] = useState("");
  const inputRef = useRef(null);
  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const addItem = (e) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  return (
    <Form
      layout="horizontal"
      className="d-flex align-items-start bg-white p-5 w-100 "
    >
      {/* product information */}
      <div className="container">
        <h3 className="mb-4">Add New Product</h3>
        <div className="row">
          <div className="d-flex gap-3 col">
            <div className="d-flex flex-column gap-3 w-50">
              <label htmlFor="title" className="fw-bold">Product Title</label>
              <Input
                placeholder="Product title"
                name="title"
                status="error"
                size="large"
              />
              <label htmlFor="description" className="fw-bold">Product Description</label>

              <TextArea
                size="large"
                rows={3}
                placeholder="Product description"
                maxLength={6}
              />

              {/* category selection */}
              <label htmlFor="categories" className="fw-bold">Product Categories</label>

              <Select
                size="large"
                mode="multiple"
                showArrow
                tagRender={tagRender}
                defaultValue={["gold", "cyan"]}
                style={{
                  width: "100%",
                }}
                options={options}
              />
              {/* image uplod */}
              <label htmlFor="images" className="fw-bold">Product images</label>

              <ImageUploader uploadLimit="8" />
              <Button type="primary w-50">Add Product</Button>
            </div>

            <div className="d-flex flex-column gap-3 w-50 col">
            <label htmlFor="slug" className="fw-bold">Product slug</label>

              <Input
                addonBefore="skyzoo.ma/"
                placeholder="product-name"
                size="large"
              />
              <label htmlFor="quantity" className="fw-bold">Product Quantity</label>
              <Input placeholder="Stock quantity" size="large" />

              <label htmlFor="code" className="fw-bold">Product Code</label>
              <Input placeholder="SKU" size="large" />

              <label htmlFor="colors" className="fw-bold">Product Colors</label>
              <Select
                size="large"
                mode="multiple"
                showArrow
                tagRender={tagRender}
                defaultValue={["gold", "cyan"]}
                style={{
                  width: "100%",
                }}
                options={options}
              />
              <label htmlFor="price" className="fw-bold">Product Price</label>

                <InputNumber
                  size="large"
                  placeholder="Product price"
                  addonBefore="+"
                  addonAfter="$"
                  defaultValue={100}
                />
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}

export default Addproduct;
