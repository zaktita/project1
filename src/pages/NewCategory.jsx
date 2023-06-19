import React from "react";
import axios from "axios";
import { Button, Form, Input, message } from "antd";
import { useState } from "react";

import { SmileOutlined } from '@ant-design/icons';
const { TextArea } = Input;

function NewCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [CategoryImage, setCategoryImage] = useState([]);
  const [form] = Form.useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleImageUpload = (event) => {
    console.log(event.target.files[0]);
    console.log('image uploaded');
    setCategoryImage(event.target.files[0]);
  };

  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async () => {
    try {
      await form.validateFields();
      console.log('form submit working');

      const formData = new FormData();
      formData.append("category_name", categoryName);
      formData.append("category_slug", categorySlug);
      formData.append("category_description", categoryDescription);
      formData.append("category_image", CategoryImage);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      };

      const response = await axios.post("http://127.0.0.1:8000/api/category", formData, { headers: config.headers });
      console.log(response.data);
      message.success('Category created successfully');
      form.resetFields(); // Clear form fields
      setIsSubmitted(true); // Set isSubmitted to true
    } catch (error) {
      console.log(error.response.data);
      message.error('Error creating category');
    }
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout="horizontal"
      className="d-flex align-items-start bg-white p-5 w-100"
    >
      <div className="container">
        <h3 className="mb-4">Add Category</h3>

        <div className="d-flex gap-3">
          <div className="d-flex flex-column gap-3 w-50">
            <label htmlFor="categoryName" className="fw-bold">
              Category title
            </label>
            <Form.Item
              name="categoryName"
              validateStatus={isSubmitted ? (categoryName ? "success" : "error") : ""}
              help={isSubmitted && !categoryName ? "Category title is required" : ""}
            >
              <Input
                placeholder="Category title"
                type="text"
                id="categoryName"
                value={categoryName}
                size="large"
                // suffix={<SmileOutlined />}
                onChange={(event) => setCategoryName(event.target.value)}
              />
            </Form.Item>

            <label htmlFor="category-slug" className="fw-bold">
              Category slug
            </label>
            <Form.Item
              name="categorySlug"
              validateStatus={isSubmitted ? (categorySlug ? "success" : "error") : ""}
              help={isSubmitted && !categorySlug ? "Category slug is required" : ""}
            >
              <Input
                addonBefore="skyzoo.ma/"
                placeholder="Category slug"
                size="large"
                type="text"
                id="categorySlug"
                value={categorySlug}
                onChange={(event) => setCategorySlug(event.target.value)}
              />
            </Form.Item>

            <label htmlFor="categoryDescription" className="fw-bold">
              Category description
            </label>
            <Form.Item
              name="categoryDescription"
              validateStatus={isSubmitted ? (categoryDescription ? "success" : "error") : ""}
              help={isSubmitted && !categoryDescription ? "Category description is required" : ""}
            >
              <TextArea
                size="large"
                rows={3}
                placeholder="Category description"
                maxLength={600}
                id="categoryDescription"
                value={categoryDescription}
                onChange={(event) => setCategoryDescription(event.target.value)}
              />
            </Form.Item>

            <label htmlFor="category-image" className="fw-bold">
              Category image
            </label>
            <input
              type="file"
              multiple
              name="category-image"
              id="category-image"
              onChange={handleImageUpload}
            />

            <Button type="primary" htmlType="submit" className="w-50">
              Add Category
            </Button>

            {contextHolder}
          </div>
        </div>
      </div>
    </Form>
  );
}

export default NewCategory;
