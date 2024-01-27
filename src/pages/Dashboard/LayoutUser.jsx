import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UnorderedListOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { Layout as LayoutAntd, Menu, Button, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
function LayoutUser() {
  const items = [
    {
      key: "/",
      icon: <ProfileOutlined />,
      label: "Hồ sơ tài khoản",
    },
    {
      key: "/setting-Profile",
      icon: <UnorderedListOutlined />,
      label: "Chỉnh sửa thông tin",
    },
    // thêm các menu item khác cho user
  ];
  return (
    <div>
      <LayoutAntd className="user-layout">
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          width={485}
          collapsedWidth={63.3}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={items}
            onClick={handleMenuClick}
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
            <Outlet />
          </Content>
        </LayoutAntd>
      </LayoutAntd>
    </div>
  );
}

export default LayoutUser;
