// AddProduct.js
import React, { useEffect, useState } from "react";
import { Input, Tag,Form, Select, Button,InputNumber,message } from "antd";
import axios from "axios";


// import ProductInformation from "./ProductInformation";
// import ProductDetails from "./ProductDetails";

const { TextArea } = Input;
const { Option } = Select;

function AddProduct() {



  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [form] = Form.useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
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
      const response = await axios.get("http://127.0.0.1:8000/api/category");
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryChange = (selectedValues) => {
    setSelectedCategories(selectedValues);
    console.log(selectedCategories);
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



// product details
const [colors, setColors] = useState([]);
const [colorOptions, setColorOptions] = useState([]);
const [selectedColors, setSelectedColors] = useState([]);

const [sizes, setSizes] = useState([]);
const [price, setPrice] = useState(100);
const [sizeOptions, setSizeOptions] = useState([]);
const [selectedSizes, setSelectedSizes] = useState([]);

useEffect(() => {
  fetchColorsFromServer();
  fetchSizesFromServer();
}, []);

const fetchColorsFromServer = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/colors");
    setColors(response.data.data);

    const colorOptions = response.data.data.map((e) => {
      return { value: e.id, label: e.color_name };
    });

    setColorOptions(colorOptions);
    console.log(colorOptions);
  } catch (error) {
    console.log(error);
  }
};

const fetchSizesFromServer = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/sizes");
    setSizes(response.data.size);

    const sizeOptions = response.data.size.map((e) => {
      return { value: e.id, label: e.size };
    });

    setSizeOptions(sizeOptions);
  } catch (error) {
    console.log(error);
  }
};

const handleColorChange = (selectedValues) => {
  setSelectedColors(selectedValues);
  console.log(selectedValues);
console.log(selectedColors);
};

const handleSizeChange = (selectedValues) => {
  setSelectedSizes(selectedValues);
};
const handlePriceChange = (selectedValues) => {
  setPrice(selectedValues);
};


// post data to the server 


const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async () => {
    const formData = new FormData();
    const productTitle = formData.get("title");
    const productSlug = formData.get("slug");
    const productDescription = formData.get("description");
    const productCategories = selectedCategories;
    const productColors = selectedColors[0];
    // const productColors = JSON.stringify(selectedColors);
    const productSizes = selectedSizes;
    const productQuantity = formData.get("quantity");
    const productPrices = price;
    const mainImage = formData.get("imageMain");
    const ProductImages = formData.getAll("ProductImages");
    try {
      await form.validateFields();
      console.log('form submit working');
      console.log(productQuantity);
      

      formData.append("title", productTitle);
      formData.append("slug", productSlug);
      formData.append("description", productDescription);
      formData.append("category_id", productCategories);
      formData.append("colors", productColors);
      formData.append("sizes", productSizes);
      formData.append("quantity", productQuantity);
      formData.append("price", productPrices);
      formData.append("image", mainImage);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      };

      const response = await axios.post("http://127.0.0.1:8000/api/products", formData, { headers: config.headers });
      console.log(response.data);
      message.success('Product created successfully');
      form.resetFields(); // Clear form fields
      setIsSubmitted(true); // Set isSubmitted to true
    } catch (error) {
      console.log(error.response.data);
      message.error('Error creating category');
    }
  };



  return (
    <Form form={form}
    onFinish={handleSubmit}
     layout="horizontal" 
     className="d-flex align-items-start bg-white p-5 w-100">
      <div className="container">
        <h3 className="mb-4">Add New Product</h3>
        <div className="row">
          <div className="d-flex gap-3 col">
            <div className="d-flex flex-column gap-3 w-50">
              {/* <ProductInformation /> */}

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
    
              <Button type="primary" 
              // onClick={handleAddProduct} 
              htmlType="submit" className="w-50">
                Add Product
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
        defaultValue={[]}
        style={{ width: "100%" }}
        options={colorOptions}
        onChange={handleColorChange}
      />

      <label htmlFor="sizes" className="fw-bold">
        Product Sizes
      </label>
      <Select
        size="large"
        mode="multiple"
        name="sizes"
        showArrow
        tagRender={tagRender}
        defaultValue={[]}
        style={{ width: "100%" }}
        value={selectedSizes}
        options={sizeOptions}
        onChange={handleSizeChange}
      />

      <label htmlFor="quantity" className="fw-bold">
        Product quantity
      </label>
      <Form.Item
    name="quantity"
    label="Product quantity"
    // initialValue={100}
    rules={[
      {
        required: true,
        type: 'number',
        message: 'Please enter the product price',
      },
    ]}
  >
      <InputNumber size="large"  placeholder="Product quantity" addonBefore="+"  />
      </Form.Item>
      <label htmlFor="price" className="fw-bold">
        Product Price
      </label>
      <Form.Item
    name="price"
    label="Product price"
    initialValue={100}
    rules={[
      {
        required: true,
        type: 'number',
        message: 'Please enter the product price',
      },
    ]}
  >
    <InputNumber size="large" placeholder="Product price" addonBefore="+" addonAfter="$"  onChange={handlePriceChange}/>
  </Form.Item>
      {/* <InputNumber size="large" name="price" placeholder="Product price" addonBefore="+" addonAfter="$" defaultValue={100} /> */}
      {contextHolder}
            </div>
          </div>

        </div>
      </div>
    </Form>
  );
}

export default AddProduct;
