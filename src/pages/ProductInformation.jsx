// ProductInformation.js
import React, { useEffect, useState } from "react";
import { Input, Tag, Select, Button } from "antd";
import axiosClient from "../axios_client";
const { TextArea } = Input;
const { Option } = Select;

function ProductInformation() {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState(null);

  useEffect(() => {
    fetchCategoriesFromServer();
  }, []);

  const handleImageUpload = (event) => {
    const files = event.target.files;
    const uploadedImages = Array.from(files);
    setProductImages((prevImages) => [...prevImages, ...uploadedImages]);

    const previews = uploadedImages.map((image) => URL.createObjectURL(image));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
  };

  // const deleteImage = (index) => {
  //   const deletedImage = productImages[index];
  //   console.log("Deleted Image:", deletedImage.name);
    
  //   setProductImages((prevImages) => {
  //     const updatedImages = [...prevImages];
  //     updatedImages.splice(index, 1);
  //     return updatedImages;
  //   });

  //   setImagePreviews((prevPreviews) => {
  //     const updatedPreviews = [...prevPreviews];
  //     updatedPreviews.splice(index, 1);
  //     return updatedPreviews;
  //   });
  // };

  const handleDeleteImage = (index) => {
    const updatedImages = [...productImages];
    updatedImages.splice(index, 1);
    setProductImages(updatedImages);
  
    const updatedPreviews = [...imagePreviews];
    updatedPreviews.splice(index, 1);
    setImagePreviews(updatedPreviews);
  };

  const handleMainImageUpload = (event) => {
    const file = event.target.files[0];
    setMainImage(file);

    const preview = URL.createObjectURL(file);
    setMainImagePreview(preview);
  };

  const deleteMainImage = () => {
    setMainImage(null);
    setMainImagePreview(null);
  };

  const fetchCategoriesFromServer = async () => {
    try {
      const response = await axiosClient.get("/category");
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryChange = (selectedValues) => {
    setSelectedCategories(selectedValues);
  };

  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;

    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    return (
      <Tag color="blue" onMouseDown={onPreventMouseDown} closable={closable} onClose={onClose}>
        {label}
      </Tag>
    );
  };

  return (
    <>
      <label htmlFor="title" className="fw-bold">
        Product Title
      </label>
      <Input placeholder="Product title" name="title" size="large" />
      <label htmlFor="slug" className="fw-bold">
        Product slug
      </label>
      <Input placeholder="Product slug" name="slug" size="large" />

      <label htmlFor="description" className="fw-bold">
        Product Description
      </label>
      <TextArea size="large" rows={3} name="description" placeholder="Product description" maxLength={6} />
      <label htmlFor="categories" className="fw-bold">
        Product Categories
      </label>
      <Select
        size="large"
        mode="multiple"
        showArrow
        name="categories"
        tagRender={tagRender}
        style={{ width: "100%" }}
        value={selectedCategories}
        onChange={handleCategoryChange}
      >
        {categories.map((category) => (
          <Option key={category.category_id} value={category.id}>
            {category.category_name}
          </Option>
        ))}
      </Select>
      <label htmlFor="imageMain" className="fw-bold">
        Product Main Image
      </label>
      <input type="file" name="imageMain" id="imageMain" onChange={handleMainImageUpload} />
      {mainImagePreview && (
        <div>
          <img src={mainImagePreview} alt="Product Main" style={{ width: "100px", height: "100px" }} />
          <Button type="primary" size="small" shape="circle" onClick={deleteMainImage}>
            X
          </Button>
        </div>
      )}
      <label htmlFor="ProductImages" className="fw-bold">
        Product Images
      </label>
      <input type="file" multiple name="ProductImages" id="ProductImages" onChange={handleImageUpload} />

      <div className="mt-2 d-flex flex-wrap gap-3">
        {imagePreviews.map((preview, index) => (
          <div key={index} style={{ position: "relative" }}>
            <img src={preview} alt={`Product Image ${index + 1}`} style={{ width: "100px", height: "100px" }} />
            <Button
              type="primary"
              size="small"
              shape="circle"
              style={{ position: "absolute", top: "-8px", right: "-8px" }}
              onClick={() => handleDeleteImage(index)}
            >
              X
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}

export default ProductInformation;
