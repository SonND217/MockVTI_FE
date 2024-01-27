import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UnorderedListOutlined,
  ProfileOutlined,
  UserOutlined,
  EditOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { Layout as LayoutAntd, Menu, Button, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import HomeLayout from "./HomeLayout";

const { Header, Sider, Content } = LayoutAntd;
const getUserRole = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return userInfo.roles == "ROLE_ADMIN" ? "Admin" : "User";
};

const Layout = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const hanleMenuClick = (info) => {
    navigate(info.key);
  };
  const userRole = getUserRole();

  const items =
    userRole === "Admin"
      ? [
          {
            key: "/dashboard",
            icon: <ProfileOutlined />,
            label: "Hồ sơ tài khoản",
          },
          {
            key: "/product-list",
            icon: <UnorderedListOutlined />,
            label: "Quản lí sản phẩm",
          },
          {
            key: "/order-list",
            icon: <UnorderedListOutlined />,
            label: "Quản lí đơn hàng",
          },
          {
            key: "/category-list",
            icon: <UnorderedListOutlined />,
            label: "Quản lí danh mục",
          },
        ]
      : [
          {
            key: "/dashboard",
            icon: <UserOutlined />,
            label: "Hồ sơ tài khoản",
          },
          {
            key: "/setting-Profile",
            icon: <EditOutlined />,
            label: "Chỉnh sửa thông tin",
          },
          {
            key: "/user/home",
            icon: <HomeOutlined />,
            label: "Trang Chủ",
          },
          {
            key: "/user/cart",
            icon: <ShoppingCartOutlined />,
            label: "Giỏ hàng",
          },
          {
            key: "/user/checkout",
            icon: <CheckCircleOutlined />,
            label: "Hoàn tất đặt hàng",
          },
        ];

  return userRole === "Admin" ? (
    <LayoutAntd>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
          onClick={hanleMenuClick}
        />
      </Sider>
      <LayoutAntd>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <>{<Outlet />}</>
        </Content>
      </LayoutAntd>
    </LayoutAntd>
  ) : (
    // thay bang home user sau khi dang nhap
    <HomeLayout>
      {/* <div className="wrapper-user-layout"> */}
      <LayoutAntd className="user-layout">
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={200} // Đặt độ rộng khi mở ra
          collapsedWidth={63.3} // Đặt độ rộng khi đóng vào
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={items}
            onClick={hanleMenuClick}
          />
        </Sider>
        <LayoutAntd>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 50,
                height: 50,
              }}
            />
          </Header>
          <Content
            style={{
              margin: "0px 0px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <>{<Outlet />}</>
          </Content>
        </LayoutAntd>
      </LayoutAntd>
      {/* </div> */}
    </HomeLayout>
  );
};

export default Layout;
