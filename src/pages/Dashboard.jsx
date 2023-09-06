import React, { useEffect, useState } from "react";

import { Column } from "@ant-design/plots";

import { useFetchContext } from "../Contexts/FetchContext";
import { DatePicker, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";

const tagRender = (props) => {
  const { label, value, closable, onClose, color } = props;
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
        color: { color },
      }}
    >
      {label}
    </Tag>
  );
};

const Dashboard = () => {
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [selectedDateRange, setSelectedDateRange] = useState([null, null]);
  const { orders, items, details } = useFetchContext();
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [filteredDetails, setFilteredDetails] = useState([]);
  const [orderDates, setOrderDates] = useState([]);

  useEffect(() => {
    filterOrdersByDateRange(start, end);
  }, [start, end]);

  useEffect(() => {
    // Initialize filteredOrders with orders when the component mounts
    setFilteredOrders(orders);
    setFilteredItems(items);
    setFilteredDetails(details);

    // Sort createdAt dates in ascending order
    const sortedDates = orders
      .map((order) => new Date(order.created_at))
      .sort((a, b) => a - b);

    // Set start to the first date and end to the last date
    if (sortedDates.length > 0) {
      setStart(formatDate(sortedDates[0]));
      setEnd(formatDate(sortedDates[sortedDates.length - 1]));
    }
  }, [orders]);

  // function to unify the date format

  function formatDate(inputDate) {
    const date = new Date(inputDate);

    // Get the Unix timestamp (milliseconds since January 1, 1970)
    const timestamp = date.getTime();

    return timestamp;
  }

  function formatDateFromTimestamp(timestamp) {
    // Create a new Date object using the timestamp
    const date = new Date(timestamp);

    // Extract the components of the date (year, month, day)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");

    // Format the date as "DD.MM.YYYY" or any other desired format
    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
  }

  const handleDateRangeChange = (dates) => {
    if (dates[0] == null || dates[1] == null) {
      setSelectedDateRange([null, null]);
      setStart(null);
      setEnd(null);
      return;
    }
    setSelectedDateRange(dates);
    setStart(formatDate(dates[0]));
    setEnd(formatDate(dates[1]));
  };

  // const filterOrdersByDateRange = (start, end) => {
  //   if (!start || !end || start == null || end == null) {
  //     setFilteredOrders(orders); // Use default orders
  //     return;
  //   }

  //   const newFilteredOrders = orders.filter((order) => {
  //     return (
  //       formatDate(order.created_at) >= formatDate(start) &&
  //       formatDate(order.created_at) <= formatDate(end)
  //     );
  //   });

  //   setFilteredOrders(newFilteredOrders);
  // };



  const filterOrdersByDateRange = (start, end) => {
    if (!start || !end || start == null || end == null) {
      setFilteredOrders(orders); // Use default orders
      setFilteredItems(items);   // Use default items
      setFilteredDetails(details); // Use default details
      return;
    }

    // Filter orders by date range
    const newFilteredOrders = orders.filter((order) => {
      return (
        formatDate(order.created_at) >= formatDate(start) &&
        formatDate(order.created_at) <= formatDate(end)
      );
    });

    // Filter items by date range
    const newFilteredItems = items.filter((item) => {
      // Implement your date filtering logic for items here
      // Similar to how it's done for orders
        return (
        formatDate(item.created_at) >= formatDate(start) &&
        formatDate(item.created_at) <= formatDate(end)
      );; // Replace with your filtering logic
    });

    // Filter details by date range
    const newFilteredDetails = details.filter((detail) => {
      // Implement your date filtering logic for details here
      // Similar to how it's done for orders
      return (
        formatDate(detail.created_at) >= formatDate(start) &&
        formatDate(detail.created_at) <= formatDate(end)
      ); // Replace with your filtering logic
    });

    setFilteredOrders(newFilteredOrders);
    setFilteredItems(newFilteredItems);
    setFilteredDetails(newFilteredDetails);
  };


  const totaleRevenu = (orders) => {
    return orders.reduce(
      (total, order) => total + parseFloat(order.total_price),
      0
    );
  };

  // chart data
  const prepareChartData = (orders) => {
    const data = [];
    orders.forEach((order) => {
      const createdAt = formatDate(order.created_at);
      const totalSales = parseFloat(order.total_price);
      const existingDay = data.find((entry) => entry.day === createdAt);

      if (existingDay) {
        existingDay.sales += totalSales;
      } else {
        data.push({
          day: formatDateFromTimestamp(createdAt),
          sales: totalSales,
        });
      }
    });
    return data;
  };

  const chartData = prepareChartData(filteredOrders);

  const config = {
    data: chartData,
    xField: "day",
    yField: "sales",
    color: ({ type }) => {
      return "#97ABFF";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Date",
      },
      sales: {
        alias: "Orders",
      },
    },
  };

  const columns = [
    {
      title: "Number",
      dataIndex: "order_id",
    },
    {
      title: "Date",
      dataIndex: "Date",
      render: (text, record) => formatDateFromTimestamp(record.created_at),
    },

    {
      title: "Items",
      dataIndex: "order_items_count",
    },
    {
      title: "Total",
      dataIndex: "total_price",
    },

    {
      title: "Paid",
      key: "Paid",
      render: () => <Tag color="success">Paid</Tag>,
    },

    {
      title: "details",
      key: "details",
      render: (text, record) => (
        <Link to={`/OrdersDetail/${record.order_id}`}>
          <AiFillEye size={20} />
        </Link>
      ),
    },
  ];

  return (
    <div>
      <div className="mt-4">
        <h3 className="mb-2 title">Select Date Range</h3>
        <DatePicker.RangePicker
          className="mb-3"
          value={selectedDateRange}
          onChange={handleDateRangeChange}
          format="DD.MM.YYYY"
        />
      </div>

      <div className="row">
        <div className="col-lg-3 col-sm-6">
          <div className="card gradient-1">
            <div className="card-body">
              <h3 className="card-title text-white">Products Sold</h3>
              <div className="d-inline-block">
                <h2 className="text-white">{filteredItems.length}</h2>
                <p className="text-white mb-0">
                  {formatDateFromTimestamp(start)} -{" "}
                  {formatDateFromTimestamp(end)}
                </p>
                {/* <p className="text-white mb-0">Jan - March 2023</p> */}
              </div>
              <span className="float-right display-5 opacity-5">
                <i className="fa fa-shopping-cart"></i>
              </span>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6">
          <div className="card gradient-2">
            <div className="card-body">
              <h3 className="card-title text-white">New orders</h3>
              <div className="d-inline-block">
                <h2 className="text-white">{filteredOrders.length}</h2>
                <p className="text-white mb-0">
                  {formatDateFromTimestamp(start)} -{" "}
                  {formatDateFromTimestamp(end)}
                </p>
              </div>
              <span className="float-right display-5 opacity-5">
                <i className="fa fa-money"></i>
              </span>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6">
          <div className="card gradient-3">
            <div className="card-body">
              <h3 className="card-title text-white">Total Revenue</h3>
              <div className="d-inline-block">
                <h2 className="text-white">
                  {totaleRevenu(filteredOrders)} DH
                </h2>
                <p className="text-white mb-0">
                  {formatDateFromTimestamp(start)} -{" "}
                  {formatDateFromTimestamp(end)}
                </p>
              </div>
              <span className="float-right display-5 opacity-5">
                <FaUsers size={10} color={"#ece6e64d"} />
              </span>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6">
          <div className="card gradient-4">
            <div className="card-body">
              <h3 className="card-title text-white">New Customers</h3>
              <div className="d-inline-block">
                <h2 className="text-white">{filteredDetails.length}</h2>
                <p className="text-white mb-0">
                  {formatDateFromTimestamp(start)} -{" "}
                  {formatDateFromTimestamp(end)}
                </p>
              </div>
              <span className="float-right display-5 opacity-5">
                <i className="fa fa-users"></i>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="mb-5 title">Income Statics</h3>
        <div>
          <Column {...config} />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={orders} rowKey="order_id" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
