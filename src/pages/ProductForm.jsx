// import React, { useState, useEffect } from "react";
// import { Form, Input, Select, Button, InputNumber, message } from "antd";
// import axios from "axios";

// const { Option } = Select;
// const { TextArea } = Input;

// const ProductForm = () => {
//   const [categories, setCategories] = useState([]);
//   const [colors, setColors] = useState([]);
//   const [sizes, setSizes] = useState([]);
//   const [form] = Form.useForm();

//   useEffect(() => {
//     fetchCategories();
//     fetchColors();
//     fetchSizes();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get("http://api.example.com/categories");
//       setCategories(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const fetchColors = async () => {
//     try {
//       const response = await axios.get("http://api.example.com/colors");
//       setColors(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const fetchSizes = async () => {
//     try {
//       const response = await axios.get("http://api.example.com/sizes");
//       setSizes(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleSubmit = async (values) => {
//     try {
//       const response = await axios.post("http://api.example.com/products", values);
//       console.log(response.data);
//       message.success("Product created successfully");
//       form.resetFields();
//     } catch (error) {
//       console.log(error.response.data);
//       message.error("Error creating product");
//     }
//   };

//   return (
//     <div className="product-form">
//       <h3>Add New Product</h3>
//       <Form form={form} onFinish={handleSubmit} layout="vertical">
//         <Form.Item label="Product Title" name="title" rules={[{ required: true, message: "Please enter product title" }]}>
//           <Input placeholder="Product title" />
//         </Form.Item>
//         {/* Add more form fields as needed */}
//         <Form.Item>
//           <Button type="primary" htmlType="submit">
//             Add Product
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };

// export default ProductForm;
