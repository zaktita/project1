import { Table } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNotificationContext } from "../Contexts/NotificationContext";
import axiosClient from "../axios_client";
import {API_BASE_URL} from "../axios_client";

function OrdersDetail() {
  const { orderId } = useParams();
  const [Order, setOrder] = useState({});
  const [OrderDetails, setOrderDetails] = useState({});
  const [OrderItems, setOrderItems] = useState([]);

  const fetchDataFromServer = async () => {
    try {
      const response = await axiosClient.get(
        `/orders/${orderId}`
      );
      setOrder(response.data.order);
      setOrderDetails(response.data.orderDetails);
      setOrderItems(response.data.orderItems);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDataFromServer();
  }, []);

  // const dateConverter = (datetoconvert) => {
  //   let date = new Date(datetoconvert);
  //   let day = date.getDate();
  //   let month = date.getMonth() + 1;
  //   let year = date.getFullYear();
  //   let newDate = `${day}-${month}-${year}`;
  //   return newDate;
  // };

  const {
    dateConverter
  } = useNotificationContext();

  const columns = [
    {
      title: "Product Image",
      key: "title",
      render(text, record) {
        return (
          <img
            src={`${API_BASE_URL}/storage/${record.image}`}
            alt="product"
            style={{ width: "100px", height: "100px" }}
          />
        );
      },
    },
    {
      title: "Product Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "Color",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Unit Price",
      dataIndex: "unit_price",
      key: "unit_price",
    },
  ];
  return (
    <div className="rounded p-3 bg-white shadow-sm">
      <div className="orders-detail-container d-flex justify-content-between  border-bottom p-3">
        <div>
          <h2 className="fw-regular fs-4">Order Info</h2>
          <h3 className="fw-regular fs-5">
            Order number{" "}
            <span className="fw-regular fs-6 text-secondary">#{orderId}</span>
          </h3>
        </div>
        <div className="text-end">
          <h3 className="fw-regular fs-5">
            Order status:{" "}
            <span className="fw-regular fs-6 text-secondary">
              {Order.status}
            </span>
          </h3>
          <h3 className="fw-regular fs-5 ">
            Order date:
            <span className="fw-regular fs-6 text-secondary">
              {" "}
              {dateConverter(Order.created_at)}
            </span>
          </h3>
        </div>
      </div>

      {/* shipping details */}
      <div className="order-infos p-3 text-capitalize">
        <h2 className="fw-regular fs-4 ">shipping To</h2>
        <div className="order-infos d-flex justify-content-between ">
          <div>
            <div>
              <h3 className="fw-regular fs-6 text-secondary">
                {OrderDetails["last_name"] + " " + OrderDetails["first_name"]}
              </h3>
              <h3 className="fw-regular fs-6 text-secondary">
                <span className="">{OrderDetails["email"]}</span>
              </h3>
              <h3 className="fw-regular fs-6 text-secondary">
                {OrderDetails["phone"]}
              </h3>
            </div>
          </div>
          <div className="text-end">
            <h3 className="fw-regular fs-6 text-secondary">
              {OrderDetails["adresse"]}
            </h3>
            <h3 className="fw-regular fs-6 text-secondary">
              {OrderDetails["city"] + " " + OrderDetails["country"]}
            </h3>
            <h3 className="fw-regular fs-6 text-secondary">
              {OrderDetails["zipcode"]}
            </h3>
          </div>
        </div>
      </div>

      <div className="order-item my-2 p-3">
        <h2 className="fw-regular fs-4">Order items</h2>
        <Table dataSource={OrderItems} columns={columns}  rowKey="item_id"
        pagination={OrderItems.length <8 ? false : true}
        />
      </div>
      <div className="order-item my-2 p-3 text-end">
      <h3 className="fw-regular fs-5 ">
          Discount: {"   "}
          <span className="fw-regular fs-6 text-secondary ml-2">
            {Order.discount} %
          </span>
        </h3>
        <h3 className="fw-regular fs-5 ">
          Total: {"   "}
          <span className="fw-regular fs-6 text-secondary ml-2">
            {Order.total_price} DH
          </span>
        </h3>
        
      </div>
    </div>
  );
}

export default OrdersDetail;
