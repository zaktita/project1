import React, { useState, useEffect } from "react";
import { Button, Space, Table, Modal, message,Tag } from "antd";
import { Input } from "antd";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
const { Search } = Input;


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




function ProductList() {

    // State variable to store the categories
    const [Product, setProduct] = useState([]);
    const [categories, setCategories] = useState([]);



    // FetchProductFromServer categories on component mount
    useEffect(() => {
      fetchProductFromServer();
    }, []);
  

      
    
    // Function to fetchProductFromServer categories from the server
    const fetchProductFromServer = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/fetchProductwhitcategories");
        setProduct(response.data.product);
        setCategories(response.data.category);
        console.log(response.data.product);
      } catch (error) {
        console.log(error);
      }
    };
  
    // Function to delete a product
    const onDeleteProduct = async (product_id) => {
      // Display a confirmation modal before deleting the product
      Modal.confirm({
        title: "Delete product",
        content: "Are you sure you want to delete this product?",
        onOk: async () => {
          try {
            await axios.delete(
              `http://127.0.0.1:8000/api/products/${product_id}`
            );
            message.success("product deleted successfully");
            fetchProductFromServer(); // Refresh the product list
          } catch (error) {
            console.log(error);
            message.error("Error deleting product");
          }
        },
        onCancel: () => {
          // Do nothing if the user cancels the deletion
        },
      });
    };

    
    const findCategories = (record) => {
      if (record.category_id != null) {
        return record.category_id.map((categoryId , index) => {
          const category = categories.find((category) => category.category_id === categoryId);
          return<Tag key={index} color="blue">{category ? category.category_name : ""}</Tag>

        });
      }
      return <Tag color="blue">empty category</Tag>
    };
    
  
  
    // Table columns configuration
    const columns = [
      {
        title: "image",
        dataIndex: "image",
        render: (text, record) => (
          <img src={`http://localhost:8000/storage/${record.image}`} alt="" style={{ width: "50px" }} />
        ),
      },
      {
        title: "title",
        dataIndex: "title",
      },
      {
        title: "categories",
        dataIndex: "category_id",
        render: (text, record) => (
          findCategories(record) 
        )
      },
      {
        title: "price",
        dataIndex: "price",
      },
      {
        title: "stock",
        dataIndex: "quantity",
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <Space size="middle">
            {/* Link to update product */}
            <Link to={`/UpdateProduct/${record.product_id}`}>
              <FaEdit />
            </Link>
            {/* Delete product */}
            <a href="#" onClick={() => onDeleteProduct(record.product_id)}>
              <FaTrash />
            </a>
          </Space>
        ),
      },
    ];
  
    // Function to handle search
    const onSearch = (value) => {
      if (value.trim() === "") {
        // If search value is empty, show all products
        fetchProductFromServer();
      } else {
        // Filter products based on search value
        const filteredproducts = Product.filter((product) =>
          product.title.toLowerCase().includes(value.toLowerCase())
        );
  
        // Update the state with filtered products
        setProduct(filteredproducts);
      }
    };
  
    return (
      <div className="mt-4">
        <div className="d-flex justify-content-between">
          <h3 className="mb-5 title">Products</h3>
  
          {/* Link to add a new product */}
          <Link to={`/Addproduct`}>
            <Button type="primary">Add New Product</Button>
          </Link>
        </div>
        <div>
          {/* Search input field */}
          <Search
            placeholder="Search Products"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
            className="mb-4"
          />
  
          {/* Table to display categories */}
          <Table columns={columns} dataSource={Product} rowKey="product_id" />
        </div>
      </div>
    );
  
}

export default ProductList;
