import React, { useState, useEffect } from "react";
import { Button, Space, Table, Modal, message } from "antd";
import { Input } from "antd";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import axiosClient from "../axios_client";


const { Search } = Input;

function CategoryList() {
  // State variable to store the categories
  const [categories, setCategories] = useState([]);

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Function to fetch categories from the server
  const fetchCategories = async () => {
    try {
      const response = await axiosClient.get("/category");
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to delete a category
  const onDeleteCategory = async (category_id) => {
    // Display a confirmation modal before deleting the category
    Modal.confirm({
      title: "Delete Category",
      content: "Are you sure you want to delete this category?",
      onOk: async () => {
        try {
          await axiosClient.delete(
            `/category/${category_id}`
          );
          message.success("Category deleted successfully");
          fetchCategories(); // Refresh the category list
        } catch (error) {
          console.log(error);
          message.error("Error deleting category");
        }
      },
      onCancel: () => {
        // Do nothing if the user cancels the deletion
      },
    });
  };

  // Table columns configuration
  const columns = [
    {
      title: "image",
      dataIndex: "image",
      render: (text, record) => (
        <img src={record.category_image} alt="" style={{ width: "50px" }} />
      ),
    },
    {
      title: "id",
      dataIndex: "category_id",
    },
    {
      title: "title",
      dataIndex: "category_name",
    },
    {
      title: "slug",
      dataIndex: "category_slug",
    },
    {
      title: "Description",
      dataIndex: "category_description",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          {/* Link to update category */}
          <Link to={`/updatecategory/${record.category_name}`}>
            <FaEdit />
          </Link>
          {/* Delete category */}
          <a href="#" onClick={() => onDeleteCategory(record.category_id)}>
            <FaTrash />
          </a>
        </Space>
      ),
    },
  ];

  // Function to handle search
  const onSearch = (value) => {
    if (value.trim() === "") {
      // If search value is empty, show all categories
      fetchCategories();
    } else {
      // Filter categories based on search value
      const filteredCategories = categories.filter((category) =>
        category.category_name.toLowerCase().includes(value.toLowerCase())
      );

      // Update the state with filtered categories
      setCategories(filteredCategories);
    }
  };

  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between">
        <h3 className="mb-5 title">Categories</h3>

        {/* Link to add a new category */}
        <Link to={`/NewCategory`}>
          <Button type="primary">Add New Category</Button>
        </Link>
      </div>
      <div>
        {/* Search input field */}
        <Search
          placeholder="Search categories"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
          className="mb-4"
        />

        {/* Table to display categories */}
        <Table columns={columns} dataSource={categories} rowKey="category_id" />
      </div>
    </div>
  );
}

export default CategoryList;
