import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Space,
  message,
  Table,
  Modal,
  DatePicker,
  Tag,
} from "antd";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import axiosClient from "../axios_client";

function AddCoupon() {
  const [form] = Form.useForm();
  const [coupons, setCoupons] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [expiresAt, setExpiresAt] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Fetch coupons on component mount
  useEffect(() => {
    fetchCoupons();
  }, []);

  // Function to fetch coupons from the server
  const fetchCoupons = async () => {
    try {
      const response = await axiosClient.get("/coupon");
      setCoupons(response.data);
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderStatus = (expiresAt) => {
    const currentDate = new Date();
    const expirationDate = new Date(expiresAt);
    
    if (expiresAt && expirationDate < currentDate) {
      return <Tag color="red">Expired</Tag>;
    } else {
      return <Tag color="green">Valid</Tag>;
    }
  };

  // Function to delete a coupon
  const onDeleteCoupon = async (id) => {
    // Display a confirmation modal before deleting the coupon
    Modal.confirm({
      title: "Delete Coupon",
      content: "Are you sure you want to delete this coupon?",
      onOk: async () => {
        try {
          await axiosClient.delete(`/coupon/${id}`);
          message.success("Coupon deleted successfully");
          fetchCoupons(); // Refresh the coupon list
        } catch (error) {
          console.log(error);
          message.error("Error deleting Coupon");
        }
      },
      onCancel: () => {
        // Do nothing if the user cancels the deletion
      },
    });
  };


  const dateConverter = (datetoconvert) => {
    let date = new Date(datetoconvert);
    let day = date.getDate();
    if(day<10){
        day = "0"+day
    }
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let newDate = `${day}-${month}-${year}`;
    return newDate;
  };
  // Table columns configuration
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Code",
      dataIndex: "code",
    },
    {
      title: "Discount Percentage",
      dataIndex: "discount_percentage",
    },
    {
      title: "Expires At",
      dataIndex: "expires_at",
      render: (text, record) => dateConverter(record.expires_at),
    },
    {
        title: "Status",
        key: "status",
        render: (text, record) => renderStatus(record.expires_at),
      },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          {/* Delete coupon */}
          <a href="#" onClick={() => onDeleteCoupon(record.id)}>
            <FaTrash />
          </a>
        </Space>
      ),
    },
  ];

  

  // submit coupon form
  const handleSubmit = async () => {
    try {
      await form.validateFields();

      const formData = {
        code: coupon,
        discount_percentage: discountPercentage,
        expires_at: expiresAt,
      };

      const response = await axiosClient.post(
        "coupon",
        formData
      );
      // console.log(response.data);
      message.success("Coupon created successfully");
      form.resetFields(); // Clear form fields
      setIsSubmitted(true); // Set isSubmitted to true
      setCoupon(""); // Clear coupon code
      setDiscountPercentage(0); // Reset discount percentage
      fetchCoupons(); // Refresh the coupon list
    } catch (error) {
      if (error.response) {
        // console.log(error.response.data);
        message.error("Error creating coupon");
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
        className="d-flex align-items-start bg-white py-5 w-100"
      >
        <div className="d-flex justify-content-between gap-2">
          <Input
            placeholder="Enter coupon code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="w-50 mr-2"
          />
          <Input
            type="number"
            placeholder="Discount Percentage"
            value={discountPercentage}
            onChange={(e) => setDiscountPercentage(e.target.value)}
            className="w-25 mr-2"
          />
          <DatePicker
            format="YYYY-MM-DD"
            placeholder="Expiration Date"
            value={expiresAt}
            onChange={(date) => setExpiresAt(date)}
            className="w-25"
          />
          <Button type="primary" htmlType="submit">
            Add Coupon
          </Button>
        </div>
      </Form>
      <Table columns={columns} dataSource={coupons} rowKey="id" />
    </>
  );
}

export default AddCoupon;
