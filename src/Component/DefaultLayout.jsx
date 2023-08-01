import React, { useEffect, useState } from "react";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider";
// import './default.css'
import Dropdown from "react-bootstrap/Dropdown";

import { Breadcrumb, Layout, Menu, theme } from "antd";
import {
  BellOutlined,
  PieChartOutlined,
  ShoppingCartOutlined,
  BgColorsOutlined,
  SkinOutlined,
  UserOutlined,
  UnorderedListOutlined,
  PlusOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import logo from "../images/logo.webp";
import axiosClient from "../axios_client";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Overview", "Dashboard", <PieChartOutlined />),
  getItem("user", "Users", <PieChartOutlined />),
  getItem("Product", "Product", <ShoppingCartOutlined />, [
    getItem("Product list", "ProductList", <CaretDownOutlined />),
    getItem("Add Product ", "Addproduct", <PlusOutlined />),
    getItem("colors", "colors", <BgColorsOutlined />),
    getItem("sizes", "sizes", <SkinOutlined />),
  ]),
  getItem("Category", "Category", <UserOutlined />, [
    getItem("Category list", "CategoryList", <CaretDownOutlined />),
    getItem("New category", "NewCategory", <PlusOutlined />),
  ]),
  getItem("Orders", "Orders", <UnorderedListOutlined />, [
    getItem("Orders list", "OrdersList", <CaretDownOutlined />),
    getItem("Orders Detail", "OrdersDetail", <PlusOutlined />),
  ]),
];



function DefaultLayout() {
  const navigate = useNavigate();

  const { user, token, setUser,
    setToken, } = useStateContext();
  const [collapsed, setCollapsed] = useState(false);

useEffect(() => {

  if (!token) {
    navigate("/login");
  }
},[token])




  const {
    token: { colorBgContainer },
  } = theme.useToken();



  const logout = async () => {
   try {
      const response = await axiosClient.post("/logout",null,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
        },
      })
      setUser({});
      setToken(null);
      localStorage.removeItem("ACCESS_TOKEN");
    }catch(err){
      console.log(err);
    }
  };



  return (
    <Layout
      style={{minHeight: "100vh",}}
    >
      {/* side bar section  */}

      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical">
          <img src={logo} alt="" />
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["Overview"]}
          mode="inline"
          items={items}
          onClick={({ key }) => {
            if (key == "signout") {
            } else {
              navigate(key);
            }
          }}
        />
      </Sider>

      <Layout>
        {/* header section  */}
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >

          <div className="d-flex gap-4 align-items-center justify-content-end px-2 shadow-sm">
            <div className="position-relative">
              <BellOutlined className="fs-4" />
              <span className="badge bg-primary rounded-circle p-1 position-absolute">
                3
              </span>
            </div>

            <div className="d-flex gap-3 align-items-center dropdown">
              <div>
                <img
                  width={32}
                  height={32}
                  src="https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-4-64x64.jpg"
                  alt=""
                />
              </div>
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0">{user.name}</h5>
                <p className="mb-0">{user.email}</p>
              </div>

              <Dropdown>
                <Dropdown.Toggle
                  variant="transparent"
                  id="dropdown-basic"
                ></Dropdown.Toggle>

                <Dropdown.Menu>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    <Dropdown.Item>View Profile</Dropdown.Item>
                  </Link>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    onClick={logout}
                    to="/"
                  >
                    <Dropdown.Item>Signout</Dropdown.Item>
                  </Link>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </Header>

        {/* content section */}
        <Content
          style={{
            margin: "10px 0",
          }}
        >

          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: "transparent",
            }}
          >
            <div></div>
            <Outlet />
          </div>
        </Content>

      </Layout>
    </Layout>
  );

}

export default DefaultLayout;
