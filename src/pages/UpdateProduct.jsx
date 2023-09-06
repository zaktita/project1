import React, { useEffect, useState } from "react";
import { Input, Tag, Form, Select, Button, InputNumber, message } from "antd";
import { useParams } from "react-router-dom";
import axiosClient from "../axios_client";

const { TextArea } = Input;
const { Option } = Select;
function UpdateProduct() {
  const { productId } = useParams();

  const [productTitle, setProductTitle] = useState("");
  const [productSlug, setProductSlug] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [mainImage, setMainImage] = useState();
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [form] = Form.useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  // product details
  const [colors, setColors] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [selectedSizes, setSelectedSizes] = useState([]);

  useEffect(() => {
    fetchDataFromServer();
  }, []);

  const fetchDataFromServer = async () => {
    try {
      const response = await axiosClient.get(
        `/variations/${productId}`
      );

      setCategories(response.data.category);
      setSizes(response.data.sizes);
      setColors(response.data.colors);

      setProductTitle(response.data.product.title);
      setProductSlug(response.data.product.slug);
      setProductDescription(response.data.product.description);
      setSelectedCategories(response.data.product.category_id);
      setSelectedColors(response.data.product.colors);
      setSelectedSizes(response.data.product.sizes);
      setPrice(response.data.product.price);
      setQuantity(response.data.product.quantity);
    } catch (error) {
      console.log(error);
    }
  };

  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;

    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    return (
      <Tag
        color="blue"
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
      >
        {label}
      </Tag>
    );
  };

  // handle images uploads

  const handleImageUpload = (event) => {
    const files = event.target.files;
    const uploadedImages = Array.from(files);
    setProductImages((prevImages) => [...prevImages, ...uploadedImages]);

    const previews = uploadedImages.map((image) => URL.createObjectURL(image));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
  };

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

  const handleCategoryChange = (selectedValues) => {
    setSelectedCategories(selectedValues);

  };

  const handleColorChange = (selectedValues) => {
    setSelectedColors(selectedValues);
  };

  const handleSizeChange = (selectedValues) => {
    setSelectedSizes(selectedValues);
  };
  const handlePriceChange = (selectedValues) => {
    setPrice(selectedValues);
  };
  const handleQuantityChange = (selectedValues) => {
    setQuantity(selectedValues);
  };
  // fetch data from server

  const handleSubmit = async () => {
    const formData = new FormData();

    try {
      await form.validateFields();
      formData.append("_method", "PUT");
      formData.append("title", productTitle);
      formData.append("slug", productSlug);
      formData.append("description", productDescription);
      formData.append("category_id", JSON.stringify(selectedCategories));
      formData.append("colors", JSON.stringify(selectedColors));
      formData.append("sizes", JSON.stringify(selectedSizes));
      formData.append("quantity", quantity);
      formData.append("price", price);
      formData.append("image", mainImage);

      for (let i = 0; i < productImages.length; i++) {
        formData.append(`product_images[${i}]`, productImages[i]);
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      };

      const response = await axiosClient.post(
        `/products/${productId}`,
        formData,
        { headers: config.headers }
      );
      message.success("Product updated successfully");
      // form.resetFields(); // Clear form fields
      setIsSubmitted(true); // Set isSubmitted to true
    } catch (error) {
      console.log(error.response.data);
      message.error("Error updating product");
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
        <h3 className="mb-4">Update Product</h3>
        <div className="row">
          <div className="d-flex gap-3 col">
            <div className="d-flex flex-column gap-3 w-50">
              {/* <ProductInformation /> */}

              <label htmlFor="title" className="fw-bold">
                Product Title
              </label>
              <Input
                placeholder="Product title"
                name="title"
                size="large"
                value={productTitle}
                onChange={(e) => setProductTitle(e.target.value)}
              />
              <label htmlFor="slug" className="fw-bold">
                Product slug
              </label>
              <Input
                placeholder="Product slug"
                name="slug"
                value={productSlug}
                size="large"
                // defaultValue={response.data.product.slug}
                onChange={(e) => setProductSlug(e.target.value)}
              />

              <label htmlFor="description" className="fw-bold">
                Product Description
              </label>
              <TextArea
                size="large"
                rows={3}
                name="description"
                placeholder="Product description"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              />
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
                {categories.map((e) => (
                  <Option key={e.category_id} value={e.category_id}>
                    {e.category_name}
                  </Option>
                ))}
              </Select>
              <label htmlFor="imageMain" className="fw-bold">
                Product Main Image
              </label>
              <input
                type="file"
                name="imageMain"
                id="imageMain"
                onChange={handleMainImageUpload}
              />
              {mainImagePreview && (
                <div>
                  <img
                    src={mainImagePreview}
                    alt="Product Main"
                    style={{ width: "100px", height: "100px" }}
                  />
                  <Button
                    type="primary"
                    size="small"
                    shape="circle"
                    onClick={deleteMainImage}
                  >
                    X
                  </Button>
                </div>
              )}
              <label htmlFor="ProductImages" className="fw-bold">
                Product Images
              </label>
              <input
                type="file"
                multiple
                name="ProductImages"
                id="ProductImages"
                onChange={handleImageUpload}
              />

              <div className="mt-2 d-flex flex-wrap gap-3">
                {imagePreviews.map((preview, index) => (
                  <div key={index} style={{ position: "relative" }}>
                    <img
                      src={preview}
                      alt={`Product Image ${index + 1}`}
                      style={{ width: "100px", height: "100px" }}
                    />
                    <Button
                      type="primary"
                      size="small"
                      shape="circle"
                      style={{
                        position: "absolute",
                        top: "-8px",
                        right: "-8px",
                      }}
                      onClick={() => handleDeleteImage(index)}
                    >
                      X
                    </Button>
                  </div>
                ))}
              </div>

              <Button type="primary" htmlType="submit" className="w-50">
                Update Product
              </Button>
            </div>
            <div className="d-flex flex-column gap-3 w-50 col">
              {/* <ProductDetails /> */}
              <label htmlFor="colors" className="fw-bold">
                Product Colors
              </label>
              <Select
                size="large"
                mode="multiple"
                name="colors"
                showArrow
                tagRender={tagRender}
                style={{ width: "100%" }}
                value={selectedColors}
                onChange={handleColorChange}
              >
                {colors.map((e, index) => (
                  <Option key={index} value={e.id}>
                    {e.color_name}
                  </Option>
                ))}
              </Select>
              <label htmlFor="sizes" className="fw-bold">
                Product Sizes
              </label>

              <Select
                size="large"
                mode="multiple"
                rules={[
                  {
                    required: true,
                    message: "Please enter the product sizes",
                  },
                ]}
                value={selectedSizes}
                showArrow
                tagRender={tagRender}
                style={{ width: "100%" }}
                onChange={handleSizeChange}
              >
                {sizes.map((e, index) => (
                  <Option key={index} value={e.id}>
                    {e.size}
                  </Option>
                ))}
              </Select>

              <label htmlFor="quantity" className="fw-bold">
                Product quantity
              </label>
                <InputNumber
                  size="large"
                  // intialvalue={quantity}
                  value={quantity}
                  // defaultValue={quantity}
                  // placeholder="Product quantity"
                  addonBefore="+"
                  onChange={handleQuantityChange}
                />
              <label htmlFor="price" className="fw-bold">
                Product Price
              </label>
            
                <InputNumber
                  value={price}

                  size="large"
                  addonBefore="+"
                  addonAfter="$"
                  onChange={handlePriceChange}
                />

              {contextHolder}
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}

export default UpdateProduct;
