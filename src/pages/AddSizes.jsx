import React, { useEffect, useState } from "react";
import { Button, Form, Input, Space, message, Table, Modal } from "antd";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

function AddSizes() {
  const [form] = Form.useForm();
  const [sizes, setsizes] = useState([]);
  const [size, setsize] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Fetch sizes on component mount
  useEffect(() => {
    fetchsizes();
  }, []);

  // Function to fetch sizes from the server
  const fetchsizes = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/sizes");
      setsizes(response.data.size);
    } catch (error) {
    //   console.log(error);
    }
  };

  // Function to delete a size
  const onDeletesize = async (id) => {
    // Display a confirmation modal before deleting the size
    Modal.confirm({
      title: "Delete size",
      content: "Are you sure you want to delete this size?",
      onOk: async () => {
        try {
          await axios.delete(`http://127.0.0.1:8000/api/sizes/${id}`);
          message.success("size deleted successfully");
          fetchsizes(); // Refresh the size list
        } catch (error) {
        //   console.log(error);
          message.error("Error deleting size");
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
      title: "Size",
      dataIndex: "size",
      sorter: (a, b) => a.size.localeCompare(b.size),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          {/* Delete size */}
          <a href="#" onClick={() => onDeletesize(record.id)}>
            <FaTrash />
          </a>
        </Space>
      ),
    },
  ];

  // submit size form
  const handleSubmit = async () => {
    try {
      await form.validateFields();
    //   console.log("form submit working");

      const formData = new FormData();
      formData.append("size", size);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/api/sizes",
        formData,
        { headers: config.headers }
      );

      message.success("size created successfully");
      form.resetFields(); // Clear form fields
      setIsSubmitted(true); // Set isSubmitted to true
      setsize(""); // Clear size
      fetchsizes(); // Refresh the size list
    } catch (error) {
      if (error.response) {
        // console.log(error.response.data);
        message.error("Error creating size");
      } else {
        // console.log(error.message);
        message.error("Network error");
      }
    }
  };

  return (
    <>
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="horizontal"
        className="d-flex align-items-start bg-white p-5 w-100"
      >
        <div className="d-flex justify-content-between">
          <Input
            placeholder="Enter size"
            value={size}
            onChange={(e) => setsize(e.target.value)}
            className="w-75"
          />

          <Button type="primary" htmlType="submit">
            Add size
          </Button>
        </div>
      </Form>
      <Table
        columns={columns}
        dataSource={sizes}
        rowKey="id"
        pagination={false}
        onChange={(pagination, filters, sorter) => {
          // Handle sorting
          const { field, order } = sorter;
          // Perform the sorting operation based on the field and order values
        }}
      />
    </>
  );
}

export default AddSizes;
