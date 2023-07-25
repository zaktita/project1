import React, { useEffect, useState } from "react";
import { Button, Form, Input, Space, message, Table, Modal } from "antd";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

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
      const response = await axios.get("http://127.0.0.1:8000/api/colors");
      setColors(response.data.data);
      console.log(response.data.data.colors);
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
          await axios.delete(`http://127.0.0.1:8000/api/colors/${id}`);
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
      console.log("form submit working");

      const formData = new FormData();
      formData.append("color_name", color);
      console.log(formData);
      // typeof formData;
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/api/colors",
        formData,
        { headers: config.headers }
      );
      console.log(response.data);
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
        className="d-flex align-items-start bg-white p-5 w-100"
      >
        <div className="d-flex justify-content-between">
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
