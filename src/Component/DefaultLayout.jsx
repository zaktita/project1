import React, { useState } from 'react'
import { Link, Navigate, Outlet, useNavigate  } from 'react-router-dom'
import { useStateContext } from '../Contexts/ContextProvider'
// import './default.css'
import { Layout, Menu, theme } from 'antd';
import { BellOutlined, PieChartOutlined,ShoppingCartOutlined,BgColorsOutlined,SkinOutlined, UserOutlined,UnorderedListOutlined ,PlusOutlined,CaretDownOutlined} from '@ant-design/icons';
import logo  from '../images/logo.webp';

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
  getItem('Overview', 'Dashboard', <PieChartOutlined />),
  getItem('user', 'Users', <PieChartOutlined />),
  getItem('Product', 'Product', <ShoppingCartOutlined />,[
    getItem('Product list', 'ProductList',<CaretDownOutlined />),
    getItem('Add Product ', 'Addproduct',<PlusOutlined />),
    getItem('colors', 'colors', <BgColorsOutlined /> ),
    getItem('sizes', 'sizes', <SkinOutlined /> ),
  ]),
  getItem('Category', 'Category', <UserOutlined />, [
    getItem('Category list', 'CategoryList',<CaretDownOutlined />),
    getItem('New category', 'NewCategory', <PlusOutlined />),
  ]),
  getItem('Orders', 'Orders', <UnorderedListOutlined />,[
    getItem('Orders list', 'OrdersList',<CaretDownOutlined />),
    getItem('Orders Detail', 'OrdersDetail', <PlusOutlined />),
  ]),
];
function DefaultLayout() {

  const navigate = useNavigate();
    const {user,token}= useStateContext()
    const [collapsed, setCollapsed] = useState(false);
    if(!token){
        return <Navigate to='/login'/>
    }
    const {
      token: { colorBgContainer },
    } = theme.useToken();
  return (
<Layout
      style={{
        minHeight: '100vh',
        // position: 'sticky',
        // top: '30px',
        // left:'0'
      }}
    >

      {/* side bar section  */}


      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" >
          <img src={logo} alt="" />
        </div>
        <Menu theme="dark" defaultSelectedKeys={['Overview']} mode="inline" items={items} 
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
        {/* {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )} */}
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
                <h5 className="mb-0">bill</h5>
                <p className="mb-0">bill.gates@gmail.com</p>
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    View Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    Signout
                  </Link>
                </li>
              </div>
            </div>
          </div>
        </Header>


         {/* content section */}
        <Content
          style={{
            margin: '10px 0',
          }}
        >
          {/* <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: 'transparent',
            }}
          >
            <div>
     </div>
          <Outlet/>
          </div>
        </Content>
        {/* <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>
);
    // <div className='contentContainer'>
    //     <aside>
    //       <Link className='links' to='/dashboard'>dashboard</Link>
    //       <Link className='links' to='/users'>users</Link>
    //     </aside>
    //     <main>
    //     <header>
    //       <div>
    //       <h2>this is a header</h2>
    //       </div>
    //       <div>
    //       <h2>{JSON.parse(user.name).websiteUser.name}</h2>
    //       {console.log(JSON.parse(user.name).websiteUser.name)}
    //       </div>
    //     </header>
    //     <Outlet/>
    //     </main>
    // </div>
  
}

export default DefaultLayout
