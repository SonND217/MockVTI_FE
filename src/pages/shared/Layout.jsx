import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UnorderedListOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { Layout as LayoutAntd, Menu, Button, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = LayoutAntd;
const getUserRole = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return userInfo.username === "kminchelle" ? "Admin" : "User";
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
            key: "/",
            icon: <ProfileOutlined />,
            label: "Profile",
          },
          {
            key: "/product",
            icon: <UnorderedListOutlined />,
            label: "Product List",
          },
          // thêm các menu item khác cho admin
        ]
      : [
          {
            key: "/",
            icon: <ProfileOutlined />,
            label: "Profile",
          },
          {
            key: "/ProductUserView",
            icon: <UnorderedListOutlined />,
            label: "Product",
          },
          // thêm các menu item khác cho user
        ];

  return (
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
  );
};

export default Layout;
