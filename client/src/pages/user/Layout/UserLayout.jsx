import React, { useState } from "react";
import {
  Layout,
  Menu,
  Button,
  theme,
  Flex,
  Dropdown,
  Image,
  message,
  Typography,
} from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import {
  DashboardOutlined,
  FormOutlined,
  FileTextOutlined,
  DollarOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useLogoutMutation } from "../../../controller/api/auth/ApiUser";
import { useGetSettingQuery } from "../../../controller/api/admin/ApiSetting";
const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const UserLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { data: setting, isLoading } = useGetSettingQuery();

  // Get current path without leading slash
  const currentPath = location.pathname.replace("/user-", "");

  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      message.success("Berhasil logout");
      navigate("/");
    } catch (error) {
      message.error(error.data?.message || "Gagal logout");
    }
  };

  const profileItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
      onClick: () => navigate("/user-profile"),
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => navigate("/user-dashboard"),
    },
    {
      key: "pembayaran",
      icon: <DollarOutlined />,
      label: "Pembayaran",
      onClick: () => navigate("/user-pembayaran"),
    },
    {
      key: "formulir",
      icon: <FormOutlined />,
      label: "Formulir",
      onClick: () => navigate("/user-formulir"),
    },

    {
      key: "kuisioner",
      icon: <FileTextOutlined />,
      label: "Kuisioner",
      onClick: () => navigate("/user-kuisioner"),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          display: collapsed ? "none" : "block",
        }}
      >
        <div
          style={{
            height: "64px",
            margin: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: "5px",
            overflow: "hidden",
          }}
        >
          <Flex align="center" justify="center" gap="small">
            {setting?.logo && (
              <Image
                src={setting.logo}
                alt="Logo"
                preview={false}
                style={{
                  width: collapsed ? "32px" : "40px",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            )}
            {!collapsed && setting?.nama && (
              <Text
                style={{
                  color: "white",
                  fontSize: "14px",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {setting.nama}
              </Text>
            )}
          </Flex>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[currentPath || "dashboard"]}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="primary"
            color="primary"
            variant="solid"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              marginLeft: "16px",
            }}
          />

          <Dropdown
            menu={{ items: profileItems }}
            placement="bottomRight"
            arrow
          >
            <Button
              type="primary"
              color="primary"
              variant="outlined"
              icon={<UserOutlined />}
              style={{ marginRight: "16px" }}
            >
              Profile
            </Button>
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserLayout;
