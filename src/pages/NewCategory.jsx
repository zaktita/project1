import React from "react";
import axios from "axios";
import { Alert, Button, Form, Input,message ,Space} from "antd";
import { useState } from "react";
// import ImageUploader from "../Component/ImageUploader";
import { SmileOutlined } from '@ant-design/icons';
const { TextArea } = Input;

function NewCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [CategoryImage, setCategoryImage] = useState([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const handleImageUpload = (event) => {
    console.log(event.target.files[0]);
    console.log('image uploaded');
    setCategoryImage(event.target.files[0]);
  };


  const [messageApi, contextHolder] = message.useMessage();

 


  const handleSubmit = (event) => {
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
    axios
      .post("http://127.0.0.1:8000/api/category", formData
      , {headers: config.headers}
      )
      .then((response) => {
        console.log(response.data);
        // Handle success, e.g., show a success message
        message.success('Category created successfully');
      })
      .catch((error) => {
        console.log(error.response.data); 
        message.error('Error creating category');
        // Handle error, e.g., show an error message
      });
  
  };
  return (
    <Form
    onFinish={handleSubmit}
      layout="horizontal"
      className="d-flex align-items-start bg-white p-5 w-100 "
    >
      {/* product information */}
      <div className="container">
        <h3 className="mb-4">Add Category</h3>

        <div className="d-flex gap-3 ">
          <div className="d-flex flex-column gap-3 w-50">
            <label htmlFor="categoryName" className="fw-bold">
              Category title
            </label>

            <Form.Item
      validateStatus="success"
      help="Should be combination of numbers & alphabets"
    >

            <Input
              placeholder="Category title"
              type="text"
              id="categoryName"
              value={categoryName}
              size="large"
              suffix={<SmileOutlined />}
              onChange={(event) => setCategoryName(event.target.value)}
            />
    </Form.Item>
            <label htmlFor="category-slug" className="fw-bold">
              Category slug
            </label>

            <Input
              addonBefore="skyzoo.ma/"
              placeholder="category slug"
              size="large"
              type="text"
              id="categorySlug"
              value={categorySlug}
              onChange={(event) => setCategorySlug(event.target.value)}
            />
            <label htmlFor="categoryDescription" className="fw-bold">
              Category description
            </label>

            <TextArea
              size="large"
              rows={3}
              placeholder="Product description"
              maxLength={600}
              id="categoryDescription"
              value={categoryDescription}
              onChange={(event) => setCategoryDescription(event.target.value)}
            />

            {/* image uplod */}
            <label htmlFor="category-image" className="fw-bold">
              Category image
            </label>


            <input type="file" multiple name="category-image" id="category-image" onChange={handleImageUpload} />

            <Button type="primary" htmlType="submit" className="w-50">Add Category</Button>

            {contextHolder}
          </div>
        </div>
      </div>
    </Form>
  );
}

export default NewCategory;
