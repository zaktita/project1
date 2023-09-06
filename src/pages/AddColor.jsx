import React, { useEffect, useState } from "react";
import { Button, Form, Input, Space, message, Table, Modal } from "antd";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import axiosClient from "../axios_client";

function AddColor() {
  const [form] = Form.useForm();
  const [colors, setColors] = useState("");
  const [color, setColor] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Fetch categories on component mount
  useEffect(() => {
    fetchColors();
  }, []);

  // Function to fetch categories from the server
  const fetchColors = async () => {
    try {
      const response = await axiosClient.get("/colors");
      setColors(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to delete a color
  const onDeleteColor = async (id) => {
    // Display a confirmation modal before deleting the color
    Modal.confirm({
      title: "Delete color",
      content: "Are you sure you want to delete this color?",
      onOk: async () => {
        try {
          await axiosClient.delete(`/colors/${id}`);
          message.success("Color deleted successfully");
          fetchColors(); // Refresh the color list
        } catch (error) {
          console.log(error);
          message.error("Error deleting Color");
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
      title: "id",
      dataIndex: "id",
    },
    {
      title: "name",
      dataIndex: "color_name",
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          {/* Delete color */}
          <a href="#" onClick={() => onDeleteColor(record.id)}>
            <FaTrash />
          </a>
        </Space>
      ),
    },
  ];

  // submit color form
  const handleSubmit = async () => {
    try {
      await form.validateFields();

      const formData = new FormData();
      formData.append("color_name", color);
      // typeof formData;
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      };

      const response = await axiosClient.post(
        "/colors",
        formData,
        { headers: config.headers }
      );
      // console.log(response.data);
      message.success("color created successfully");
      form.resetFields(); // Clear form fields
      setIsSubmitted(true); // Set isSubmitted to true
      setColor(""); // Clear color
      fetchColors(); // Refresh the color list
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        message.error("Error creating color");
      } else {
        console.log(error.message);
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
        className="d-flex align-items-start bg-white py-5 px-1  w-100"
      >
        <div className="d-flex justify-content-between gap-2">
          <Input
            placeholder="Enter color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-75"
          />

          <Button type="primary" htmlType="submit">
            Add Color
          </Button>
        </div>
      </Form>
      <Table columns={columns} dataSource={colors} rowKey="id" />
    </>
  );
}

export default AddColor;
