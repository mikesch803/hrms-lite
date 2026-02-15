import { Layout, Menu } from "antd";
import {
  TeamOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

const { Header, Sider, Content } = Layout;

function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <div style={{ color: "white", padding: 20, fontSize: 18 }}>
          HRMS Lite
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={({ key }) => navigate(key)}
          items={[
            {
              key: "/",
              icon: <TeamOutlined />,
              label: "Employees",
            },
            {
              key: "/attendance",
              icon: <CalendarOutlined />,
              label: "Attendance",
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header style={{ background: "#fff", paddingLeft: 20 }}>
          <h2>Admin Dashboard</h2>
        </Header>

        <Content style={{ margin: 24 }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default DashboardLayout;