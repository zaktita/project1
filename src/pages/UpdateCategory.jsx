import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Input, Button, message } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

const { TextArea } = Input;

function UpdateCategory() {
  const { categoryId } = useParams();

  const [categoryName, setCategoryName] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    // Fetch category data and set initial values
    fetchCategoryData();
  }, [categoryId]);




  const fetchCategoryData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/category/${categoryId}`
      );
      const categoryData = response.data.data;
  
      if (categoryData) {
        setCategoryName(categoryData.category_name);
        setCategorySlug(categoryData.category_slug);
        setCategoryDescription(categoryData.category_description);
        setCategoryImage(categoryData.category_image);
        setImagePreview(categoryData.category_image);
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setCategoryImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = (event) => {
    // event.preventDefault();

    const formData = new FormData();
    formData.append("category_name", categoryName);
    formData.append("category_slug", categorySlug);
    formData.append("category_description", categoryDescription);
    if (categoryImage) {
      formData.append("category_image", categoryImage);
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    };

    axios
      .post(`http://127.0.0.1:8000/api/category/${categoryId}`, formData, config)
      .then((response) => {
        console.log(response.data);
        message.success("Category Updated Successfully");
      })
      .catch((error) => {
        console.log(error.response.data);
        message.error("Error Updating Category");
      });
  };

  return (
    <Form
      onFinish={handleSubmit}
      layout="horizontal"
      className="d-flex align-items-start bg-white p-5 w-100"
    >
      <div className="container">
        <h3 className="mb-4">Update Category</h3>
        <div className="d-flex gap-3">
          <div className="d-flex flex-column gap-3 w-50">
            <label htmlFor="categoryName" className="fw-bold">
              Category Name
            </label>
            <Input
              type="text"
              id="categoryName"
              value={categoryName}
              size="large"
              suffix={<SmileOutlined />}
              onChange={(event) => setCategoryName(event.target.value)}
            />

            <label htmlFor="category-slug" className="fw-bold">
              Category Slug
            </label>
            <Input
              addonBefore="skyzoo.ma/"
              placeholder="Category slug"
              size="large"
              type="text"
              id="categorySlug"
              value={categorySlug}
              onChange={(event) => setCategorySlug(event.target.value)}
            />

            <label htmlFor="categoryDescription" className="fw-bold">
              Category Description
            </label>
            <TextArea
              size="large"
              rows={3}
              placeholder="Category description"
              maxLength={600}
              id="categoryDescription"
              value={categoryDescription}
              onChange={(event) => setCategoryDescription(event.target.value)}
            />
            <input
              type="file"
              name="category-image"
              id="category-image"
              onChange={handleImageUpload}
            />
            {imagePreview && (
              <img src={imagePreview} alt="category-preview" style={{ width: "100px", height: "100px" }} />
            )}

            <Button type="primary" htmlType="submit" className="w-50">
              Update Category
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
}

export default UpdateCategory;
